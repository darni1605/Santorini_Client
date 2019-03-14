import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 540px;
  padding: 10px;
  border-radius: 6px;
  display: table-column;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const Username = styled.div`
  font-weight: bold;
  margin-left: 5px;
`;

const Password = styled.div`
    font-weight: lighter;
    margin-left: auto;
 `;
const Name = styled.div`
  font-weight: lighter;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: lighter;
`;

const Date = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: lighter;
`;


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
    <Id>Id: {user.id}</Id>
    <a href = "/accountoverview" style={{ color: '#FCFFF7'}}>Username: {user.username}</a>
    <Password>Password: {user.password}</Password>
    <Date> Date of Creation: {user.date}</Date>

    </Container>
  );
};

export default Player;
