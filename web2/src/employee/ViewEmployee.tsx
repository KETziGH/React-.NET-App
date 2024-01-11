import React, {FC , useEffect, useState} from "react";
import { Card, ListGroup } from 'react-bootstrap';
import { Department, Employee } from '../model/Model';
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";

interface EmployeeProps {
    employee: Employee,
}

const ViewEmployee: FC = () => {

    const { employeeId } = useParams();
    const [employee, setEmployeeData] = useState<Employee | null>(null);

    
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
              
              const employee = new Employee (data.employeeId, data.firstName, data.lastName, data.emailAddress,dateofBith, data.age, data.salary, data.departmentName);
              console.log("employee view", employee)
              setEmployeeData(employee);
            } catch (error) {
              console.error("Error fetching employee:", error);
            }
          };
      
          fetchEmployee();
    }, [employeeId])

    return employee ?(
        <View employeeProps= {{ employee: employee }} />
    ): (
        <p>Loading Employee details...</p>
    );
}

const View: FC<{ employeeProps: EmployeeProps }> = ({ employeeProps }) => {
    return(
        <div className="d-flex justify-content-center ">
            <Card style={{ width: '35rem'}}>
                <Card.Body>
                    <Card.Title className='text-center'>{employeeProps.employee.firstName} {employeeProps.employee.lastName}</Card.Title>

                    <ListGroup>
                        <ListGroup.Item>Employee Id: {employeeProps.employee.id?.toString()}</ListGroup.Item>
                        <ListGroup.Item>Employee First Name: {employeeProps.employee.firstName}</ListGroup.Item>
                        <ListGroup.Item>Employee Last Name: {employeeProps.employee.lastName}</ListGroup.Item>
                        <ListGroup.Item>Employee Email: {employeeProps.employee.email}</ListGroup.Item>
                        <ListGroup.Item>Employee Date of Birth: {employeeProps.employee.dob.toDateString()}</ListGroup.Item>
                        <ListGroup.Item>Employee Age: {employeeProps.employee.age?.toString()}</ListGroup.Item>
                        <ListGroup.Item>Employee Salary: {employeeProps.employee.salary.toString()}</ListGroup.Item>
                        <ListGroup.Item>Employee Department: {employeeProps.employee.departmentName}</ListGroup.Item>
                    </ListGroup>

                </Card.Body>
            </Card>
        </div>
    )
}


export default Layout(ViewEmployee)