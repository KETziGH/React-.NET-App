namespace WebApplication3.Models;

public class Employee
{
    public int EmployeeId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string EmailAddress { get; set; }
    public int BirthDateYear { get; set; }
    public int BirthDateMonth { get; set; }
    public int BirthDateDay { get; set; }
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public int Salary { get; set;}
    public int DepartmentId { get; set;}

    public string DepartmentName { get; set; }
}