import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { withRouter } from "react-router-dom";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Button = styled.button`
    &:hover {
    transform: translateY(-2px);
}
padding: 6px;
font-weight: 700;
text-transform: uppercase;
font-size: 25px;
text-align: center;
color: rgba(255, 255, 255, 1);
width: ${props => props.width || null};
height: 50px;
border: none;
border-radius: 20px;
cursor: ${props => (props.disabled ? "default" : "pointer")};
opacity: ${props => (props.disabled ? 0.4 : 1)};
background: rgb(16, 89, 255);
transition: all 0.3s ease`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Menu extends React.Component {


    render() {
        return (
            <BaseContainer>
            <FormContainer>
            <Form>

            <Button>Play</Button>

        {/**  <Button onclick=this.props.history.push(`/account settings`);</Button> */}
        <Button>Account Settings</Button>



        </Form>
        </FormContainer>
        </BaseContainer>
    )
        ;
    }
}

export default withRouter(Menu);