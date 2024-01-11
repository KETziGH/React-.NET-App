import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DepartmentForm, FormAction } from '../component/CustomerForm'
import { Department } from '../model/Model';
import Layout from '../layout/Layout';

function EditDepartment() {

  const { departmentId } = useParams()

  const [departmentData, setDepartmentData] = useState<Department | null>(null);

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

  return departmentData ? (
    <DepartmentForm action={FormAction.EDIT} departmentData={departmentData}/>
  ) : (
    <p>Loading department details...</p>
  );
}

export default Layout(EditDepartment)