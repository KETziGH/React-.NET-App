using WebApplication3.Models;

namespace WebApplication3.Interfaces;

public interface IEmployeeRepository
{
    Task<bool> CreateEmployee(Employee employee);
    Task<bool> DeleteEmployee(int employeeId);
    Task<bool> UpdateEmployee(Employee employee);
    Task<Employee?> GetEmployee(int employeeId);
    Task<IEnumerable<Employee?>> GetAllEmployees();
}