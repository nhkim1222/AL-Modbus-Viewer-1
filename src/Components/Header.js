import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

const Container = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 40px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const ItemLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = withRouter(({ location: { pathname } }) => {
  return (
    <Container>
      <List>
        <Item current={pathname === "/"}>
          <ItemLink to="/">LM</ItemLink>
        </Item>
        <Item current={pathname === "/IO/01"}>
          <ItemLink to="/IO/01">IO1</ItemLink>
        </Item>
        <Item current={pathname === "/IO/02"}>
          <ItemLink to="/IO/02">IO2</ItemLink>
        </Item>
        <Item current={pathname === "/IO/03"}>
          <ItemLink to="/IO/03">IO3</ItemLink>
        </Item>
        <Item current={pathname === "/IO/04"}>
          <ItemLink to="/IO/04">IO4</ItemLink>
        </Item>
        <Item current={pathname === "/IO/05"}>
          <ItemLink to="/IO/05">IO5</ItemLink>
        </Item>
        <Item current={pathname === "/IO/06"}>
          <ItemLink to="/IO/06">IO6</ItemLink>
        </Item>
        <Item current={pathname === "/IO/07"}>
          <ItemLink to="/IO/07">IO7</ItemLink>
        </Item>
        <Item current={pathname === "/IO/08"}>
          <ItemLink to="/IO/08">IO8</ItemLink>
        </Item>
      </List>
    </Container>
  );
});

export default Header;
