import React from "react";
// import PropTypes from "prop-types";

import { compose, setPropTypes, withHandlers, withState } from "recompose";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { NavLink } from "react-router-dom";

const TopBar = ({ isOpen, toggle }) => (
  <div className="TopBar">
    <Navbar color="light" light expand="md">
      <NavLink className="navbar-brand" to="/">
        seconds
        <sup>cubed</sup>
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="nav-link" to="/timer">
              Timer
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/history">
              History
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);

export default compose(
  setPropTypes({}),
  withState("isOpen", "setIsOpen", false),
  withHandlers({
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen)
  })
)(TopBar);
