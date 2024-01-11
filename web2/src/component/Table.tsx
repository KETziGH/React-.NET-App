
import React, { FC, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { Department, Employee } from '../model/Model';
import { Link } from 'react-router-dom';


interface TableProps {
    department?: Department[],
    employee?: Employee[],

}


const DepartmentHeader: FC<{ showDepartmentHeader: Boolean }> = ({ showDepartmentHeader }) => (
    <>
        {showDepartmentHeader && (
            <>
                <th>Department Id</th>
                <th>Department Code</th>
                <th>Department Name</th>
            </>

        )}

    </>
)


const EmployeeHeader: FC<{ showEmployeeHeader: Boolean }> = ({ showEmployeeHeader }) => (
    <>
        {showEmployeeHeader && (
            <>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Date of birth</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Department</th>
            </>

        )}

    </>
)

const DepartmentData: FC<{ department?: Department }> = ({ department }) => (
    <>
        {!!department && (
            <>
                <td>{department.id?.toString()}</td>
                <td>{department.code}</td>
                <td>{department.name}</td>
            </>

        )}
    </>
)

const EmployeeData: FC<{ employee?: Employee }> = ({ employee }) => (
    <>
        {!!employee && (
            <>
                <td>{employee.id?.toString()}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.dob.toDateString()}</td>
                <td>{employee.age?.toString()}</td>
                <td>{employee.salary.toString()}</td>
                <td>{employee.departmentName}</td>

            </>

        )}
    </>
)

    const Operation: FC<{ id: Number; type: string }> = ({ id, type }) => {
    const [loading, setLoading] = useState(false);
  
    const handleDelete = async () => {
      try {
        setLoading(true);
  
        // Determine the API endpoint based on the type
        const apiEndpoint = type === 'department' ? `/DeleteDepartment/${id}` : `/DeleteEmployee/${id}`;
  
        // Call the delete API endpoint
        const response = await fetch(`https://localhost:7092${apiEndpoint}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Handle successful deletion, e.g., refresh the data
        console.log(`${type} deleted successfully`);
      } catch (error) {
        console.error(`Error deleting ${type}:`, error);
        // Handle error, show an alert, etc.
      } finally {
        setLoading(false);
      }
    };
  
    return (
    <th>
        <div className='d-flex justify-content-around'>
            <div>
                <Link to={`/${type}/${id}`}><i className="fa fa-eye"></i></Link>
            </div>
            <div>
                <Link to={`/${type}/edit/${id}`}><i className="fa fa-pencil-square-o"></i></Link>
            </div>
            <div>   
                <Button variant="danger"  onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : <i className="fa fa-close"></i>} Delete
                </Button>
            </div>
        </div>
    </th>
    );
    }


const CustomTable: FC<{ props: TableProps }> = ({ props }) => {
    const { department, employee } = props;
    const isDepartment = !!department;
    

    return (
        <div>
            <h2 className='text-center mb-3'> {isDepartment ? 'Department' : 'Employee'} Details </h2>
        <Table striped bordered hover >
            <thead>
                <tr>
                    <DepartmentHeader showDepartmentHeader={!!department} />
                    <EmployeeHeader showEmployeeHeader={!!employee} />
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {
                    !!department && department.map(dep => (
                        <tr key={dep.id}>  
                            <DepartmentData department={dep} />
                            <Operation id={dep.id} type= 'department'/>
                        </tr>
                    ))
                }

                {
                    !!employee && employee.map(emp => (
                        <tr key={emp.id.toString()}>
                            <EmployeeData employee={emp} />
                            <Operation id={emp.id} type='employee'/>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </div>
    )
};

export { CustomTable };

