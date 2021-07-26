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

const IOMenu = withRouter(({ location: { pathname } }) => {
  return (
    <Menu>
      <MenuItem current={pathname === "/IO/01"}>
        <ItemLink to="/IO/01">IO01</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/02"}>
        <ItemLink to="/IO/02">IO02</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/03"}>
        <ItemLink to="/IO/03">IO03</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/04"}>
        <ItemLink to="/IO/04">IO04</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/05"}>
        <ItemLink to="/IO/05">IO05</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/06"}>
        <ItemLink to="/IO/06">IO06</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/07"}>
        <ItemLink to="/IO/07">IO07</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/08"}>
        <ItemLink to="/IO/08">IO08</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/09"}>
        <ItemLink to="/IO/09">IO09</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/10"}>
        <ItemLink to="/IO/10">IO10</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/11"}>
        <ItemLink to="/IO/11">IO11</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/12"}>
        <ItemLink to="/IO/12">IO12</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/13"}>
        <ItemLink to="/IO/13">IO13</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IO/14"}>
        <ItemLink to="/IO/14">IO14</ItemLink>
      </MenuItem>
      <MenuItem current={pathname === "/IOIO/15"}>
        <ItemLink to="/IO/15">IO15</ItemLink>
      </MenuItem>
    </Menu>
  );
});

export default IOMenu;
