import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";


export class PlusUserMoneyForm extends React.Component {

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
                        <th> Money:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="user">
                        <td><input type="number" pattern={INT_REGEXP} id="id_send"/></td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="money_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushUserAndMoneyToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <p>{"Total money: " + this.state.money}</p>
                <hr/>
            </div>
        );
    }

    pushUserAndMoneyToAPI = async () => {
        let id =  parseInt(document.getElementById("id_send").value)
        let moneyUrl = parseFloat(document.getElementById("money_send").value)
        let push_uri = '/user/' + id + "/money/" + moneyUrl
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

export default PlusUserMoneyForm