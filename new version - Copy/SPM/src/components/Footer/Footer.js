import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="http://localhost:8501">
              CODE ANALYZER
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        <div className="copyright">
          © 
          FOR A BETTER CODE 
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
