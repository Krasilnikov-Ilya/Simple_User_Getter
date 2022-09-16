import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";

export class CreateHouseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            tableData: []
        };
    }

    render() {
        return (
            <div>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> Floors:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td>ID will be generated</td>
                        <td><input type="number" pattern={INT_REGEXP}  id="floor_send"/></td>
                        <td><input type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="price_send"/></td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has warm and covered parking places: </th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking1">
                        <td> Type "0" if house has no parking places of this type. Places count: <input type="number" id="parking_first_send"/></td>
                        <td> Yes</td>
                        <td> Yes</td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has warm, not covered parking places: </th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking2">
                        <td> Type "0" if house has no parking places of this type. Places count: <input type="number" id="parking_second_send"/></td>
                        <td> Yes</td>
                        <td> No</td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has cold, but covered parking places: </th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking3">
                        <td> Type "0" if house has no parking places of this type. Places count: <input type="number" id="parking_third_send"/></td>
                        <td> No</td>
                        <td> Yes</td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has cold, not covered parking places: </th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking4">
                        <td> Type "0" if house has no parking places of this type. Places count: <input type="number" id="parking_fourth_send"/></td>
                        <td> No</td>
                        <td> No</td>
                    </tr>
                    </tbody>
                </table>

                <hr/>
                <button className="tableButton" onClick={this.pushHouseToAPI}><p>-- PUSH TO API --</p></button>
                <p>{"Status: " + this.state.answer}</p>
                <hr/>
            </div>
        );
    }

    pushHouseToAPI = async () => {
        let floor = parseInt(document.getElementById("floor_send").value)
        let price = parseFloat(document.getElementById("price_send").value)
        let first_parking_count = parseInt(document.getElementById("parking_first_send").value)
        let second_parking_count = parseInt(document.getElementById("parking_second_send").value)
        let third_parking_count = parseInt(document.getElementById("parking_third_send").value)
        let fourth_parking_count = parseInt(document.getElementById("parking_fourth_send").value)

        let firstParking = {"isWarm": true, "isCovered": true, "placesCount": first_parking_count}
        let secondParking = {"isWarm": true, "isCovered": false, "placesCount": second_parking_count}
        let thirdParking = {"isWarm": false, "isCovered": true, "placesCount": first_parking_count}
        let fourthParking = {"isWarm": false, "isCovered": false, "placesCount": fourth_parking_count}

        let json = {
            "floorCount": floor,
            "price": price,
            parkingPlaces: []
        }

        if (first_parking_count > 0)  json.parkingPlaces.push(firstParking)
        if (second_parking_count > 0) json.parkingPlaces.push(secondParking)
        if (third_parking_count > 0)  json.parkingPlaces.push(thirdParking)
        if (fourth_parking_count > 0) json.parkingPlaces.push(fourthParking)

        let push_uri = '/addHouse'

        let answer = " "

        if (floor < 1 || price < 0 ||
            isNaN(floor) || isNaN(price) ||
            first_parking_count < 0 ||
            second_parking_count < 0 ||
            third_parking_count < 0 ||
            fourth_parking_count < 0) {
            answer = "Invalid input data"
            console.log(answer)
        } else {
            await API.post(push_uri, json)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                });
            this.setState({answer})
            console.log(answer)
        }
    }
}

export default CreateHouseForm