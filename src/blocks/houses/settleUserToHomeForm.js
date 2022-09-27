import React from "react";
import API from "../../utils/API";
import {INT_REGEXP} from "../../utils/constants";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего внести пользователя по его ID в дом по его ID
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushUserAndHomeToAPI,
 * вызываемую кнопкой PUSH TO API.
 * Функция pushUserAndHomeToAPI использует для составления запроса данные, введённые в поля.
 *
 * Для создания и отображения формы использует метод render().
 */

export class SettleUserToHomeForm extends React.Component {

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
                        <th> Home ID:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="user_send"/></td>
                        <td><input type="number" pattern={INT_REGEXP} id="home_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushUserAndHomeToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <p>{"Total money: " + this.state.money}</p>
                <hr/>
            </div>
        );
    }

    pushUserAndHomeToAPI = async () => {
        let userId = parseInt(document.getElementById("user_send").value)
        let homeId = parseInt(document.getElementById("home_send").value)
        let push_uri = '/house/' + homeId + "/settle/" + userId
        let answer = " "
        await API.post(push_uri)
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

export default SettleUserToHomeForm