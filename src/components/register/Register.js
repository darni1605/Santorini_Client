import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            birthday: null,
            alertText: ""

        };
    }
// post method where user has to enter username, password & birthday and the current date gets determined //
    register() {
        let currentDate = new Date().toUTCString();
        fetch(`${getDomain()}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                birthday: this.state.birthday,
                date: currentDate
            })
        })
        //check for errors and print message //
            .then(async response => {
                if (response.status === 409 ) {
                    //then alert message should be shown
                   this.setState({alertText: "This username already exists!"});
                } else {
                    this.props.history.push(`/login`);
                }
            })

            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the registration: ${err.message}`);
                }
            })
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }


    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>

                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />

                        <Label>Birthday</Label>
                        <InputField
                            placeholder="DD.MM.YYYY"
                            onChange={e => {
                                this.handleInputChange("birthday", e.target.value);
                            }}
                        />

                        <Label>Password</Label>
                        <InputField type={'password'}
                                    placeholder="Enter here.."
                                    onChange={e => {
                                        this.handleInputChange("password", e.target.value);
                                    }}
                        />


                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password || !this.state.birthday}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Register
                            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a href="/login" style={{color: '#FCFFF7'}}>Already have an account?</a>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Register);
