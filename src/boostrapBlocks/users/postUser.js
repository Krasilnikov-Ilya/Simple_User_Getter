import React from "react";
import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";
import API from "../../utils/API";
import {Button, ButtonGroup, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего создать в БД нового пользователя посредством API
 *
 * Для создания и отображения формы ввода использует метод render()
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushUserToAPI,
 * вызываемую кнопкой отправки данных.
 * В случае, если данные корректны, функция собирает данные из полей формы,
 * формирует из них json-файл и встраивает как тело запроса axios.
 */

export class PostUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            newUserId: null,
            firstNameInput: "",
            lastNameInput: "",
            ageInput: null,
            sexInput: null,
            sexEntered: false,
            moneyInput: null
        };
    }

    render() {
        const userFirstNameHandler = (e) => {
            let firstNameInput = e.target.value
            this.setState({firstNameInput})
        }
        const userLastNameHandler = (e) => {
            let lastNameInput = e.target.value
            this.setState({lastNameInput})
        }
        const userAgeHandler = (e) => {
            let ageInput = parseInt(e.target.value)
            this.setState({ageInput})
        }
        const userSexHandler = (e) => {
            let sexInput = e.target.value
            let sexEntered = true
            this.setState({sexInput})
            this.setState({sexEntered})
        }
        const userMoneyHandler = (e) => {
            let moneyInput = parseFloat(e.target.value)
            this.setState({moneyInput})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover>
                    <thead>
                    <tr key="head">
                        <th> User&nbsp;ID:</th>
                        <th> First&nbsp;Name:</th>
                        <th> Last&nbsp;Name:</th>
                        <th> Age:</th>
                        <th> Sex:</th>
                        <th> Money:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td>ID will be generated</td>
                        <td><input id="first_name_send" onChange={e => userFirstNameHandler(e)}/></td>
                        <td><input id="last_name_send" onChange={e => userLastNameHandler(e)}/></td>
                        <td><input type="number" pattern={INT_REGEXP} id="age_send" onChange={e => userAgeHandler(e)}/>
                        </td>
                        <td>
                            <div><input type="radio" name="sex_send" value="MALE" id="sex_send"
                                        onChange={e => userSexHandler(e)}/>MALE&ensp;&ensp;</div>
                            <div><input type="radio" name="sex_send" value="FEMALE" id="sex_send"
                                        onChange={e => userSexHandler(e)}/>FEMALE
                            </div>
                        </td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="money_send"
                                   onChange={e => userMoneyHandler(e)}/></td>
                    </tr>
                    </tbody>
                </Table>
                <ButtonGroup>
                    <Button className="tableButton" onClick={this.createUser}
                        variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;--</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="newId" disabled
                            variant="secondary">{this.state.newUserId}</Button>
                </ButtonGroup>
                <hr/>
            </div>
        );
    }

    createUser = async () => {
        let json = {
            "firstName": this.state.firstNameInput,
            "secondName": this.state.lastNameInput,
            "age": this.state.ageInput,
            "sex": this.state.sexInput,
            "money": this.state.moneyInput
        }
        let push_uri = '/addUser'
        let answer = " "
        let newUserId = null
        if (json.firstName === "" || json.secondName === "" || isNaN(json.age) || json.age == null || json.age <= 0
            || isNaN(json.money) || json.money == null || !this.state.sexEntered) {
            answer = "Invalid request data"
            newUserId = null
            this.setState({answer})
            this.setState({newUserId})
        } else {
            await API.post(
                push_uri, json)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                    newUserId = "New user ID: " + response.data.id

                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                });
            this.setState({newUserId})
            this.setState({answer})
        }
    }
}

export default PostUser
