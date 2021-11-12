import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

const Menu = styled.div`
  width: 220px;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  background: #fafafa;
  transition: all 0.5s ease;
  flex-grow: 0;
`;

const MenuItem = styled.li`
  display: block;
  width: 100%;
  line-height: 32px;
  font-size: 10px;
  color: #6c7298;
  background-color: ${(props) => (props.current ? "#ffffff" : "#fafafa")};
  padding-left: 10px;
  box-sizing: border-box;
  transition: 0.4s;
  border-radius: 3px;
  font-weight: ${(props) => (props.current ? "600" : "400")};
`;

const ItemLink = styled(Link)``;
const LMMenu = withRouter(({ location: { pathname } }) => {
  return (
    <Menu>
      <MenuItem current={pathname === "/LM/information"}>
        <ItemLink to="/LM/information">Information</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/LM/status"}>
        <ItemLink to="/LM/status">IO Status</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/LM/setup"}>
        <ItemLink to="/LM/setup">Setup</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/LM/event"}>
        <ItemLink to="/LM/event">Event</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/LM/LOGIC Setup"}>
        <ItemLink to="/LM/LOGIC Setup">LOGIC Setup</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/LM/IO Setup"}>
        <ItemLink to="/LM/IO Setup">IO Setup</ItemLink>
      </MenuItem>
    </Menu>
  );
});

export default LMMenu;
