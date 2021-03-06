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
    public class FloorService : IFloorService
    {
        private readonly IDbConnection _dbConnection;
        private readonly IBlockService _blockService;
        private readonly IRoomService _roomService;
        private readonly ILogger _logger;

        public FloorService()
        {
            _roomService = new RoomService();
            _blockService = new BlockService();
            _dbConnection = DBAccess.GetDbConnection();
            _logger = new FileLogger();
        }

        public Floor GetFloorWithBlocksAndRooms(int floorId)
        {
            _logger.LogInfo($"Getting floor with blocks and rooms by floor Id {floorId}");

            var query = "SELECT * FROM [Floors] WHERE [Id] = " + floorId;
            var floor = new Floor();
            var dormitoryId = 0;

            using (var reader = _dbConnection.ExecuteReader(query))
            {
                while (reader.Read())
                {
                    floor = new Floor()
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Number = Convert.ToInt32(reader["Number"]),
                        Blocks = _blockService.GetBlocksByFloorId(floorId),
                        Rooms = _roomService.GetRoomsByFloorId(floorId)
                    };
                    dormitoryId = Convert.ToInt32(reader["DormitoryId"]);
                }
            }

            floor.Dormitory = GetDormitoryById(dormitoryId);
            return floor;
        }

        public List<Floor> GetFloorsByDormitoryId(int dormitoryId)
        {
            _logger.LogInfo($"Getting floors by dormitory Id {dormitoryId}");

            return _dbConnection
                .Query<Floor>("SELECT * FROM [Floors] WHERE DormitoryId = " + dormitoryId)
                .ToList();
        }

        public bool InsertFloor(Floor floor)
        {
            _logger.LogInfo($"Inserting floor {floor.Number}");

            var rowsAffected = _dbConnection.Execute(@"INSERT INTO [Floors]([Number],[DormitoryId]) 
                                        VALUES(@FloorNumber,@FloorDormitoryId)", new
            {
                FloorNumber = floor.Number,
                FloorDormitoryId = floor.Dormitory.Id
            });

            return rowsAffected > 0;
        }

        public bool DeleteFloorById(int floorId)
        {
            _logger.LogInfo($"Deleting floor by Id {floorId}");

            var rowsAffected = _dbConnection
                .Execute(@"DELETE FROM [Floors] 
                           WHERE Id = @FloorId", new { FloorId = floorId });

            return rowsAffected > 0;
        }

        public bool UpdateFloor(Floor floor)
        {
            _logger.LogInfo($"Updating floor {floor.Id}");

            var rowsAffected = _dbConnection.Execute(@"UPDATE [Floors] 
                                                       SET [Number] = @FloorNumber, [DormitoryId] = @FloorDormitoryId
                                                       WHERE Id = " + floor.Id, new
            {
                FacultyNumber = floor.Number,
                FloorDormitoryId = floor.Dormitory.Id
            });

            return rowsAffected > 0;
        }

        private Dormitory GetDormitoryById(int id)
        {
            _logger.LogInfo($"Getting dormitory by Id {id}");

            var query = "SELECT * FROM [Dormitories] WHERE [Id] = " + id;
            var dormitory = new Dormitory();

            using (var reader = _dbConnection.ExecuteReader(query))
            {
                while (reader.Read())
                {
                    dormitory = new Dormitory()
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Description = reader["Description"].ToString(),
                        Address = reader["Address"].ToString(),
                        Number = Convert.ToInt32(reader["Number"])
                    };
                }
            }

            return dormitory;
        }
    }
}
