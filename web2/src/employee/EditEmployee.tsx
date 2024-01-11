import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { EmployeeForm, FormAction } from "../component/CustomerForm";
import { useParams } from "react-router";
import { Employee } from "../model/Model";

function EditEmployee() {

    const { employeeId } = useParams()
    const [employeeData, setEmployeeData] = useState<Employee | null>(null);

    
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
              const response = await fetch(`https://localhost:7092/GetEmployee/${employeeId}`);
              console.log("response", response)
              if(!response.ok) {
                throw new Error('Network responce was not ok');
              }
              const data = await response.json();
              const dateofBith = new Date(data.dateOfBirth);
              
              const employee = new Employee (data.employeeId, data.firstName, data.lastName, data.emailAddress,dateofBith, data.age, data.salary, data.department);
              console.log("employee", employee)
              setEmployeeData(employee);
            } catch (error) {
              console.error("Error fetching employee:", error);
            }
          };
      
          fetchEmployee();
    }, [employeeId])

    return employeeData ?(
        <EmployeeForm action={FormAction.EDIT} employeeData={employeeData}/>
    ): (
        <p>Loading department details...</p>
    );
}

export default Layout(EditEmployee)