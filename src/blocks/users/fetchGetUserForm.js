import React from "react";

export class FetchUsersUnsortedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        };
        this.renderTableRows = this.renderTableRows.bind(this)
        this.addPerson = this.addPerson.bind(this)
    }

    addPerson = async () => {
        this.state = {
            tableData: []
        };
        let URI = "http://77.50.236.203:4880/users"
        let response = (await fetch(URI, {
            method: "GET"
        }))
        let data = await response.json();
        let userData = {data}
        console.log(userData)
        let tableData = [...this.state.tableData]
        let j = userData.data.length
        for(let i=0; i<j; i++) {
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
        this.setState({tableData});
    }

    renderTableRows() {
        const {tableData} = this.state
        if (!tableData) return null;
        let result = [];
        tableData.forEach(person => {
            result.push(
                <tr key = {person.id}>
                    <td>{person.id}</td>
                    <td>{person.firstName}</td>
                    <td>{person.secondName}</td>
                    <td>{person.age}</td>
                    <td>{person.sex}</td>
                    <td>{person.money}</td>
                </tr>
            )
        });
        return result;
    }

    render() {
        return (
            <div>
                <hr/>
                <button className="tableButton" onClick={this.addPerson}><p>Read</p></button>
                <button className="tableButton" onClick={this.sortIdAsc}><p>ID ↑</p></button>
                <button className="tableButton" onClick={this.sortIdDesc}><p>ID ↓</p></button>
                <button className="tableButton" onClick={this.sortNameAsc}><p>First Name ↑</p></button>
                <button className="tableButton" onClick={this.sortNameDesc}><p>First Name ↓</p></button>
                <button className="tableButton" onClick={this.sortLastNameAsc}><p>Last Name ↑</p></button>
                <button className="tableButton" onClick={this.sortLastNameDesc}><p>Last Name ↓</p></button>
                <button className="tableButton" onClick={this.sortAgeAsc}><p>Age ↑</p></button>
                <button className="tableButton" onClick={this.sortAgeDesc}><p>Age ↓</p></button>
                <button className="tableButton" onClick={this.sortSexAsc}><p>Sex ↑</p></button>
                <button className="tableButton" onClick={this.sortSexDesc}><p>Sex ↓</p></button>
                <button className="tableButton" onClick={this.sortMoneyAsc}><p>Money ↑</p></button>
                <button className="tableButton" onClick={this.sortMoneyDesc}><p>Money ↓</p></button>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key = "head">
                        <th> ID:</th>
                        <th> First name:</th>
                        <th> Last name:</th>
                        <th> Age:</th>
                        <th> Sex:</th>
                        <th> Money:</th>
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

    sortNameAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.firstName < b.firstName ? -1 : 1)
        this.setState({tableData});
    }

    sortNameDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.firstName > b.firstName ? -1 : 1)
        this.setState({tableData});
    }

    sortLastNameAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.secondName < b.secondName ? -1 : 1)
        this.setState({tableData});
    }

    sortLastNameDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.secondName > b.secondName ? -1 : 1)
        this.setState({tableData});
    }

    sortAgeAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseInt(a.age) < parseInt(b.age) ? -1 : 1)
        this.setState({tableData});
    }

    sortAgeDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseInt(a.age) > parseInt(b.age) ? -1 : 1)
        this.setState({tableData});
    }

    sortSexAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.sex < b.sex ? -1 : 1)
        this.setState({tableData});
    }

    sortSexDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => a.sex > b.sex ? -1 : 1)
        this.setState({tableData});
    }

    sortMoneyAsc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseFloat(a.money) < parseFloat(b.money) ? -1 : 1)
        this.setState({tableData});
    }

    sortMoneyDesc = () => {
        const tableData = [
            ...this.state.tableData
        ]
        tableData.sort((a, b) => parseFloat(a.money) > parseFloat(b.money) ? -1 : 1)
        this.setState({tableData});
    }

}

export default FetchUsersUnsortedTable