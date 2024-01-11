import React, { FC, useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Department } from '../model/Model'
import Layout from '../layout/Layout'
import { useParams } from 'react-router-dom'


interface DepartmentProps {
    department: Department,
}

const ViewDepartment: FC = () => {

    const { departmentId } = useParams();
    const [department, setDepartmentData] = useState<Department | null>(null);


    useEffect(() => {
        const fetchDepartment = async () => {
          try {
            const response = await fetch(`https://localhost:7092/GetDepartment/${departmentId}`);
            //console.log("response", response)
            if(!response.ok) {
              throw new Error('Network responce was not ok');
            }
            const data = await response.json();
            const department = new Department(data.departmentId, data.departmentCode, data.departmentName);
            setDepartmentData(department);
          } catch (error) {
            console.error("Error fetching department:", error);
          }
        };
    
        fetchDepartment();
      }, [departmentId]);



    return department ?(
        <View departmentProps={{ department: department }} />
    ): (
        <p>Loading department details...</p>
    );
}


const View: FC<{ departmentProps: DepartmentProps }> = ({ departmentProps }) => {
    return (
        <div className="d-flex justify-content-center ">
        <Card style={{ width: '35rem' }}>
            <Card.Body>
                <Card.Title className='text-center'>{departmentProps.department.name} Department</Card.Title>

                <ListGroup>
                    <ListGroup.Item>Department Id: {departmentProps.department.id.toString()}</ListGroup.Item>
                    <ListGroup.Item>Department Code: {departmentProps.department.code}</ListGroup.Item>
                    <ListGroup.Item>Department Name: {departmentProps.department.name}</ListGroup.Item>
                </ListGroup>


            </Card.Body>
        </Card>
        </div>
    )
}

export default Layout(ViewDepartment)