import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

const Container = styled.header`
  color: white;
  padding: 20px;
  height: 50px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.8);
  display: inline-flex;
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
        <Item current={pathname === "/LM"}>
          <ItemLink to="/LM">LM</ItemLink>
        </Item>
        <Item current={pathname === "/IO/01"}>
          <ItemLink to="/IO">IO</ItemLink>
        </Item>
        <Item current={pathname === "/PC/01"}>
          <ItemLink to="/PC/01">PC1</ItemLink>
        </Item>
        <Item current={pathname === "/PC/02"}>
          <ItemLink to="/PC/02">PC2</ItemLink>
        </Item>
      </List>
    </Container>
  );
});

export default Header;
