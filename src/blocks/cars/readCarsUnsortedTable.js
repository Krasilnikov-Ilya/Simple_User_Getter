import React from "react";
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

export class ReadCarsUnsortedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        };
        this.renderTableRows = this.renderTableRows.bind(this)
        this.addCar = this.addCar.bind(this)
    }

    addCar = async () => {
        this.state = {
            tableData: []
        };
        let car_uri = '/cars';
        let carData = await API.get(car_uri);
        let tableData = [...this.state.tableData]
        let j = carData.data.length
        for(let i=0; i<j; i++) {
            let newCar = {
                id: `${carData.data[i].id} `,
                engineType: `${carData.data[i].engineType} `,
                mark: `${carData.data[i].mark} `,
                model: `${carData.data[i].model}`,
                price: `${carData.data[i].price}`
            }
            tableData.push(newCar)
        }
        this.setState({tableData});
    }

    renderTableRows() {
        const {tableData} = this.state
        if (!tableData) return null;
        let result = [];
        tableData.forEach(car => {
            result.push(
                <tr key = {car.id}>
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

    render() {
        return (
            <div>
                <hr/>
                <button className="tableButton" onClick={this.addCar}><p>Read</p></button>
                <button className="tableButton" onClick={this.sortIdAsc}><p>ID ↑</p></button>
                <button className="tableButton" onClick={this.sortIdDesc}><p>ID ↓</p></button>
                <button className="tableButton" onClick={this.sortTypeAsc}><p>Engine Type ↑</p></button>
                <button className="tableButton" onClick={this.sortTypeDesc}><p>Engine Type ↓</p></button>
                <button className="tableButton" onClick={this.sortMarkAsc}><p>Mark ↑</p></button>
                <button className="tableButton" onClick={this.sortMarkDesc}><p>Mark ↓</p></button>
                <button className="tableButton" onClick={this.sortModelAsc}><p>Model ↑</p></button>
                <button className="tableButton" onClick={this.sortModelDesc}><p>Model ↓</p></button>
                <button className="tableButton" onClick={this.sortPriceAsc}><p>Price ↑</p></button>
                <button className="tableButton" onClick={this.sortPriceDesc}><p>Price ↓</p></button>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key = "head">
                        <th> ID:</th>
                        <th> Engine Type:</th>
                        <th> Mark:</th>
                        <th> Model:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    sortIdAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseInt(a.id) < parseInt(b.id) ? -1 : 1)
        this.setState({tableData});
    }

    sortIdDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? -1 : 1)
        this.setState({tableData});
    }

    sortTypeAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.engineType < b.engineType ? -1 : 1)
        this.setState({tableData});
    }

    sortTypeDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.engineType > b.engineType  ? -1 : 1)
        this.setState({tableData});
    }

    sortMarkAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.mark < b.mark ? -1 : 1)
        this.setState({tableData});
    }

    sortMarkDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.mark > b.mark ? -1 : 1)
        this.setState({tableData});
    }


    sortModelAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.model < b.model ? -1 : 1)
        this.setState({tableData});
    }

    sortModelDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.model > b.model ? -1 : 1)
        this.setState({tableData});
    }

    sortPriceAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseFloat(a.price) < parseFloat(b.price) ? -1 : 1)
        this.setState({tableData});
    }

    sortPriceDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseFloat(a.price) > parseFloat(b.price) ? -1 : 1)
        this.setState({tableData});
    }

}

export default ReadCarsUnsortedTable