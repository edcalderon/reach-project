import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Balance from "./reach/Balance";
import { Context } from "./../Context";
import { React, useContext } from "react";

const AppNavbar = () => {
    const [account, , , , , , , , , ,] = useContext(Context);
    return (
        <Navbar style={{ backgroundColor: "" }} >
            <Container>
                <Nav className="col-4">
                    {account && <p style={{ color: "black", fontSize: "2rem", marginTop: "8px" }} className="auto"></p>}
                </Nav>
                <Nav className="col-4 ">
                    <Nav variant="tabs" className=" ml-4">
                        <Nav.Item >
                            {account && <Nav.Link href="/" style={{ color: "black" }} eventKey="link-1">Home</Nav.Link>}
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Balance />
                    </Nav>
                </Nav>
                <Nav className="col-4">
                    
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;
