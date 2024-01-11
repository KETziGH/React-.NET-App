using System.Data.SqlClient;
using WebApplication3.Models;
using WebApplication3.DbContext;
using WebApplication3.Interfaces;

namespace WebApplication3.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly IDbProvider _provider;

    public EmployeeRepository(IDbProvider provider)
    {
        _provider = provider;
    }

    public async Task<bool> CreateEmployee(Employee employee)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                const string insertQuery = @"INSERT INTO Employees (FirstName, LastName, EmailAddress, DateOfBirth, Age, Salary, DepartmentId) 
                                    VALUES (@FirstName, @LastName, @EmailAddress, @DateOfBirth, @Age, @Salary, @DepartmentId)";
                await using var command = new SqlCommand(insertQuery, connection);
                command.Parameters.AddWithValue("@FirstName", employee.FirstName);
                command.Parameters.AddWithValue("@LastName", employee.LastName);
                command.Parameters.AddWithValue("@EmailAddress", employee.EmailAddress);
                command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
                command.Parameters.AddWithValue("@Age", employee.Age);
                command.Parameters.AddWithValue("@Salary", employee.Salary);
                command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<bool> DeleteEmployee(int employeeId)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                var updateQuery = @"DELETE FROM Employees WHERE EmployeeId = @EmployeeId";
                await using var command = new SqlCommand(updateQuery, connection);

                command.Parameters.AddWithValue("@EmployeeId", employeeId);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<bool> UpdateEmployee(Employee employee)
    {
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                var updateQuery = @"UPDATE Employees SET 
                                    FirstName = @FirstName, 
                                    LastName = @LastName, 
                                    EmailAddress = @EmailAddress, 
                                    DateOfBirth = @DateOfBirth, 
                                    Age = @Age, 
                                    Salary = @Salary, 
                                    DepartmentId = @DepartmentId
                                    WHERE EmployeeId = @EmployeeId";
                await using var command = new SqlCommand(updateQuery, connection);

                command.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId);
                command.Parameters.AddWithValue("@FirstName", employee.FirstName);
                command.Parameters.AddWithValue("@LastName", employee.LastName);
                command.Parameters.AddWithValue("@EmailAddress", employee.EmailAddress);
                command.Parameters.AddWithValue("@DateOfBirth", employee.DateOfBirth);
                command.Parameters.AddWithValue("@Age", employee.Age);
                command.Parameters.AddWithValue("@Salary", employee.Salary);
                command.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId);
                command.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

    public async Task<Employee?> GetEmployee(int employeeId)
    {
        var employees = new List<Employee?>();
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                await using var sqlCommand = new SqlCommand(@"SELECT TOP 1 e.*, d.DepartmentName
                      FROM Employees e
                      JOIN Departments d ON e.DepartmentId = d.DepartmentId
                      WHERE e.EmployeeId = @EmployeeId; ", connection);
                sqlCommand.Parameters.AddWithValue("@EmployeeId", employeeId);
                await using var reader = await sqlCommand.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var employee = new Employee
                    {
                        EmployeeId = reader.GetInt32(reader.GetOrdinal("EmployeeId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        EmailAddress = reader.GetString(reader.GetOrdinal("EmailAddress")),
                        DepartmentId = reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                        DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName")),
                        Age = reader.GetInt32(reader.GetOrdinal("Age")),
                        Salary = reader.GetInt32(reader.GetOrdinal("Salary")),
                        DateOfBirth = reader.GetDateTime(reader.GetOrdinal("DateOfBirth"))
                    };

                    employees.Add(employee);
                }
                return employees.FirstOrDefault();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public async Task<IEnumerable<Employee?>> GetAllEmployees()
    {
        var employees = new List<Employee?>();
        using (var connection = await _provider.CreateConnectionAsync())
        {
            try
            {
                await using var sqlCommand = new SqlCommand(@"Select
                                EmployeeId, 
                                FirstName, 
                                LastName,
                                EmailAddress,
                                DateOfBirth,
                                Age,
                                Salary,
                                d.DepartmentId,
                                d.DepartmentName 
                                from Employees e
                                join Departments d on e.DepartmentId = d.DepartmentId;", connection);
                await using var reader = await sqlCommand.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var employee = new Employee
                    {
                        EmployeeId = reader.GetInt32(reader.GetOrdinal("EmployeeId")),
                        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                        LastName = reader.GetString(reader.GetOrdinal("LastName")),
                        EmailAddress = reader.GetString(reader.GetOrdinal("EmailAddress")),
                        DepartmentId = reader.GetInt32(reader.GetOrdinal("DepartmentId")),
                        Age = reader.GetInt32(reader.GetOrdinal("Age")),
                        Salary = reader.GetInt32(reader.GetOrdinal("Salary")),
                        DateOfBirth = reader.GetDateTime(reader.GetOrdinal("DateOfBirth")),
                        DepartmentName = reader.GetString(reader.GetOrdinal("DepartmentName"))
                    };

                    employees.Add(employee);
                }
                return employees;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}