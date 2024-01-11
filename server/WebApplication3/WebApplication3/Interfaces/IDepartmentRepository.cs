using WebApplication3.Models;

namespace WebApplication3.Interfaces;

public interface IDepartmentRepository
{
    Task<bool> CreateDepartment(Department department);
    Task<bool> UpdateDepartment(Department department);
    Task<bool> DeleteDepartment(int departmentId);
    public Task<Department?> GetDepartment(int departmentId);
    public Task<IEnumerable<Department?>> GetAllDepartments();
}