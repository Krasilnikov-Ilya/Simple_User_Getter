import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP, INT_REGEXP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего создать в БД новый дом посредством API
 *
 * Для создания и отображения формы ввода использует метод render()
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushHouseToAPI,
 * вызываемую кнопкой отправки данных.
 * В случае, если данные корректны, функция собирает данные из полей формы,
 * формирует из них json-файл и встраивает как тело запроса axios.
 */

export class PostHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            tableData: [],
            newHouseId: null,
            floorInput: null,
            priceInput: null,
            parkingTTInput: null,
            parkingTFInput: null,
            parkingFTInput: null,
            parkingFFInput: null
        };
    }


    render() {
        const houseFloorHandler = (e) => {
            let floorInput = parseInt(e.target.value)
            this.setState({floorInput})
        }
        const housePriceHandler = (e) => {
            let priceInput = parseFloat(e.target.value)
            this.setState({priceInput})
        }
        const houseParkingHandlerTT = (e) => {
            let parkingTTInput = parseInt(e.target.value)
            this.setState({parkingTTInput})
        }
        const houseParkingHandlerTF = (e) => {
            let parkingTFInput = parseInt(e.target.value)
            this.setState({parkingTFInput})
        }
        const houseParkingHandlerFT = (e) => {
            let parkingFTInput = parseInt(e.target.value)
            this.setState({parkingFTInput})
        }
        const houseParkingHandlerFF = (e) => {
            let parkingFFInput = parseInt(e.target.value)
            this.setState({parkingFFInput})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> Floors:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td>ID&nbsp;will&nbsp;be&nbsp;generated</td>
                        <td><input type="number" onChange={e => houseFloorHandler(e)} pattern={INT_REGEXP}
                                   id="floor_send"/></td>
                        <td><input type="number" onChange={e => housePriceHandler(e)} pattern={FLOAT_REGEXP}
                                   step={FLOAT_STEP} id="price_send"/></td>
                    </tr>
                    </tbody>
                </Table>


                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> Has&nbsp;warm&nbsp;and&nbsp;covered&nbsp;parking&nbsp;places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking1">
                        <td> Type&nbsp;"0"&nbsp;if&nbsp;house&nbsp;has&nbsp;no&nbsp;parking&nbsp;places&nbsp;of&nbsp;this&nbsp;type.&nbsp;Places&nbsp;count: <input
                            type="number" onChange={e => houseParkingHandlerTT(e)} id="parking_first_send"/></td>
                        <td> Yes</td>
                        <td> Yes</td>
                    </tr>
                    </tbody>
                </Table>


                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> Has&nbsp;warm,&nbsp;not&nbsp;covered&nbsp;parking&nbsp;places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking2">
                        <td> Type&nbsp;"0"&nbsp;if&nbsp;house&nbsp;has&nbsp;no&nbsp;parking&nbsp;places&nbsp;of&nbsp;this&nbsp;type.&nbsp;Places&nbsp;count: <input
                            type="number" onChange={e => houseParkingHandlerTF(e)} id="parking_second_send"/></td>
                        <td> Yes</td>
                        <td> No</td>
                    </tr>
                    </tbody>
                </Table>


                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> Has&nbsp;cold,&nbsp;but&nbsp;covered&nbsp;parking&nbsp;places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking3">
                        <td> Type&nbsp;"0"&nbsp;if&nbsp;house&nbsp;has&nbsp;no&nbsp;parking&nbsp;places&nbsp;of&nbsp;this&nbsp;type.&nbsp;Places&nbsp;count: <input
                            type="number" onChange={e => houseParkingHandlerFT(e)} id="parking_third_send"/></td>
                        <td> No</td>
                        <td> Yes</td>
                    </tr>
                    </tbody>
                </Table>


                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> Has cold, not covered parking places:</th>
                        <th> Warm:</th>
                        <th> Covered:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="parking4">
                        <td> Type&nbsp;"0"&nbsp;if&nbsp;house&nbsp;has&nbsp;no&nbsp;parking&nbsp;places&nbsp;of&nbsp;this&nbsp;type.&nbsp;Places&nbsp;count: <input
                            type="number" onChange={e => houseParkingHandlerFF(e)} id="parking_fourth_send"/></td>
                        <td> No</td>
                        <td> No</td>
                    </tr>
                    </tbody>
                </Table>

                <ButtonGroup>
                    <Button className="tableButton" onClick={this.pushHouseToAPI}
                            variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;-</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="newId" disabled
                            variant="secondary">{this.state.newHouseId}</Button>
                </ButtonGroup>
                <hr/>
            </div>
        );
    }

    pushHouseToAPI = async () => {
        let firstParking = {"isWarm": true, "isCovered": true, "placesCount": this.state.parkingTTInput}
        let secondParking = {"isWarm": true, "isCovered": false, "placesCount": this.state.parkingTFInput}
        let thirdParking = {"isWarm": false, "isCovered": true, "placesCount": this.state.parkingFTInput}
        let fourthParking = {"isWarm": false, "isCovered": false, "placesCount": this.state.parkingFFInput}
        let json = {
            "floorCount": this.state.floorInput,
            "price": this.state.priceInput,
            parkingPlaces: []
        }
        if (this.state.parkingTTInput > 0) json.parkingPlaces.push(firstParking)
        if (this.state.parkingTFInput > 0) json.parkingPlaces.push(secondParking)
        if (this.state.parkingFTInput > 0) json.parkingPlaces.push(thirdParking)
        if (this.state.parkingFFInput > 0) json.parkingPlaces.push(fourthParking)
        let push_uri = '/addHouse'
        let answer = " "
        let newHouseId = null
        if (this.state.floorInput < 1 || this.state.priceInput < 0 ||
            isNaN(this.state.floorInput) || isNaN(this.state.priceInput) ||
            this.state.floorInput == null || this.state.priceInput == null ||
            this.state.parkingTTInput < 0 || this.state.parkingTFInput < 0 ||
            this.state.parkingFTInput < 0 || this.state.parkingFFInput < 0) {
            answer = "Invalid input data"
            newHouseId = null
            this.setState({answer})
            this.setState({newHouseId})
        } else {
            await API.post(push_uri, json)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                    newHouseId = "New house ID: " + response.data.id
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);

                });
            this.setState({newHouseId})
            this.setState({answer})
        }
    }
}

export default PostHouse
