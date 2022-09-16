import React, {useState} from "react";
import {EMAIL_REGEXP_RAW} from "../../utils/constants";

const AuthorizationForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [emailError, setEmailError] = useState("Email cannot be empty")
    const [passwordError, setPasswordError] = useState("Password cannot be empty")


    const blurHandler = (e) => {
        switch (e.target.name) {
            default: break
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = {EMAIL_REGEXP_RAW}
        if(re.test(String(email).toLowerCase())) {
            setEmailError("Incorrect Email")
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 3 || e.target.value.length > 8) {
            setPasswordError("Password length must be more than 3 symbols and less than 8 symbols")
        } else {
            setPasswordError("")
        }
    }

    return (
        <div>
            <form>
                <hr/>
                <h1> AUTHORIZATION </h1>
                <hr/>
                {(emailDirty && emailError) && <div style={{color: "red"}}> {emailError} </div>}
                <input onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type="email"
                       placeholder="Enter your email..."/>
                <hr/>
                {(passwordDirty && passwordError) && <div style={{color: "red"}}> {passwordError} </div>}
                <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type="text"
                       placeholder="Enter your password..."/>
                <hr/>
                <button type='submit' className="Nav-btn"> GO</button>
                <hr/>
            </form>
        </div>
    );


}

export default AuthorizationForm