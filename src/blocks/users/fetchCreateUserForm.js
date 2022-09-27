import React from "react";

import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";

/**
 * Неполный аналог элемента CreateUserForm, использующий для реализации запроса
 * асинхронную функцию, построенную без использования библиотеки Axios.
 * Предназначен для получения иного типа ответа для целей дебага через DevTools.
 *
 * В качестве функциональной замены библиотеки используется метод fetch().
 */

export class FetchCreateUserForm extends React.Component {

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
                        <th> User ID:</th>
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
                        <td><input type="number" pattern={INT_REGEXP} id="age_send"/></td>
                        <td>
                            <input type="radio" defaultChecked name="sex_send" value="MALE" id="sex_send"/>MALE
                            <input type="radio" name="sex_send" value="FEMALE" id="sex_send"/>FEMALE
                        </td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="money_send"/></td>
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
        const buttons = document.querySelectorAll("input[name='sex_send']")
        let sex = "MALE"
        for (const b of buttons) {
            if (b.checked) {
                sex = b.value
            }
        }
        let money = parseFloat(document.getElementById("money_send").value)

        let json =
            {
                "firstName": firstName, "secondName": lastName, "age": age, "sex": sex, "money": money
            }
        let answer = " "
        if (firstName === "" || lastName === "" || !age || !money) {
            answer = "Invalid request data"
            this.setState({answer})
        } else {
            let URI = "http://77.50.236.203:4880/addUser"
            await fetch(URI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })
                .then(function (response) {
                    answer = "Code: " + response.status
                    console.log(response);
                })
            this.setState({answer})
        }
    }
}

export default FetchCreateUserForm