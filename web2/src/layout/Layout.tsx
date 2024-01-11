import { FC } from "react";
import { Container, Row, Col} from "react-bootstrap";
import SideBar from "./SideBar";


const Layout = (Component: FC) => ({ ...props }) => (
    <div>
        <h1 className="container-fluid p-3 bg-primary text-white text-center" >Company Name</h1>
      
        <Container fluid className="mt-5">
            <Row>
                <Col md={2} >
                    <SideBar/>
                </Col>
                <Col md={9}>
                    <Component {...props} />

                </Col>
            </Row>
        </Container>

    </div>
);

export default Layout;