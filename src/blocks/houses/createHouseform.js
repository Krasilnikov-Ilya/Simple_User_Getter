import React from "react";
import API from "../../utils/API";

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
                        <td><input id="floor_send"/></td>
                        <td><input id="price_send"/></td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has parking places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td><input id="parking_first_send"/></td>
                        <td><input type="checkbox" id="warm_first_send"/></td>
                        <td><input type="checkbox" id="covered_first_send"/></td>
                    </tr>
                    </tbody>
                </table>

                <hr/>

                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Has parking places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td><input id="parking_second_send"/></td>
                        <td><input type="checkbox" id="warm_second_send"/></td>
                        <td><input type="checkbox" id="covered_second_send"/></td>
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
        let warm_first = document.getElementById("warm_first_send").checked
        let warm_second = document.getElementById("warm_second_send").checked
        let covered_first = document.getElementById("covered_first_send").checked
        let covered_second = document.getElementById("covered_second_send").checked

        let firstParking = {"isWarm": warm_first, "isCovered": covered_first, "placesCount": first_parking_count}
        let secondParking = {"isWarm": warm_second, "isCovered": covered_second, "placesCount": second_parking_count}

        if (!first_parking_count) firstParking = null
        if (!second_parking_count) secondParking = null
        if (first_parking_count === 0) firstParking = null
        if (second_parking_count === 0) secondParking = null

        let json = {
            "floorCount": floor,
            "price": price,
            parkingPlaces: [firstParking, secondParking]
        }

        console.log(json)

        let push_uri = '/addHouse'

        let answer = " "

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
        console.log(this.state.answer)

    }
}

export default CreateHouseForm