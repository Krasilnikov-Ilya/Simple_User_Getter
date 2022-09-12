import React from "react";
import User from "./User";
import API from "./API";


export class GetUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userId: null,
            firstName: null,
            secondName: null,
            sex: null,
            age: null,
            money: null,
            time: Date.now(),
            num: props.num
        };
    }

    reload=async () => {
        let num = document.getElementById("user_input").value
        let user_uri = '/user/' + num;
        let userData = await API.get(user_uri);
        userData = userData.data;
        this.setState({
            ...this.state, ...{
                isLoading: false,
                userId: `${userData.id} `,
                firstName: `${userData.firstName} `,
                secondName: `${userData.secondName} `,
                sex: `${userData.sex}`,
                age: `${userData.age}`,
                money: `${userData.money}`
            }
        });
        console.log(userData);
    }

    render() {

        return (
            <div>
                <hr/>
                <p>
                    Set user ID to read user information from API
                </p>
                <input size="4" id="user_input"/>
                <button className="input-send" id="user_input_send"
                        onClick={this.reload}> GO
                </button>
                <hr/>
                <User id="user" isLoading={this.state.isLoading}
                      userId={this.state.userId}
                      firstName={this.state.firstName}
                      secondName={this.state.secondName}
                      sex={this.state.sex}
                      age={this.state.age}
                      money={this.state.money}/>
                <hr/>
            </div>
        );
    }

    async componentDidMount() {
        let num = this.props.num
        let user_uri = '/user/' + num;
        console.log(user_uri);
        let userData = await API.get(user_uri);
        userData = userData.data;
        console.log(userData);
        this.setState({
            ...this.state, ...{
                isLoading: false,
                userId: `${userData.id} `,
                firstName: `${userData.firstName} `,
                secondName: `${userData.secondName} `,
                sex: `${userData.sex}`,
                age: `${userData.age}`,
                money: `${userData.money}`
            }
        });
    }
}
export default GetUser