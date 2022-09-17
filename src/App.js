import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import React from "react"
import ReadCarsUnsortedTable from "./blocks/cars/readCarsUnsortedTable";
import ReadUsersUnsortedTable from "./blocks/users/readUsersUnsortedTable";
import CreateCarForm from "./blocks/cars/createCarForm";
import CreateUserForm from "./blocks/users/createUserForm";
import ReadHousesUnsortedTable from "./blocks/houses/readHousesUnsortedTable";
import ReadHouseTable from "./blocks/houses/readHouseTable";
import PlusUserMoneyForm from "./blocks/users/plusUserMoneyForm";
import BuyCarForm from "./blocks/users/buyCarForm";
import SettleUserToHomeForm from "./blocks/houses/settleUserToHomeForm";
import CreateHouseForm from "./blocks/houses/createHouseform";
import AuthorizationForm from "./blocks/authorization/authorizationForm";
import AllPostBlock from "./blocks/multiComponentBlocks/allPostBlock";
import {AxiosForm} from "./utils/axiosForm";



function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <Link className="Nav-link" to="/">
                        <button className="Home-auth-btn">
                            <p>Домой</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/read/users">
                        <button className="Nav-btn" to="/read/users">
                            <p>Посмотреть пользователей</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/create/users">
                        <button className="Nav-btn" to="/create/users">
                            <p>Добавить пользователя</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/update/users/plusMoney">
                        <button className="Nav-btn" to="/update/users/plusMoney">
                            <p>Добавить пользователю денег</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/update/users/buyCar">
                        <button className="Nav-btn" to="/update/users/buyCar">
                            <p>Купить пользователю машину</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/create/all">
                        <button className="All-push-btn" to="/create/all">
                            <p>ALL POST</p>
                        </button>
                    </Link>


                    <hr/>

                    <Link className="Nav-link" to="/authorization">
                        <button className="Home-auth-btn" to="/authorization">
                            <p>Авторизация</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/read/cars">
                        <button className="Nav-btn" to="/read/cars">
                            <p>Посмотреть автомобили</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/create/cars">
                        <button className="Nav-btn" to="/create/cars">
                            <p>Добавить автомобиль</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/read/houses">
                        <button className="Nav-btn" to="/read/houses">
                            <p>Посмотреть дома</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/read/house">
                        <button className="Nav-btn" to="/read/house">
                            <p>Посмотреть дом</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/create/house">
                        <button className="Nav-btn" to="/create/house">
                            <p>Добавить дом</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/update/houseAndUser">
                        <button className="Nav-btn" to="/update/houseAndUser">
                            <p>Поселить пользователя</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/reqres">
                        <button className="All-push-btn" to="/reqres">
                            <p>ReqRes.in</p>
                        </button>
                    </Link>
                </header>
                <section className="workspace-up">
                    <Routes>
                        <Route path="/" element={<h1> home page </h1>}/>
                        <Route path="/authorization" element={<AuthorizationForm/>}/>
                        <Route path="/read/cars" element={<ReadCarsUnsortedTable/>}/>
                        <Route path="/read/users" element={<ReadUsersUnsortedTable/>}/>
                        <Route path="/create/cars" element={<CreateCarForm/>}/>
                        <Route path="/create/users" element={<CreateUserForm/>}/>

                        <Route path="/update/users/plusMoney" element={<PlusUserMoneyForm/>}/>
                        <Route path="/update/users/buyCar" element={<BuyCarForm/>}/>
                        <Route path="/update/houseAndUser" element={<SettleUserToHomeForm/>}/>

                        <Route path="/read/houses" element={<ReadHousesUnsortedTable/>}/>
                        <Route path="/read/house" element={<ReadHouseTable/>}/>
                        <Route path="/create/house" element={<CreateHouseForm/>}/>

                        <Route path="/create/all" element={<AllPostBlock/>}/>
                        <Route path="/reqres" element={<AxiosForm/>}/>

                    </Routes>
                </section>
            </div>
        </BrowserRouter>
    );
}

export default App;
