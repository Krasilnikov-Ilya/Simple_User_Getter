import React from "react";
import API from "../../utils/API";

export class ReadHouseTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [
                {
                    "parkingPlaces": [],
                    "lodgers": []
                }
            ]
        };
        this.addHouse = this.addHouse.bind(this)
        this.renderLodgersTableRows = this.renderLodgersTableRows.bind(this)
        this.renderParkingPlacesTableRows = this.renderParkingPlacesTableRows.bind(this)
        this.renderHouseTableRows = this.renderHouseTableRows.bind(this)
    }

    addHouse = async () => {
        let num = document.getElementById("house_input").value
        let houses_uri = '/house/' + num.toString();
        let houseData = await API.get(houses_uri);
        this.state = {
            tableData: []
        };
        let tableData = [...this.state.tableData]
        let data = {
            id: houseData.data.id,
            floorCount: houseData.data.floorCount,
            price: houseData.data.price,
            parkingPlaces: houseData.data.parkingPlaces,
            lodgers: houseData.data.lodgers
        }
        tableData.push(data)
        this.setState({tableData});
    }

    render() {
        const houseData = this.state.tableData
        if (!houseData) return null;

        return (
            <div>
                <hr/>
                <input id="house_input"/>
                <button className="tableButton" onClick={this.addHouse}><p>Read</p></button>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> Floor Count:</th>
                        <th> Price:</th>
                        <th> Parking Places:</th>
                        <th> Lodgers:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderHouseTableRows()}
                    </tbody>
                </table>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> First name:</th>
                        <th> Last name:</th>
                        <th> Age:</th>
                        <th> Sex:</th>
                        <th> Money:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderLodgersTableRows()}
                    </tbody>
                </table>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> isWarm:</th>
                        <th> isCovered:</th>
                        <th> placesCount:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderParkingPlacesTableRows()}
                    </tbody>
                </table>
            </div>

        )
    }

    renderHouseTableRows() {
        const houseData = this.state.tableData
        if (!houseData) return null;
        let result = [];
        houseData.forEach(house => {
            result.push(
                <tr key={house.id}>
                    <td>{house.id}</td>
                    <td>{house.floorCount}</td>
                    <td>{house.price}</td>
                    <td>
                        {Object.keys(house.parkingPlaces).length}
                    </td>
                    <td>
                        {Object.keys(house.lodgers).length}
                    </td>
                </tr>
            )
        });
        return result;
    }

    renderLodgersTableRows() {
        const houseData = this.state.tableData
        if (!houseData) return null;
        const lodgerData = this.state.tableData[0].lodgers
        if (!lodgerData) return null;
        let result = [];
        lodgerData.forEach(lodger => {
            result.push(
                <tr key={lodger.id}>
                    <td>{lodger.id}</td>
                    <td>{lodger.firstName}</td>
                    <td>{lodger.secondName}</td>
                    <td>{lodger.age}</td>
                    <td>{lodger.sex}</td>
                    <td>{lodger.money}</td>
                </tr>
            )
        });
        return result;
    }

    renderParkingPlacesTableRows() {
        const parkingPlacesData = this.state.tableData[0].parkingPlaces
        if (!parkingPlacesData) return null;
        let result = [];
        parkingPlacesData.forEach(parkingPlace => {
            result.push(
                <tr key={parkingPlace.id}>
                    <td>{parkingPlace.id}</td>
                    <td>{parkingPlace.isWarm == null ? "null" :
                        parkingPlace.isWarm ? "warm" : "cold"}</td>
                    <td>{parkingPlace.isCovered == null ? "null" :
                        parkingPlace.isCovered ? "covered" : "not covered"}</td>
                    <td>{parkingPlace.placesCount}</td>
                </tr>
            )
        });
        return result;
    }
}

export default ReadHouseTable