import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

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

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// profile view of the user //
class AccountOverview extends React.Component{

    constructor() {
        super();
        this.state = {
            token: null,
            username: null,
            password: "*******",
            availability: null,
            creationDate: null,
            DayOfBirth: null,
            usernameToChange: null,
            birthdayToChange: null,
            edit: false,
            buttonToEdit: "Edit",
            titleEdit: "Account Information"
        };
    }
componentDidMount() {

        // fetch the id of the user according to /users/user1 //

    fetch(`${getDomain()}/users/${window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())

        // get all the information from the server about the user & set the current state to it //
        .then(response => {
            if(response.status !== 404){
                this.setState({
                    username: response.username,
                    availability: response.availability,
                    creationDate: response.date,
                    DayOfBirth: response.birthday,
                    token: response.token,
                    usernameToChange: response.username,
                    birthdayToChange: response.birthday,

                });
            }
        })
.catch(err => {
        console.log(err);
    alert("Something went wrong fetching the users: " + err);
});
}

// user wants to change is username //
changingName(event){
    this.setState({ username: event.target.value})
}

// user wants to change his birthday //
changingBirthday(event){
    this.setState({DayOfBirth: event.target.value})
}
    // put method to store changes in users information //
    saveChanges(){
        fetch(`${getDomain()}/users/${window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: this.state.token,
                username: this.state.username,
                birthday: this.state.birthday
            })
        })
            .then(response => response.json())
            .then(response =>{

                /**if (!response.username === this.state.username) {
                     this.state.username = response.username;
                     this.state.edit = true
                } */

                // if error occurred, keep old information & give alert //
                if(response.status === 409 || response.status === 500){
                    this.setState({
                        username: this.state.usernameToChange,
                        birthDate: this.state.birthdayToChange
                    })
                    alert("Username already exists! Please enter different one.")
                }
            })
            .catch(err =>{
                alert(`Something went wrong fetching the changed player information: ${err.message}`);
            })
    }
    // method to give user the possibility of clicking on a edit button and typing his changes in //
    getText(){
        if(this.state.edit === true){
            return(
                <div>
                    <form>
                        <label> Username: &nbsp; </label>
                        <InputField type="text" value={this.state.username} onChange={this.changingName()}/>
                    </form>
                    <p>Availability: {this.state.availability}</p>
                    <p>Password: *******</p>
                    <form>
                        <label> Birthday: &nbsp; </label>
                        <InputField type="date" value={this.state.DayOfBirth} onChange={this.changingBirthday()}/>

                    </form>
                    <p>Day of Creation: {this.state.creationDate}</p>
                </div>
            )
        }
        else {
        return(
            <div>
              <p>Username: {this.state.username}</p>
              <p>Availability: {this.state.availability}</p>
              <p>Password: *******</p>
              <p>Birthday: {this.state.DayOfBirth}</p>
              <p>Day of Creation: {this.state.creationDate}</p>
            </div>
        )
    }}


    render() {
       const toEdit = this.getText();
        // check if user is logged in by checking if token has been created //
        if(localStorage.getItem("token")===null){return(<Container><h1>Please log in!</h1></Container>)}

            return (
                <BaseContainer>
                    <Container>
                        <Form>
                            <h1>{this.state.titleEdit}</h1>
                            <PlayerContainer>
                                {(toEdit)}
                                <div>
                                    <ButtonContainer>
                                        <Button
                                            //disabled edit button if token does not match or username is not the same //
                                            disabled={!(localStorage.getItem("token")===this.state.token) || !this.state.username}
                                            width="100%"
                                            onClick={() => {
                                                //save changes if has been edited //
                                                if(this.state.edit){
                                                    this.saveChanges();
                                                }
                                                this.setState({
                                                    edit: !this.state.edit,
                                                    buttonToEdit: (!this.state.edit)?"Save":"Edit",
                                                    titleEdit: (!this.state.edit)?"Edit Account Information":"Account Information"
                                                })
                                            }}
                                        >
                                            {this.state.buttonToEdit}
                                        </Button>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <Button
                                            width="100%"
                                            onClick={() => {
                                                this.props.history.push("/game/dashboard");
                                            }}
                                        >
                                            Return
                                        </Button>
                                    </ButtonContainer>
                                </div>
                            </PlayerContainer>
                        </Form>
                    </Container>
                </BaseContainer>
            )
        }
    }


export default withRouter(AccountOverview);
