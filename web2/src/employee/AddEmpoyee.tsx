import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Layout from '../layout/Layout'
import { EmployeeForm, FormAction } from '../component/CustomerForm'

function AddEmpoyee() {
  return (
    <EmployeeForm  action={FormAction.ADD}/>
  )
}

export default Layout(AddEmpoyee)