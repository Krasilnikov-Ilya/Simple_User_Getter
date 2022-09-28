import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего добавить пользователю денег по его ID.
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushUserAndMoneyToAPI,
 * вызываемую кнопкой PUSH TO API.
 * Функция pushUserAndMoneyToAPI использует для составления запроса данные, введённые в поля.
 *
 * Для создания и отображения формы использует метод render().
 */

export class PostUserMoney extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            userId: null,
            userMoney: null
        };
    }

    render() {
        const userIdHandler = (e) => {
            let userId = parseInt(e.target.value)
            this.setState({userId})
        }
        const userMoneyHandler = (e) => {
            let userMoney = parseFloat(e.target.value)
            this.setState({userMoney})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover>
                    <thead>
                    <tr key="head">
                        <th> User ID:</th>
                        <th> Money:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="id_send"
                                   onChange={e => userIdHandler(e)}/></td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="money_send"
                                   onChange={e => userMoneyHandler(e)}/></td>
                    </tr>
                    </tbody>
                </Table>

                <ButtonGroup>
                    <Button className="tableButton" onClick={this.postUserAndMoney}
                            variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;--</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="money" disabled
                            variant="secondary">{this.state.money}</Button>
                </ButtonGroup>
                <p></p>
                <hr/>
            </div>
        );
    }

    postUserAndMoney = async () => {
        let idUrl = this.state.userId
        let moneyUrl = this.state.userMoney
        let push_uri = '/user/' + idUrl + "/money/" + moneyUrl
        let answer = " "
        let money = null
        if (isNaN(idUrl) || isNaN(moneyUrl) || idUrl == null || moneyUrl == null || idUrl <= 0 || moneyUrl <= 0) {
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
                });
            this.setState({answer})
            this.setState({money})
        }
        console.log(this.state.answer)
    }
}

export default PostUserMoney
