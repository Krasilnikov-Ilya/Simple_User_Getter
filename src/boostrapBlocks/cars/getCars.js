import React from "react";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import API from "../../utils/API";

/**
 * React-компонент, отвечающий за создание и отправку GET запроса,
 * позволяющего получить из БД новый все существующие автомобили,
 * а так же отсортировать их по любому существующему полю в прямом и обратном порядке.
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию addCar,
 * вызываемую кнопкой Read.
 *
 * Для создания и отображения таблицы использует метод render(), который вызывает метод
 * renderTableRows() для создания и отображения содержимого таблицы.
 *
 * При создании обладает пустым массивом tableData, предназначенным для метода renderTableRows().
 * Методы рендеринга работают в реальном времени, но т.к. данные в tableData отсутствуют,
 * отрисовка новых элементов таблицы не происходит.
 *
 * После получения ответа от API его тело сохраняется в tableData, что инициирует образование
 * новых элементов таблицы методом renderTableRows()
 *
 * Так как данные ответа сохранены в состоянии элемента, возможна сортировка данных функциями.
 * Каждая функция, вызываемая кнопками с названием колонки изменяет порядок данных в файле,
 * что инициирует процесс изменения порядка отображения данных методом renderTableRows()
 * Функции сортировки расположены в конце файла и обладают "говорящим" названием.
 */

export class GetCars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            sortedData: [],
            sortedBy: ""
        };
    }

    render() {
        return (
            <div>
                <ButtonGroup aria-label="sort">
                    <Button variant="primary" onClick={this.readCars.bind(this)}>Reload</Button>
                    <Button variant="secondary" disabled>Sort&nbsp;by:</Button>
                    <Button variant="secondary" style={{minWidth: "10%"}} onClick={() => this.sortCars('id')}>
                        {(this.state.sortedBy === "idAsc") ? "↑" : ""}{(this.state.sortedBy === "idDesc") ? "↓" : ""}&nbsp;ID&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortCars('engineType')}>
                        {(this.state.sortedBy === "engineTypeAsc") ? "↑" : ""}{(this.state.sortedBy === "engineTypeDesc") ? "↓" : ""}&nbsp;Engine&nbsp;Type&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortCars('mark')}>
                        {(this.state.sortedBy === "markAsc") ? "↑" : ""}{(this.state.sortedBy === "markDesc") ? "↓" : ""}&nbsp;Mark&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortCars('model')}>
                        {(this.state.sortedBy === "modelAsc") ? "↑" : ""}{(this.state.sortedBy === "modelDesc") ? "↓" : ""}&nbsp;Model&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortCars('price')}>
                        {(this.state.sortedBy === "priceAsc") ? "↑" : ""}{(this.state.sortedBy === "priceDesc") ? "↓" : ""}&nbsp;Price&nbsp;
                    </Button>
                </ButtonGroup>
                <hr/>
                <Table striped bordered hover>
                    <thead>
                    <tr key="head">
                        <th> ID:</th>
                        <th> Engine&nbsp;Type:</th>
                        <th> Mark:</th>
                        <th> Model:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCarsTableRows()}
                    </tbody>
                </Table>
            </div>
        )
    }

    sortCars = (col) => {
        let sortedData = [...this.state.tableData];
        let sortedBy = "";
        switch (col) {
            case "id":
                if (this.state.sortedBy !== "idAsc") {
                    sortedBy = "idAsc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseInt(a.id)) ? 0 : parseInt(a.id)) <
                        (isNaN(parseInt(b.id)) ? 0 : parseInt(b.id)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "idAsc")) {
                    sortedBy = "idDesc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseInt(a.id)) ? 0 : parseInt(a.id)) >
                        (isNaN(parseInt(b.id)) ? 0 : parseInt(b.id)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "idDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "engineType":
                if (this.state.sortedBy !== "engineTypeAsc") {
                    sortedBy = "engineTypeAsc"
                    sortedData.sort((a, b) => a.engineType < b.engineType ? -1 : 1)
                }
                if (this.state.sortedBy === "engineTypeAsc") {
                    sortedBy = "engineTypeDesc"
                    sortedData.sort((a, b) => a.engineType > b.engineType ? -1 : 1)
                }
                if ((this.state.sortedBy === "engineTypeDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "mark":
                if (this.state.sortedBy !== "markAsc") {
                    sortedBy = "markAsc"
                    sortedData.sort((a, b) => a.mark < b.mark ? -1 : 1)
                }
                if (this.state.sortedBy === "markAsc") {
                    sortedBy = "markDesc"
                    sortedData.sort((a, b) => a.mark > b.mark ? -1 : 1)
                }
                if ((this.state.sortedBy === "markDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "model":
                if (this.state.sortedBy !== "modelAsc") {
                    sortedBy = "modelAsc"
                    sortedData.sort((a, b) => a.model < b.model ? -1 : 1)
                }
                if ((this.state.sortedBy === "modelAsc")) {
                    sortedBy = "modelDesc"
                    sortedData.sort((a, b) => a.model > b.model ? -1 : 1)
                }
                if ((this.state.sortedBy === "modelDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "price":
                if (this.state.sortedBy !== "priceAsc") {
                    sortedBy = "priceAsc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseFloat(a.price)) ? 0 : parseFloat(a.price)) <
                        (isNaN(parseFloat(b.price)) ? 0 : parseFloat(b.price)) ? -1 : 1)
                }
                if (this.state.sortedBy === "priceAsc") {
                    sortedBy = "priceDesc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseFloat(a.price)) ? 0 : parseFloat(a.price)) >
                        (isNaN(parseFloat(b.price)) ? 0 : parseFloat(b.price)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "priceDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            default:
                break;
        }
    }


    renderCarsTableRows() {
        let sortedData = this.state.sortedData
        if (!sortedData) return null;
        let result = [];
        sortedData.forEach(car => {
            result.push(
                <tr key={car.id}>
                    <td>{car.id}</td>
                    <td>{car.engineType}</td>
                    <td>{car.mark}</td>
                    <td>{car.model}</td>
                    <td>{car.price}</td>
                </tr>
            )
        });
        return result;
    }

    async readCars() {
        let car_uri = '/cars';
        let carData = await API.get(car_uri);
        let tableData = []
        let j = carData.data.length
        for (let i = 0; i < j; i++) {
            let newCar = {
                id: `${carData.data[i].id} `,
                engineType: `${carData.data[i].engineType} `,
                mark: `${carData.data[i].mark} `,
                model: `${carData.data[i].model} `,
                price: `${carData.data[i].price}`
            }
            tableData.push(newCar)
        }
        let sortedData = tableData
        this.setState({tableData});
        this.setState({sortedData});
    }

    componentDidMount() {
        this.readCars().catch(function (error) {
            console.log(error);
        })
    }
}

export default GetCars
