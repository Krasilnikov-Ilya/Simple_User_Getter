import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP} from "../../utils/constants";


export class CreateCarForm extends React.Component {

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
                        <th> Car ID:</th>
                        <th> Engine Type:</th>
                        <th> Mark:</th>
                        <th> Model:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td>ID will be generated</td>
                        <td><input id="car_engine_type_send"/></td>
                        <td><input id="car_mark_send"/></td>
                        <td><input id="car_model_send"/></td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="car_price_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushCarToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <hr/>
            </div>
        );
    }

    pushCarToAPI = async () => {
        let type = document.getElementById("car_engine_type_send").value
        let mark = document.getElementById("car_mark_send").value
        let model = document.getElementById("car_model_send").value
        let price = parseFloat(document.getElementById("car_price_send").value)

        let json =
            {
                "engineType": type, "mark": mark, "model": model, "price": price
            }

        let push_uri = '/addCar'

        let answer = " "

        if (type === "" || mark === "" || model === "" || !price) {
            answer = "Invalid request data"
            this.setState({answer})
        } else {
            await API.post(
                push_uri, json)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                });
        }
        this.setState({answer})
        console.log(this.state.answer)
    }
}

export default CreateCarForm