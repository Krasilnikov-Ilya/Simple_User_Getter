import React from "react";
import API from "../../utils/API";
import {FLOAT_REGEXP, FLOAT_STEP} from "../../utils/constants";
import {Button, ButtonGroup, Table} from "react-bootstrap";

/**
 * React-компонент, отвечающий за создание и отправку POST запроса,
 * позволяющего создать в БД новый автомобиль посредством API
 *
 * Для создания и отображения формы ввода использует метод render()
 * Для отправки запроса использует библиотеку axios и асинхронную функцию pushCarToAPI,
 * вызываемую кнопкой отправки данных.
 * В случае, если данные корректны, функция собирает данные из полей формы,
 * формирует из них json-файл и встраивает как тело запроса axios.
 */

export class PostCar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: "not pushed",
            newCarId: null,
            engineTypeInput: "",
            markInput: "",
            modelInput: "",
            priceInput: null
        };
    }


    render() {
        const carEngineTypeHandler = (e) => {
            let engineTypeInput = e.target.value
            this.setState({engineTypeInput})
        }
        const carMarkHandler = (e) => {
            let  markInput = e.target.value
            this.setState({markInput})
        }
        const carModelHandler = (e) => {
            let modelInput = e.target.value
            this.setState({modelInput})
        }
        const carPriceHandler = (e) => {
            let priceInput = parseFloat(e.target.value)
            this.setState({priceInput})
        }
        return (
            <div>
                <hr/>
                <Table striped bordered hover className="table">
                    <thead>
                    <tr key="head">
                        <th> Car&nbsp;ID:</th>
                        <th> Engine&nbsp;Type:</th>
                        <th> Mark:</th>
                        <th> Model:</th>
                        <th> Price:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key="car">
                        <td>ID will be generated</td>
                        <td><input onChange={e => carEngineTypeHandler(e)} id="car_engine_type_send"/></td>
                        <td><input onChange={e => carMarkHandler(e)} id="car_mark_send"/></td>
                        <td><input onChange={e => carModelHandler(e)} id="car_model_send"/></td>
                        <td><input onChange={e => carPriceHandler(e)} type="number" pattern={FLOAT_REGEXP} step={FLOAT_STEP} id="car_price_send"/></td>
                    </tr>
                    </tbody>
                </Table>
                <ButtonGroup>
                    <Button className="tableButton" onClick={this.createCar}
                            variant="primary">--&nbsp;PUSH&nbsp;TO&nbsp;API&nbsp;--</Button>
                    <Button className="status" disabled
                            variant="secondary">{"Status: " + this.state.answer}</Button>
                    <Button className="newId" disabled
                            variant="secondary">{this.state.newCarId}</Button>
                </ButtonGroup>
                <hr/>
            </div>
        );
    }

    createCar = async () => {
        let json =
            {
                "engineType": this.state.engineTypeInput, "mark": this.state.markInput, "model": this.state.modelInput, "price": this.state.priceInput
            }
        let push_uri = '/addCar'
        let answer = " "
        let newCarId = null
        if (json.engineType === "" || json.mark === "" || json.model === "" || json.price == null || isNaN(json.price) || json.price < 0) {
            answer = "Invalid request data"
            newCarId = null
            this.setState({answer})
            this.setState({newCarId})
            console.log(json)
        } else {
            await API.post(
                push_uri, json)
                .then(function (response) {
                    answer = "Successfully pushed, code: " + response.status
                    console.log(response);
                    newCarId = "New car ID: " + response.data.id
                })
                .catch(function (error) {
                    answer = error.toString()
                    console.log(error);
                });
        }
        this.setState({newCarId})
        this.setState({answer})
    }
}

export default PostCar
