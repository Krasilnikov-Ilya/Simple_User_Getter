import React from "react";

/**
 * React-компонент - форма авторизации, предназначеная для проверки вводимых пользователем данных в реальном времени,
 * проверки данных перед отправкой, а так же для отправки только валидных данных.
 *
 * Критерий валидности email: есть буква или цифра перед @, есть '@', есть буква после @, за ней следуют точка и минимум две буквы или цифры.
 * Критерий валидности пароля: длина больше трёх и меньше восьми.
 *
 * Компонент обладает состояниями, назначенными и описанными в конструкторе.
 * Для создания и отображения формы используется метод return() в методе render()
 *
 * Сразу после загрузки страницы ошибки не выводятся, т.к. состяния  emailDirty: и passwordDirty:
 * содержат false и блокируют вывод сообщений до попытки пользователем ввести данные.
 *
 * После попытки пользователем ввести данные, соответствующее состояние меняется на true функцией blurHandler и возможен вывод ошибки.
 * В случае, если данные не отсутствуют (поле не пустое), но они не валидны, текст ошибки меняется на сообщение о невалидности.
 * Для проверки email на валидность реализована функция emailHandler.
 * Для проверки пароля на валидность реализована функция passwordHandler.
 * В случае, если данные валидны, текст ошибки обнуляется, что позволяет прервать вывод сообщения даже при  emailDirty: true или passwordDirty: true.
 *
 * Для проверки общей валидности данных и их отправки данных реализована функция submit, вызываемая кнопкой.
 * В случае, если хотя бы одно поле не заполнено валидными данными, будет выведено всплывающее окно с сообщением об ошибке.
 */

class AuthorizationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', // введённый email, считывается в реальном времени.
            password: '', // введённый пароль, считывается в реальном времени.
            emailDirty: false, // была ли попытка ввести email
            passwordDirty: false, // была ли попытка ввести пароль
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