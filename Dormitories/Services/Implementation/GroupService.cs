﻿using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Dormitories.Authentication;
using Dormitories.Models;
using Dormitories.Loggers;

namespace Dormitories.Services.Implementation
{
    public class GroupService : IGroupService
    {
        private readonly IDbConnection _dbConnection;
        private readonly IFacultyService _facultyService;
        private readonly ILogger _logger;

        public GroupService()
        {
            _dbConnection = DBAccess.GetDbConnection();
            _facultyService = new FacultyService();
            _logger = new FileLogger();
        }

        public List<Group> GetGroups()
        {
            _logger.LogInfo("Getting Groups");

            var query = "SELECT * FROM [Groups]";
            var groups = new List<Group>();

            using (var reader = _dbConnection.ExecuteReader(query))
            {
                while (reader.Read())
                {
                    groups.Add(new Group()
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Name = reader["Name"].ToString(),
                        Faculty = _facultyService.GetFacultyById(Convert.ToInt32(reader["FacultyId"]))
                    });
                }
            }

            return groups;
        }

        public Group GetGroupById(int id)
        {
            _logger.LogInfo($"Getting group by Id {id}");

            var query = "SELECT * FROM [Groups] WHERE [Id] = @IdParameter";
            var group = new Group();

            using (var reader = _dbConnection.ExecuteReader(query, new { IdParameter = id }))
            {
                while (reader.Read())
                {
                    group = new Group()
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Name = reader["Name"].ToString(),
                        Faculty = _facultyService.GetFacultyById(Convert.ToInt32(reader["FacultyId"]))
                    };
                }
            }

            return group;
        }

        public bool InsertGroup(Group group)
        {
            _logger.LogInfo($"Inserting group '{group.Name}'");

            var rowsAffected = _dbConnection.Execute(@"INSERT INTO [Groups]([Name],[FacultyId])
                                        VALUES(@GroupName,@GroupFacultyID)", new
            {
                GroupName = group.Name,
                GroupFacultyID = group.Faculty.Id
            });

            return rowsAffected > 0;
        }

        public bool DeleteGroupById(int groupId)
        {
            _logger.LogInfo($"Deleting group by Id {groupId}");

            var rowsAffected = _dbConnection
                .Execute(@"DELETE FROM [Groups] 
                           WHERE Id = @GroupId", new
                {
                    GroupId = groupId
                });

            return rowsAffected > 0;
        }

        public bool UpdateGroup(Group group)
        {
            _logger.LogInfo($"Updating group {group.Id}");

            int rowsAffected = _dbConnection.Execute(@"UPDATE [Groups]
                                                       SET [Name] = @GroupName, [FacultyID] = @FacultyId
                                                       WHERE [Id] = " + group.Id, new
            {
                GroupName = group.Name,
                FacultyId = group.Faculty.Id
            });

            return rowsAffected > 0;
        }
    }
}