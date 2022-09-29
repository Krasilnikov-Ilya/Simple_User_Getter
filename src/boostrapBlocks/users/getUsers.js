import React from "react";
import {Button, ButtonGroup, Table} from "react-bootstrap";
import API from "../../utils/API";

/**
 * React-компонент, отвечающий за создание и отправку GET запроса,
 * позволяющего получить из БД новый всех существующих пользователей,
 * а так же отсортировать их по любому существующему полю в прямом и обратном порядке.
 *
 * Для отправки запроса использует библиотеку axios и асинхронную функцию addPerson,
 * вызываемую кнопкой Read.
 *
 * Для создания и отображения таблицы использует метод render(), который вызывает метод
 * renderTableRows() для создания и отображения содержимого таблицы.
 *
 * При создании обладает пустым массивом tableData, предназначенным для метод renderTableRows().
 * Рендеринг работает в реальном времени, но т.к. данные в tableData отсутствуют,
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

export class GetUsers extends React.Component {

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
                    <Button variant="primary" onClick={this.readUsers.bind(this)}>Reload</Button>
                    <Button variant="secondary" disabled>Sort&nbsp;by:</Button>
                    <Button variant="secondary" style={{minWidth: "10%"}} onClick={() => this.sortUsers('id')}>
                        {(this.state.sortedBy === "idAsc") ? "↑" : ""}{(this.state.sortedBy === "idDesc") ? "↓" : ""}&nbsp;ID&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortUsers('firstName')}>
                        {(this.state.sortedBy === "firstNameAsc") ? "↑" : ""}{(this.state.sortedBy === "firstNameDesc") ? "↓" : ""}&nbsp;First&nbsp;Name&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortUsers('secondName')}>
                        {(this.state.sortedBy === "lastNameAsc") ? "↑" : ""}{(this.state.sortedBy === "lastNameDesc") ? "↓" : ""}&nbsp;Last&nbsp;Name&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortUsers('age')}>
                        {(this.state.sortedBy === "ageAsc") ? "↑" : ""}{(this.state.sortedBy === "ageDesc") ? "↓" : ""}&nbsp;Age&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortUsers('sex')}>
                        {(this.state.sortedBy === "sexAsc") ? "↑" : ""}{(this.state.sortedBy === "sexDesc") ? "↓" : ""}&nbsp;Sex&nbsp;
                    </Button>
                    <Button variant="secondary" onClick={() => this.sortUsers('money')}>
                        {(this.state.sortedBy === "moneyAsc") ? "↑" : ""}{(this.state.sortedBy === "moneyDesc") ? "↓" : ""}&nbsp;Money&nbsp;
                    </Button>
                </ButtonGroup>
                <hr/>
                <Table striped bordered hover>
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
                    {this.renderUsersTableRows()}
                    </tbody>
                </Table>
            </div>
        )
    }

    sortUsers = (col) => {
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
            case "firstName":
                if (this.state.sortedBy !== "firstNameAsc") {
                    sortedBy = "firstNameAsc"
                    sortedData.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
                }
                if (this.state.sortedBy === "firstNameAsc") {
                    sortedBy = "firstNameDesc"
                    sortedData.sort((a, b) => a.firstName > b.firstName ? -1 : 1)
                }
                if ((this.state.sortedBy === "firstNameDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "secondName":
                if (this.state.sortedBy !== "lastNameAsc") {
                    sortedBy = "lastNameAsc"
                    sortedData.sort((a, b) => a.secondName < b.secondName ? -1 : 1)
                }
                if (this.state.sortedBy === "lastNameAsc") {
                    sortedBy = "lastNameDesc"
                    sortedData.sort((a, b) => a.secondName > b.secondName ? -1 : 1)
                }
                if ((this.state.sortedBy === "lastNameDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "age":
                if (this.state.sortedBy !== "ageAsc") {
                    sortedBy = "ageAsc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseInt(a.age)) ? 0 : parseInt(a.age)) <
                        (isNaN(parseInt(b.age)) ? 0 : parseInt(b.age)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "ageAsc")) {
                    sortedBy = "ageDesc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseInt(a.age)) ? 0 : parseInt(a.age)) >
                        (isNaN(parseInt(b.age)) ? 0 : parseInt(b.age)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "ageDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "sex":
                if (this.state.sortedBy !== "sexAsc") {
                    sortedBy = "sexAsc"
                    sortedData.sort((a, b) => a.sex < b.sex ? -1 : 1)
                }
                if (this.state.sortedBy === "sexAsc") {
                    sortedBy = "sexDesc"
                    sortedData.sort((a, b) => a.sex > b.sex ? -1 : 1)
                }
                if ((this.state.sortedBy === "sexDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            case "money":
                if (this.state.sortedBy !== "moneyAsc") {
                    sortedBy = "moneyAsc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseFloat(a.money)) ? 0 : parseFloat(a.money)) <
                        (isNaN(parseFloat(b.money)) ? 0 : parseFloat(b.money)) ? -1 : 1)
                }
                if (this.state.sortedBy === "moneyAsc") {
                    sortedBy = "moneyDesc"
                    sortedData.sort((a, b) =>
                        (isNaN(parseFloat(a.money)) ? 0 : parseFloat(a.money)) >
                        (isNaN(parseFloat(b.money)) ? 0 : parseFloat(b.money)) ? -1 : 1)
                }
                if ((this.state.sortedBy === "moneyDesc")) {
                    sortedBy = ""
                    sortedData = this.state.tableData
                }
                this.setState({sortedData, sortedBy});
                break;
            default:
                break;
        }

    }

    renderUsersTableRows() {
        const {sortedData} = this.state
        if (!sortedData) return null;
        let result = [];
        sortedData.forEach(user => {
            result.push(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.secondName}</td>
                    <td>{user.age}</td>
                    <td>{user.sex}</td>
                    <td>{user.money}</td>
                </tr>
            )
        });
        return result;
    }

    async readUsers() {
        let user_uri = '/users';
        let userData = await API.get(user_uri);
        console.log(userData)
        let tableData = []
        let j = userData.data.length
        for (let i = 0; i < j; i++) {
            let newPerson = {
                id: `${userData.data[i].id} `,
                firstName: `${userData.data[i].firstName} `,
                secondName: `${userData.data[i].secondName} `,
                age: `${userData.data[i].age}`,
                sex: `${userData.data[i].sex}`,
                money: `${userData.data[i].money}`
            }
            tableData.push(newPerson)
        }
        let sortedData = tableData
        this.setState({tableData});
        this.setState({sortedData});
    }

    componentDidMount() {
        this.readUsers().catch(function (error) {
            console.log(error);
        })
    }
}

export default GetUsers
