import React, {FC, useEffect, useState} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import {Department, Employee} from '../model/Model';

enum FormAction {
    EDIT,
    ADD,
}

interface ADDDepartment {
    DepartmentCode: string,
    DepartmentName: string
}

interface UpdateDepartment extends ADDDepartment {
    DepartmentId: number,
}

const DepartmentForm: FC<{ action: FormAction, departmentData?: Department }> = ({action, departmentData}) => {
    const [departmentCode, setDepartmentCode] = useState<string>('')
    const [departmentName, setDepartmentName] = useState<string>('')
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let data: Promise<Response>;
        try {
            if (action === FormAction.ADD) {
                data = sendRequest(createDepartement())
            } else if (action === FormAction.EDIT && !!departmentData) {
                data = sendRequest(updateDepartement(departmentData))
            } else {
                throw Error("unknown action")
            }
            data.then(result => {
                navigate('/departments')
            }).catch(err => {
                console.error((err as Error).message);
            })

        } catch (e: any) {
            console.error('Error:', e.message);
        }
    };


    const sendRequest = async (params: ADDDepartment | UpdateDepartment): Promise<Response> => {
        let url = '';
        let method = '';
        
        if (action === FormAction.ADD) {
          url = 'https://localhost:7092/CreateDepartment';
          method = 'POST';
        } else if (action === FormAction.EDIT && departmentData) {
          url = 'https://localhost:7092/UpdateDepartment';
          method = 'POST';
          (params as UpdateDepartment).DepartmentId = departmentData.id; 
        } else {
          throw new Error('Unknown action');
        }
    
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      };


    const createDepartement = (): ADDDepartment => {
        const newDepartment = {
            DepartmentCode: departmentCode,
            DepartmentName: departmentName
        }

        return newDepartment;
    }

    const updateDepartement = (departmentData: Department): UpdateDepartment => {
        const updateDepartementData = {
            DepartmentId: departmentData.id,
            DepartmentCode: departmentCode,
            DepartmentName: departmentName
        }

        return updateDepartementData;
    }


    useEffect(() => {
        if (action === FormAction.EDIT && !!departmentData) {
            setDepartmentCode(departmentData.code);
            setDepartmentName(departmentData.name);
        }
    }, [])

    const formTitle = action === FormAction.EDIT ? 'Edit' : 'Add';

    return (
        <div className="d-flex justify-content-center ">
            <Row>
                <Col className='text-center' md={15}>
                    <h2 className="mb-3">{formTitle} Deparment Details</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Department Code</Form.Label>
                            <Form.Control type="text" placeholder="Department code"
                                          onChange={e => setDepartmentCode(e.target.value)} value={departmentCode}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control type="text" placeholder="Department Name"
                                          onChange={e => setDepartmentName(e.target.value)} value={departmentName}
                                          required/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

interface ADDEmployee {

    DepartmentId: number,
    departmentCode: string,
    departmentName: string
    
    FirstName : string,
    LastName : string,
    EmailAddress : string,
    BirthDateYear?: string | undefined,
    BirthDateMonth?: string | undefined,
    BirthDateDay?: string | undefined,
    EmployeeDOB: Date | undefined,
    Salary : Number | undefined,
    EmployeeDepartment: string,

}

interface UpdateEmployee extends ADDEmployee {
    EmployeeId: Number,
    BirthDateYear?: string | undefined,
    BirthDateMonth?: string | undefined,
    BirthDateDay?: string | undefined,

}

const EmployeeForm: FC<{ action: FormAction, employeeData?: Employee }> = ({action, employeeData}) => {
    const [employeeFirstName, setEmployeeFirstName] = useState<string>('')
    const [employeeLastName, setEmployeeLastName] = useState<string>('')
    const [employeeEmail, setEmployeeEmail] = useState<string>('')
    const [employeeDOB, setEmployeeDOB] = useState<Date | undefined>()
    const [employeeSalary, setEmployeeSalary] = useState<Number | undefined>()
    const [employeeDepartment, setEmployeeDepartment] = useState<string>('')
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let data: Promise<Response>;
        try {
            if (action === FormAction.ADD) {
                data = sendRequest(createEmployee())

            } else if (action === FormAction.EDIT && !!employeeData) {
                data = sendRequest(updateEmployee(employeeData))
            } else {
                throw Error("unknown action")
            }
            data.then(result => {
                navigate('/employees')
            }).catch(err => {
                console.error((err as Error).message);
            })

        } catch (e: any) {
            console.error('Error:', e.message);
        }
    };

    const sendRequest = async (params: ADDEmployee | UpdateEmployee): Promise<Response> => {
        let url = '';
        let method = '';
        
        if (action === FormAction.ADD) {
          url = 'https://localhost:7092/CreateEmployee';
          method = 'POST';
        } else if (action === FormAction.EDIT && employeeData) {
          url = 'https://localhost:7092/UpdateEmployee';
          method = 'POST';
          (params as UpdateEmployee).EmployeeId = employeeData.id; 
        } else {
          throw new Error('Unknown action');
        }
    
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;

    }

    const createEmployee = (): ADDEmployee => {
        const selectedDepartment = department.find(dep => dep.name === employeeDepartment);
        const newEmployee = {
            DepartmentId: selectedDepartment?.id || 0, 
            departmentCode: '',
            departmentName: '',
            FirstName : employeeFirstName,
            LastName : employeeLastName,
            EmailAddress : employeeEmail,
            EmployeeDOB: employeeDOB,
            BirthDateYear: employeeDOB?.getFullYear().toString(),
            BirthDateMonth: employeeDOB?.getMonth().toString(),
            BirthDateDay: employeeDOB?.getDate().toString(),
            Salary : employeeSalary || 0,
            EmployeeDepartment: employeeDepartment
        };
        return newEmployee;
    }

    const updateEmployee = (employeeData: Employee):UpdateEmployee => {
        const selectedDepartment = department.find(dep => dep.name === employeeDepartment);
        const updateEmployeeData = {
            EmployeeId: employeeData.id,
            DepartmentId: selectedDepartment?.id || 0,
            departmentCode: '',
            departmentName: '',
            FirstName : employeeFirstName,
            LastName : employeeLastName,
            EmailAddress : employeeEmail,
            EmployeeDOB: employeeDOB,
            BirthDateYear: employeeDOB?.getFullYear().toString(),
            BirthDateMonth: employeeDOB?.getMonth().toString(),
            BirthDateDay: employeeDOB?.getDate().toString(),
            Salary : employeeSalary || 0,
            EmployeeDepartment: employeeDepartment
        }

        return updateEmployeeData;
    }

    const [department, setDepartment] = useState<Department[]>([]);

    const setInitDepartment = async () => {
        const initialDepartments = await sendRequest1();
        let response = await initialDepartments.json();
        //console.log("response", response)
        let departmentData = response as ADDEmployee[];
        const departmentList = !!departmentData && departmentData.map(dep => new Department(dep.DepartmentId, dep.departmentCode, dep.departmentName))
        //console.log("departmentList", departmentList)
        setDepartment(departmentList);
    }


    const sendRequest1 = async (): Promise<Response> => {

        const response = await fetch("https://localhost:7092/GetAllDepartments");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    }

    const departmentNames = department.map(dep => dep.name);
    console.log("departmentNames", departmentNames)

    useEffect(() => {
        try {
            setInitDepartment()
        } catch (e: any) {
            console.error("API NOT FOUND")
        }

      }, [])

    useEffect(() => {
        if (action === FormAction.EDIT && !!employeeData) {
            setEmployeeFirstName(employeeData.firstName);
            setEmployeeLastName(employeeData.lastName);
            setEmployeeEmail(employeeData.email);
            setEmployeeDOB(employeeData.dob);
            setEmployeeSalary(employeeData.salary);
            setEmployeeDepartment(employeeData.departmentName)
        }
    }, [])

    const formTitle = action === FormAction.EDIT ? 'Edit' : 'Add';

    return (
        <div className="d-flex justify-content-center ">

            <Row>
                <Col className='text-center' md={15}>
                    <h2 className="mb-3">{formTitle} Employee Details</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name"
                                          onChange={e => setEmployeeFirstName(e.target.value)} value={employeeFirstName}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"
                                          onChange={e => setEmployeeLastName(e.target.value)} value={employeeLastName}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email"
                                          onChange={e => setEmployeeEmail(e.target.value)} value={employeeEmail}
                                          required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" placeholder="dob"
                                          onChange={e => setEmployeeDOB(new Date(e.target.value))}
                                          value={employeeDOB?.toISOString().split('T')[0]} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" placeholder="salary"
                                          onChange={e => setEmployeeSalary(Number(e.target.value))}
                                          value={employeeSalary?.toString()} required/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Select 
                                aria-label="Default select example"
                                onChange={e => setEmployeeDepartment(e.target.value)}
                                value={employeeDepartment} required>
                                <option>Department</option>
                                {departmentNames.map((name) => (
                                     <option key={name} value={name}>
                                        {name}
                                     </option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                        <Button variant="primary" type="submit" className="mb-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export {DepartmentForm, EmployeeForm, FormAction}