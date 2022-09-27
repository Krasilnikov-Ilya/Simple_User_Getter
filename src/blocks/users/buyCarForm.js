import React from "react";
import API from "../../utils/API";
import {INT_REGEXP} from "../../utils/constants";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего купить пользователю машину по его ID и ID машины
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushUserAndCarToAPI,
 * вызываемую кнопкой PUSH TO API.
 * Функция pushUserAndCarToAPI использует для составления запроса данные, введённые в поля.
 *
 * Для создания и отображения формы использует метод render().
 */

export class BuyCarForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            money: null
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
                        <th> Car ID:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="user_send"/></td>
                        <td><input type="number" pattern={INT_REGEXP} id="car_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushUserAndCarToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <p>{"Total money: " + this.state.money}</p>
                <hr/>
            </div>
        );
    }

    pushUserAndCarToAPI = async () => {
        let userId =  parseInt(document.getElementById("user_send").value)
        let carId = parseInt(document.getElementById("car_send").value)
        let push_uri = '/user/' + userId + "/buyCar/" + carId
        let answer = " "
        let money = null
        await API.post(push_uri)
            .then(function (response) {
                answer = "Successfully pushed, code: " + response.status
                money = response.data.money
                console.log(response);
            })
            .catch(function (error) {
                answer = error.toString()
                console.log(error);
            });
        this.setState({answer})
        this.setState({money})
        console.log(this.state.answer)
    }
}

export default BuyCarForm