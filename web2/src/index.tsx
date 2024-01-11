import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from './App';
import AddDepartment from './department/AddDepartment';
import Employees from './employee/Employees';
import AddEmpoyee from './employee/AddEmpoyee';
import ViewDepartment from './department/ViewDepartment';
import EditDepartment from './department/EditDepartment';
import ViewEmployee from './employee/ViewEmployee';
import EditEmployee from './employee/EditEmployee';
import Departments from "./department/Departments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "departments",
    element: <Departments />,
  },
  {
    path: "department/add",
    element: <AddDepartment />,
  },
  {
    path: "department/:departmentId",
    element: <ViewDepartment />,
  },
  {
    path: "department/edit/:departmentId",
    element: <EditDepartment />,
  },
  {
    path: "employees",
    element: <Employees />,
  },
  {
    path: "employee/add",
    element: <AddEmpoyee />,
  },
  {
    path: "employee/:employeeId",
    element: <ViewEmployee />
  },
  {
    path: "employee/edit/:employeeId",
    element: <EditEmployee />
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  
      <RouterProvider router={router} />
    

  </React.StrictMode>
);

