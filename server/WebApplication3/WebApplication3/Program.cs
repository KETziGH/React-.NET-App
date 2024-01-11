using WebApplication3.Models;
using Microsoft.AspNetCore.Mvc;
using WebApplication3.DbContext;
using WebApplication3.Interfaces;
using WebApplication3.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var config = builder.Configuration;
builder.Services.AddSingleton<IDbProvider>(_ => new DbProvider(config.GetValue<string>("ConnectionStrings:DefaultConnection")!));
builder.Services.AddSingleton<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();
app.UseHttpsRedirection();

//Department
app.MapGet("/GetAllDepartments", (IDepartmentRepository departmentRepository) =>
{
    var departments = departmentRepository.GetAllDepartments().Result.ToList();
    return Task.FromResult(departments);
});

app.MapGet("/GetDepartment/{departmentId}", (int departmentId, IDepartmentRepository departmentRepository) =>
{
    var department = departmentRepository.GetDepartment(departmentId).Result;
    return Task.FromResult(department);
});

app.MapPost("/CreateDepartment", ([FromBody]Department department, IDepartmentRepository departmentRepository) =>
{
    var result = departmentRepository.CreateDepartment(department);
    return Task.FromResult(result.Result);
});

app.MapPost("/UpdateDepartment", ([FromBody]Department department, IDepartmentRepository departmentRepository) =>
{
    var result = departmentRepository.UpdateDepartment(department);
    return Task.FromResult(result.Result);
});

app.MapDelete("/DeleteDepartment/{departmentId}", (int departmentId, IDepartmentRepository departmentRepository) =>
{
    var result = departmentRepository.DeleteDepartment(departmentId);
    return Task.FromResult(result.Result);
});

//Employee
app.MapGet("/GetAllEmployees", (IEmployeeRepository employeeRepository) =>
{
    var result = employeeRepository.GetAllEmployees().Result.ToList();
    return Task.FromResult(result);
});

app.MapGet("/GetEmployee/{employeeId}", (int employeeId, IEmployeeRepository employeeRepository) =>
{
    var result = employeeRepository.GetEmployee(employeeId).Result;
    return Task.FromResult(result);
});

app.MapPost("/CreateEmployee", ([FromBody] Employee employee, IEmployeeRepository employeeRepository) =>
{
    employee.DateOfBirth = new DateTime(employee.BirthDateYear, employee.BirthDateMonth, employee.BirthDateDay);
    employee.Age = DateTime.Now.Year - employee.DateOfBirth.Year;
    var result = employeeRepository.CreateEmployee(employee);
    return Task.FromResult(result.Result);
});

app.MapPost("/UpdateEmployee", ([FromBody] Employee employee, IEmployeeRepository employeeRepository) =>
{
    employee.DateOfBirth = new DateTime(employee.BirthDateYear, employee.BirthDateMonth, employee.BirthDateDay);
    employee.Age = DateTime.Now.Year - employee.DateOfBirth.Year;
    var result = employeeRepository.UpdateEmployee(employee);
    return Task.FromResult(result.Result);
});

app.MapDelete("/DeleteEmployee/{employeeId}", (int employeeId, IEmployeeRepository employeeRepository) =>
{
    var result = employeeRepository.DeleteEmployee(employeeId);
    return Task.FromResult(result.Result);
});

app.Run();