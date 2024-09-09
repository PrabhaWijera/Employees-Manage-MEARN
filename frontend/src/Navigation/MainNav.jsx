import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import MainHeader from "./MainHeader";
import getIcon from "../utils/getIcon";
import logo from "../images/logo-blue.png"
const NavLinks = (item) => {
  return (
    <Nav.Link
      className="text-decoration-none text-white mt-1 ms-2 me-2"
      href={item.link}
    >
      {getIcon(item.navIcon)}
      {item.navText}
    </Nav.Link>
  );
};

function MainNav() {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser.isLoggedIn) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    authUser.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <MainHeader>
      <Navbar expand="lg" bg="" data-bs-theme="dark" className="shadow-lg">
        <Container>
          <img src={logo} alt="" style={{width: '10rem'}}/>
          <Navbar.Brand>

            <Link
                to={`${authUser.isLoggedIn ? "/" : "/login"}`}
                className="text-decoration-none fw-bold text-danger"
            >
              Employee Management System
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {authUser.isLoggedIn && (
                  <>
                    <NavLinks
                        link="/leave-page"
                        navIcon="leave"
                        navText="Leave Stats"
                    />
                    <NavLinks
                        link={`/profile/${authUser.userId}`}
                        navIcon="profile"
                        navText="Profile"
                    />
                    <NavLinks
                        link="/"
                        navIcon="dashboard"
                        navText="Dashboard"
                    />
                  </>
              )}
            </Nav>
            {authUser.token && authUser.currentUser && (
                <NavDropdown
                    title={authUser.currentUser.name}
                    className="text-white"
                    id="collapsible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={authUser.logout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainHeader>
  );
}

export default MainNav;
