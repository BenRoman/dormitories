﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Dormitories.Authentication;
using Dormitories.Models;
using Dormitories.Loggers;

namespace Dormitories.Services.Implementation
{
    public class BlockService : IBlockService
    {
        private readonly IDbConnection _dbConnection;
        private readonly IRoomService _roomService;
        private readonly ILogger _logger;

        public BlockService()
        {
            _dbConnection = DBAccess.GetDbConnection();
            _roomService = new RoomService();
            _logger = new FileLogger();
        }

        public Block GetSimpleBlockById(int id)
        {
            _logger.LogInfo($"Getting simple block by Id {id}");

            return _dbConnection
                .Query<Block>("SELECT * FROM [Blocks] WHERE [Id] = " + id)
                .SingleOrDefault();
        }

        public Block GetBlockWithRooms(int blockId)
        {
            _logger.LogInfo($"Getting block with rooms by id {blockId}");

            var block = new Block();
            var query = @"SELECT * FROM [Blocks]
                          WHERE [Id] = @BlockIdParameter";

            try
            {
                using (var reader = _dbConnection.ExecuteReader(query, new { BlockIdParameter = blockId }))
                {
                    while (reader.Read())
                    {
                        block = new Block()
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Rooms = _roomService.GetRoomsByBlockId(Convert.ToInt32(reader["Id"]))
                        };
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return block;
        }

        public Block GetBlockWithRoomsByBlockName(string blockName)
        {
            _logger.LogInfo($"Getting block with rooms by block name {blockName}");

            var block = new Block();
            var query = @"SELECT * FROM [Blocks]
                          WHERE [Name] = @BlockNameParameter";

            try
            {
                using (var reader = _dbConnection.ExecuteReader(query, new { BlockNameParameter = blockName }))
                {
                    while (reader.Read())
                    {
                        block = new Block()
                        {
                            Id = Convert.ToInt32(reader["Id"]),
                            Name = reader["Name"].ToString(),
                            Rooms = _roomService.GetRoomsByBlockId(Convert.ToInt32(reader["Id"]))
                        };
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            return block;
        }

        public List<Block> GetBlocksByFloorId(int floorId)
        {
            _logger.LogInfo($"Getting blocks by FloorId {floorId}");

            return _dbConnection
                .Query<Block>("SELECT * FROM [Blocks] WHERE [FloorId] = @BlockIdParameter ORDER BY [Name]", new
                {
                    BlockIdParameter = floorId
                })
                .ToList();
        }

        public bool InsertBlock(Block block)
        {
            _logger.LogInfo($"Inserting block '{block.Name}'");

            var rowsAffected = _dbConnection.Execute(
                    @"INSERT INTO Blocks(FloorId,Name)
                  VALUES (@FloorIdParameter,@NameParameter)",
                    new
                    {
                        FloorIdParameter = block.Floor.Id,
                        NameParameter = block.Name
                    });

            return rowsAffected > 0;
        }

        public bool DeleteBlockById(int blockId)
        {
            _logger.LogInfo($"Deleting block by Id {blockId}");

            var rowsAffected = _dbConnection
                .Execute(@"DELETE FROM [Blocks] 
                           WHERE Id = @BlockId", new { BlockId = blockId });

            return rowsAffected > 0;
        }

        public bool UpdateBlock(Block block)
        {
            _logger.LogInfo($"Updating block {block.Id}");

            var rowsAffected = _dbConnection.Execute(
                @"UPDATE Blocks
                  SET FloorId = @FloorIdParameter,
                      Name = @NameParameter
                  WHERE Blocks.Id = @IdParameter",
                new
                {
                    FloorIdParameter = block.Floor.Id,
                    NameParameter = block.Name,
                    IdParameter = block.Id
                });

            return rowsAffected > 0;
        }
    }
}