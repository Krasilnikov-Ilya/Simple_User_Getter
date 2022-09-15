import React from "react";
import API from "../../utils/API";


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
                        <td><input id="user_send"/></td>
                        <td><input id="home_send"/></td>
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
        let userId =  parseInt(document.getElementById("user_send").value)
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