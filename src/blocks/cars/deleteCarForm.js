import React from "react";
import API from "../../utils/API";



export class DeleteCarForm extends React.Component {


    render() {
        return (
            <div>
                <hr/>
                <table className="table">
                    <thead>
                    <tr key="head">
                        <th> Only ID deletion is allowed </th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td><input id="car_id_deletion_send"/></td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <button className="tableButton" onClick={this.pushCarToAPI}><p>-- PUSH TO API --</p></button>
                <hr/>
            </div>
        );
    }

    pushCarToAPI = async () => {
        let deleteId = parseInt(document.getElementById("car_id_deletion_send").value)
        let json =
            {
                "id": deleteId
            }

        let push_uri = '/addCar'

        await API.post(
            push_uri, json)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default DeleteCarForm