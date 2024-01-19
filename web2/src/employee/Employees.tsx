import React, { FC, useEffect, useState } from 'react'
import { CustomTable } from '../component/Table'
import Layout from '../layout/Layout';
import { Employee } from '../model/Model';

interface employeeAPIResponse {
    employeeId: Number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    dateOfBirth:Date;
    age: Number | undefined;
    salary: Number;
    departmentName: string;
    departmentId: number
}

const Employees: FC = () => {

  const [employee, setEmployee] = useState<Employee[]>([]);

  const setInitEmployee = async () => {
    try {
      const initialEmployees = await sendRequest();
      const response = await initialEmployees.json();
      
      if (Array.isArray(response)) {
        const employeeData: employeeAPIResponse[] = response;
        
        const employeeList = employeeData.map(emp => {
          const dateofBith = new Date(emp.dateOfBirth);

          return new Employee(
            emp.employeeId,
            emp.firstName,
            emp.lastName,
            emp.emailAddress,
            dateofBith,
            emp.age,
            emp.salary,
            emp.departmentName,
            );

        });
       
        setEmployee(employeeList);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  
  const sendRequest = async (): Promise<Response> => {

    const response = await fetch("https://localhost:7092/GetAllEmployees");

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response;
}

  useEffect(() => {
    try {
    setInitEmployee()
  } catch (e: any) {
      console.error("API NOT FOUND")
  }

  }, [])


  return (
    <CustomTable props={{employee: employee}}/>
  )
}

export default Layout(Employees);