import React from "react";
import API from "../../utils/API";


export class CreateUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed"
        };
    }

    render() {
        return (
            <div>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> First Name:</th>
                        <th> Last Name:</th>
                        <th> Age :</th>
                        <th> Sex :</th>
                        <th> Money :</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td>ID will be generated</td>
                        <td><input id="first_name_send"/></td>
                        <td><input id="last_name_send"/></td>
                        <td><input id="age_send"/></td>
                        <td><input id="sex_send"/></td>
                        <td><input id="money_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushUserToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <hr/>
            </div>
        );
    }

    pushUserToAPI = async () => {
        let firstName = document.getElementById("first_name_send").value
        let lastName = document.getElementById("last_name_send").value
        let age = parseInt(document.getElementById("age_send").value)
        let sex = document.getElementById("sex_send").value
        let money = parseFloat(document.getElementById("money_send").value)
        let json =
            {
                "firstName": firstName, "secondName": lastName, "age": age, "sex": sex, "money": money
            }

        let push_uri = '/addUser'

        let answer = " "

        await API.post(
            push_uri, json)
            .then(function (response) {
                answer = "Successfully pushed, code: " + response.status
                console.log(response);
            })
            .catch(function (error) {
                answer = error.toString()
                console.log(error);
            });
        this.setState({answer})
        console.log(this.state.answer)
    }
}

export default CreateUserForm