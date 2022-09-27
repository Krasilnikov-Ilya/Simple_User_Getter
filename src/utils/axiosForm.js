import React from "react";
import axios from "axios"

/**
 * React-компонент, предназначенный для подключения к сервису reqres.in и получения с него ответа на GET и POST запрос.
 * Служит для целей дебага через DevTools.
 */

export class AxiosForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: null,
            first_name: null,
            last_name: null,
            userData: [],
            answer: []
        }
    }

    render() {
        return (
            <div>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> id:</th>
                        <th> email:</th>
                        <th> first_name:</th>
                        <th> last_name:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td>{this.state.id}</td>
                        <td>{this.state.email}</td>
                        <td>{this.state.first_name}</td>
                        <td>{this.state.last_name}</td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.getUser}><p>-- GET USER --</p></button>
                <hr/>
                <p>{"Status: " +  JSON.stringify(this.state.userData)}</p>
                <hr/>
                <button className="tableButton" onClick={this.postUser}><p>-- POST USER --</p></button>
                <hr/>
                <p>{"Status: " + JSON.stringify(this.state.answer)}</p>
                <hr/>
            </div>
        );
    }

    getUser = async () => {
        let user_uri = 'https://reqres.in/api/users/2';
        let userData = await axios.get(user_uri);
        this.state.id = userData.data.data.id
        this.state.email = userData.data.data.email
        this.state.first_name = userData.data.data.first_name
        this.state.last_name = userData.data.data.last_name
        console.log(userData)
        this.setState({userData})
    }

    postUser = async () => {
        let user_uri = 'https://reqres.in/api/users';
        let userData =
            {
                "name": "morpheus",
                "job": "leader"
            }
        let answer = await axios.post(user_uri, userData);
        console.log(answer)
        this.setState({answer})
    }
}