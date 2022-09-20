import React from "react";

class AuthorizationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailDirty: false,
            passwordDirty: false,
            emailError: "Email cannot be empty",
            passwordError: "Password cannot be empty",
        };
    }

    render() {
        const blurHandler = (e) => {
            switch (e.target.name) {
                case 'email':
                    let emailDirty = true
                    this.setState({emailDirty})
                    break
                case 'password':
                    let passwordDirty = true
                    this.setState({passwordDirty})
                    break
                default: console.log("invalid target at blurHandler")
            }
        }

        const emailHandler = (e) => {
            let email = e.target.value
            this.setState({email})
            const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9][a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            if (re.test(String(email).toLowerCase())) {
                let emailError = ""
                this.setState({emailError})
            } else {
                let emailError = "Incorrect Email"
                this.setState({emailError})
            }
        }

        const passwordHandler = (e) => {
            let password = e.target.value
            this.setState({password})
            if (e.target.value.length < 3 || e.target.value.length > 8) {
                let passwordError = "Password length must be more than 3 symbols and less than 8 symbols"
                this.setState({passwordError})
            } else {
                let passwordError = ""
                this.setState({passwordError})
            }
        }

        const submit = () => {
            if (this.state.passwordError === "" && this.state.emailError === "") {
                console.log(this.state.passwordError);
                console.log(this.state.emailError)
            } else {
                alert("Incorrect input data")
            }
        }

        return (
            <div>
                <form>
                    <hr/>
                    <h1> AUTHORIZATION </h1>
                    <hr/>
                    {(this.state.emailDirty && this.state.emailError) &&
                        <div style={{color: "red"}}> {this.state.emailError} </div>}
                    <input onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} name='email'
                           type="email"
                           placeholder="Enter your email..."/>
                    <hr/>
                    {(this.state.passwordDirty && this.state.passwordError) &&
                        <div style={{color: "red"}}> {this.state.passwordError} </div>}
                    <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)}
                           name='password'
                           type="text"
                           placeholder="Enter your password..."/>
                    <hr/>
                    <button type='submit' onClick={submit} className="Nav-btn"> GO</button>
                    <hr/>
                </form>
            </div>
        );
    }
}

export default AuthorizationForm