import React from "react";
import API from "../../utils/API";
import {INT_REGEXP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

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

export class PostUserHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            userIdInput: null,
            houseIdInput: null,
            errorMessage: ""
        };
    }

    render() {
        const userIdHandler = (e) => {
            let userIdInput = parseInt(e.target.value)
            this.setState({userIdInput})
        }
        const houseIdHandler = (e) => {
            let houseIdInput = parseInt(e.target.value)
            this.setState({houseIdInput})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover>
                    <thead>
                    <tr key="head">
                        <th> User ID:</th>
                        <th> House ID:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="id_send"
                                   onChange={e => userIdHandler(e)}/></td>
                        <td><input type="number" pattern={INT_REGEXP} id="house_send"
                                   onChange={e => houseIdHandler(e)}/></td>
                    </tr>
                    </tbody>
                </Table>

                <ButtonGroup>
                    <Button className="tableButton" onClick={this.postUserAndHouse}
                            variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;--</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="message" disabled
                            variant="secondary">{this.state.errorMessage}</Button>
                </ButtonGroup>
                <p></p>
                <hr/>
            </div>
        );
    }

    postUserAndHouse = async () => {
        let userIdUrl = this.state.userIdInput
        let houseIdUrl = this.state.houseIdInput
        let push_uri = '/house/' + houseIdUrl + "/settle/" + userIdUrl
        let answer = " "
        let errorMessage = ""
        if (isNaN(userIdUrl) || isNaN(houseIdUrl) || userIdUrl == null || houseIdUrl == null || userIdUrl <= 0 || houseIdUrl <= 0) {
            answer = "Incorrect input data"
            this.setState({answer})
        } else {
            await API.post(push_uri)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                    errorMessage = error.response.data.errorMessage
                });
            this.setState({answer})
            this.setState({errorMessage})
        }
        console.log(this.state.answer)
    }
}


export default PostUserHouse
