import React from "react";
import API from "../../utils/API";
import {INT_REGEXP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

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

export class PostUserCar extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            userIdInput: null,
            carIdInput: null,
            errorMessage: ""
        };
    }

    render() {
        const userIdHandler = (e) => {
            let userIdInput = parseInt(e.target.value)
            this.setState({userIdInput})
        }
        const carIdHandler = (e) => {
            let carIdInput = parseFloat(e.target.value)
            this.setState({carIdInput})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover>
                    <thead>
                    <tr key="head">
                        <th> User ID:</th>
                        <th> Car Id:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="id_send"
                                   onChange={e => userIdHandler(e)}/></td>
                        <td><input type="number" pattern={INT_REGEXP} id="car_send"
                                   onChange={e => carIdHandler(e)}/></td>
                    </tr>
                    </tbody>
                </Table>

                <ButtonGroup>
                    <Button className="tableButton" onClick={this.postUserAndCar}
                            variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;--</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="money" disabled
                            variant="secondary">{this.state.errorMessage}</Button>
                </ButtonGroup>
                <p></p>
                <hr/>
            </div>
        );
    }

    postUserAndCar = async () => {
        let userIdUrl = this.state.userIdInput
        let carIdUrl = this.state.carIdInput
        let push_uri = '/user/' + userIdUrl + "/buyCar/" + carIdUrl
        let answer = " "
        let money = null
        let errorMessage = ""
        if (isNaN(userIdUrl) || isNaN(carIdUrl) || userIdUrl == null || carIdUrl == null || userIdUrl <= 0 || carIdUrl <= 0) {
            answer = "Incorrect input data"
            money = null
            this.setState({answer})
            this.setState({money})
        } else {
            await API.post(push_uri)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    money = response.data.money
                    console.log(response);
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                    errorMessage = error.response.data.errorMessage
                });
            this.setState({answer})
            this.setState({money})
            this.setState({errorMessage})
        }
        console.log(this.state.answer)
    }
}

export default PostUserCar
