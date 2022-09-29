import React from "react";
import API from "../../utils/API";
import {Button, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку GET запроса,
 * позволяющего получить из БД новый все существующие дома.
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию readHouses,
 * вызываемую кнопкой Read.
 *
 * Для создания и отображения таблицы использует метод render(), которая вызывает метод
 * renderHouseTableRows() для создания и отображения содержимого таблицы.
 * Метод renderHouseTableRows() в свою очередь вызывает метод renderParkingPlacesTableRows(row)
 * и renderLodgersTableRows(row), которые принимают на вход номер текущего дома и выводят информацию
 * о парковочных местах и жильцах соответственно.
 *
 * При создании обладает пустым массивом tableData, предназначенным для метод renderTableRows().
 * Рендеринг работает в реальном времени, но т.к. данные в tableData отсутствуют,
 * отрисовка новых элементов таблицы не происходит.
 *
 * После получения ответа от API его тело сохраняется в tableData, что инициирует образование
 * новых элементов-домов методом renderHouseTableRows(), которая инициирует образование новых таблиц
 * парковочных мест и жителей методами renderParkingPlacesTableRows(row) и renderLodgersTableRows(row) соответственно
 */

export class GetHouses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        };
        this.readHouses = this.readHouses.bind(this)
        this.renderLodgersTableRows = this.renderLodgersTableRows.bind(this)
        this.renderParkingPlacesTableRows = this.renderParkingPlacesTableRows.bind(this)
        this.renderHouseTableRows = this.renderHouseTableRows.bind(this)
    }

    async readHouses() {
        let houses_uri = '/houses';
        let houseData = await API.get(houses_uri);
        let tableData = []
        let j = houseData.data.length
        for (let i = 0; i < j; i++) {
            let data = {
                id: houseData.data[i].id,
                floorCount: houseData.data[i].floorCount,
                price: houseData.data[i].price,
                parkingPlaces: houseData.data[i].parkingPlaces,
                lodgers: houseData.data[i].lodgers
            }
            tableData.push(data)
        }
        this.setState({tableData});
    }

    render() {
        return (
            <div>
                <Button variant="primary" className="tableButton" onClick={this.addHouse}>Reload</Button>
                <hr/>
                <Table bordered className="table">
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> Floor&nbsp;Count:</th>
                        <th> Price:</th>
                        <th> Parking&nbsp;Places:</th>
                        <th> Lodgers:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderHouseTableRows()}
                    </tbody>
                </Table>
            </div>

        )
    }

    renderHouseTableRows() {
        const houseData = this.state.tableData
        if (!houseData) return null;
        let result = [];
        let row = 0
        houseData.forEach(house => {
            result.push(
                <tr key={house.id}>
                    <td>{house.id}</td>
                    <td>{house.floorCount}</td>
                    <td>{house.price}</td>
                    <td>
                        <Table striped bordered hover  className="table">
                            <thead>
                            <tr key="head">
                                <th> ID:</th>
                                <th> isWarm:</th>
                                <th> isCovered:</th>
                                <th> placesCount:</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderParkingPlacesTableRows(row)}
                            </tbody>
                        </Table>
                    </td>
                    <td>
                        <Table striped bordered hover className="table">
                            <thead>
                            <tr key="head">
                                <th> ID:</th>
                                <th> First&nbsp;name:</th>
                                <th> Last&nbsp;name:</th>
                                <th> Age:</th>
                                <th> Sex:</th>
                                <th> Money:</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderLodgersTableRows(row)}
                            </tbody>
                        </Table>
                    </td>
                </tr>
            )
            row = row + 1
        });
        return result;
    }

    renderLodgersTableRows(row) {
        const lodgerData = this.state.tableData[row].lodgers
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

    renderParkingPlacesTableRows(row) {
        const parkingPlacesData = this.state.tableData[row].parkingPlaces
        if (!parkingPlacesData) return null;
        let result = [];
        parkingPlacesData.forEach(parking => {
            result.push(
                <tr key={parking.id}>
                    <td>{parking.id}</td>
                    <td>{parking.isWarm == null ? "null" : parking.isWarm ? "warm" : "cold"}</td>
                    <td>{parking.isCovered == null ? "null" : parking.isCovered ? "covered" : "not covered"}</td>
                    <td>{parking.placesCount}</td>
                </tr>
            )
        });
        return result;
    }

    componentDidMount() {
        this.readHouses().catch(function (error){console.log(error);})
    }
}

export default GetHouses
