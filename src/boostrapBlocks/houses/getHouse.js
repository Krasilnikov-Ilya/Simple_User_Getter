import React from "react";
import API from "../../utils/API";
import {INT_REGEXP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку GET запроса,
 * позволяющего получить из БД данные по одному конкретному дому используя его ID.
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию addHouse,
 * вызываемую кнопкой Read.
 * Функция addHouse использует для получения дома по ID данные, введённые в поле.
 *
 * Для создания и отображения таблицы использует метод render(), который вызывает метод
 * renderHouseTableRows() для отображения информации о доме, а так же:
 * renderParkingPlacesTableRows() для отображения информации о парковочных местах
 * и renderLodgersTableRows() для тображения информации о жителях
 *
 * При создании обладает массивом tableData предназначенным для метода renderTableRows(),
 * в котором содержатся пустые массивы parkingPlaces и lodgers, предназначенные для метода
 * renderParkingPlacesTableRows() и renderLodgersTableRows() соответственно.
 * Рендеринг работает в реальном времени, но т.к. данные отсутствуют,
 * отрисовка новых элементов таблицы не происходит.
 *
 * После получения ответа от API его тело сохраняется в tableData, что инициирует образование
 * новых элементов-домов методом renderHouseTableRows(), новых элементов-парковок методом
 * renderParkingPlacesTableRows() и новых элементов-жителей методом renderLodgersTableRows()
 */

export class GetHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            parkingPlaces: [],
            lodgers: [],
            houseIdInput: 1,
            answer: ""
        };
        this.addHouse = this.addHouse.bind(this)
        this.renderLodgersTableRows = this.renderLodgersTableRows.bind(this)
        this.renderParkingPlacesTableRows = this.renderParkingPlacesTableRows.bind(this)
        this.renderHouseTableRows = this.renderHouseTableRows.bind(this)
    }

    addHouse = async () => {
        let answer
        let num = parseInt(this.state.houseIdInput)
        if (!num || num < 1) {
            console.log("Invalid input")
            answer = " Invalid input"
            this.setState({answer})
        } else {
            let houses_uri = '/house/' + num.toString();
            let houseData = await API.get(houses_uri)
            if (houseData.status === 204) {
                answer = houseData.status + " house not found"
                this.setState({answer})
            } else {
                let tableData = []
                let data = {
                    id: houseData.data.id,
                    floorCount: houseData.data.floorCount,
                    price: houseData.data.price,
                    parkingPlaces: houseData.data.parkingPlaces,
                    lodgers: houseData.data.lodgers
                }
                tableData.push(data)
                let parkingPlaces = houseData.data.parkingPlaces
                let lodgers = houseData.data.lodgers
                answer = houseData.status + " ok"
                this.setState({answer})
                this.setState({tableData})
                this.setState({parkingPlaces})
                this.setState({lodgers})
            }
        }

    }

    render() {
        const houseData = this.state.tableData

        const houseIdHandler = (e) => {
            let houseIdInput = parseInt(e.target.value)
            this.setState({houseIdInput})
        }

        if (!houseData) {
            return null
        } else {
            return (
                <div>
                    <hr/>
                    <div>
                        <ButtonGroup>
                            <Button variant="secondary">
                                <input onChange={e => houseIdHandler(e)} type="number" pattern={INT_REGEXP}
                                       id="house_input"/></Button>
                            <Button className="tableButton" onClick={this.addHouse}>Read</Button>
                            <Button className="status" disabled
                                    variant="secondary">{"Status: " + this.state.answer}</Button>
                        </ButtonGroup>
                    </div>
                    <hr/>
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr key="home">
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
                    <hr/>
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr key="person">
                            <th> ID:</th>
                            <th> First&nbsp;name:</th>
                            <th> Last&nbsp;name:</th>
                            <th> Age:</th>
                            <th> Sex:</th>
                            <th> Money:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderLodgersTableRows()}
                        </tbody>
                    </Table>
                    <hr/>
                    <Table striped bordered hover className="table">
                        <thead>
                        <tr key="parking">
                            <th> ID:</th>
                            <th> isWarm:</th>
                            <th> isCovered:</th>
                            <th> placesCount:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderParkingPlacesTableRows()}
                        </tbody>
                    </Table>
                </div>

            )
        }
    }

    renderHouseTableRows() {
        const houseData = this.state.tableData
        if (!houseData) return null;
        let result = [];
        houseData.forEach(house => {
            result.push(
                <tr key={house.id + "house"}>
                    <td>{house.id}</td>
                    <td>{house.floorCount}</td>
                    <td>{house.price}</td>
                    <td>
                        {Object.keys(house.parkingPlaces).length === 0 ? null : Object.keys(house.parkingPlaces).length}
                    </td>
                    <td>
                        {Object.keys(house.lodgers).length === 0 ? null : Object.keys(house.lodgers).length}
                    </td>
                </tr>
            )
        });
        return result;
    }

    renderLodgersTableRows() {
        const houseData = this.state.tableData
        if (!houseData) return null;
        const lodgerData = this.state.lodgers
        if (!lodgerData) return null;
        let result = [];
        lodgerData.forEach(lodger => {
            result.push(
                <tr key={lodger.id + "lodger"}>
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
        const houseData = this.state.tableData
        if (!houseData) return null;
        const parkingPlacesData = this.state.parkingPlaces
        if (!parkingPlacesData) return null;
        let result = [];
        parkingPlacesData.forEach(parkingPlace => {
            result.push(
                <tr key={parkingPlace.id + "parking"}>
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

    componentDidMount() {
        this.addHouse().catch(function (error) {
            console.log(error);
        })
    }
}

export default GetHouse
