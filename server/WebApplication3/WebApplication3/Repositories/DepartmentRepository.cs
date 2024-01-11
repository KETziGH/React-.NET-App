using System.Data.SqlClient;
using WebApplication3.Models;
using WebApplication3.DbContext;
using WebApplication3.Interfaces;

namespace WebApplication3.Repositories;

public class DepartmentRepository : IDepartmentRepository
{
    private readonly IDbProvider _provider;

    public DepartmentRepository(IDbProvider provider)
    {
        _provider = provider;
    }

    public async Task<bool> CreateDepartment(Department department)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                var insertQuery = "INSERT INTO Departments (DepartmentCode, DepartmentName) VALUES (@DepartmentCode, @DepartmentName)";
                await using var command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@DepartmentCode", department.DepartmentCode);
                command.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<bool> UpdateDepartment(Department department)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                var updateQuery = @"UPDATE Departments SET 
                                    DepartmentCode = @DepartmentCode,
                                    DepartmentName = @DepartmentName
                                    WHERE DepartmentId = @DepartmentId";
                await using var command = new SqlCommand(updateQuery, connection);
                
                command.Parameters.AddWithValue("@DepartmentId", department.DepartmentId);
                command.Parameters.AddWithValue("@DepartmentCode", department.DepartmentCode);
                command.Parameters.AddWithValue("@DepartmentName", department.DepartmentName);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<bool> DeleteDepartment(int departmentId)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                var updateQuery = @"DELETE FROM Departments WHERE DepartmentId = @DepartmentId";
                await using var command = new SqlCommand(updateQuery, connection);

                command.Parameters.AddWithValue("@DepartmentId", departmentId);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<Department?> GetDepartment(int departmentId)
    {
        var department = new Department();
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                await using var sqlCommand = new SqlCommand("SELECT TOP 1 * FROM Departments WHERE DepartmentId = @DepartmentId", connection);
                sqlCommand.Parameters.AddWithValue("@DepartmentId", departmentId);
                await using var reader = await sqlCommand.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    department = new Department
                    {
                        DepartmentId = reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                        DepartmentCode = reader.GetString(reader.GetOrdinal("DepartmentCode")),
                        DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName"))
                    };
                }
                return department;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public async Task<IEnumerable<Department?>> GetAllDepartments()
    {
        var departments = new List<Department?>();
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                await using var sqlCommand = new SqlCommand("SELECT * FROM Departments;", connection);
                await using var reader = await sqlCommand.ExecuteReaderAsync();

                if (reader.HasRows)
                {
                    while (await reader.ReadAsync())
                    {
                        var department = new Department
                        {
                            DepartmentId = reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                            DepartmentCode = reader.GetString(reader.GetOrdinal("DepartmentCode")),
                            DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName"))
                        };

                        departments.Add(department);
                    }
                }

                return departments;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
