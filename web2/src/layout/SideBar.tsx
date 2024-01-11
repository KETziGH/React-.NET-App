
import { Sidebar, Menu, SubMenu, MenuItem } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'

function SideBar() {
    return (
        <Sidebar>
        <h3 className='text-center' >Menu</h3>
            <Menu>
                <SubMenu label="Department">
                    <MenuItem component={<Link to="/departments" />}> View Departments </MenuItem>
                    <MenuItem component={<Link to="/department/add" />}> Add Department </MenuItem>
                </SubMenu>
                <SubMenu label="Employee">
                    <MenuItem component={<Link to="/employees" />}>View Employees </MenuItem>
                    <MenuItem component={<Link to="/employee/add" />}> Add Employee </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )
}

export default SideBar