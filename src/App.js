import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import React from "react"
import ReadCarsUnsortedTable from "./blocks/cars/readCarsUnsortedTable";
import ReadUsersUnsortedTable from "./blocks/users/readUsersUnsortedTable";
import CreateCarForm from "./blocks/cars/createCarForm";
import DeleteCarForm from "./blocks/cars/deleteCarForm";
import UpdateCarForm from "./blocks/cars/updateCarForm";
import CreateUserForm from "./blocks/users/createUserForm";


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <Link className="Nav-link" to="/">
                        <button className="Nav-btn">
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
                    <Link className="Nav-link" to="/delete/users">
                        <button className="Nav-btn" to="/delete/users">
                            <p>Удалить пользователя</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/update/users">
                        <button className="Nav-btn" to="/update/users">
                            <p>Изменить пользователя</p>
                        </button>
                    </Link>

                    <hr/>

                    <Link className="Nav-link" to="/authorization">
                        <button className="Nav-btn" to="/authorization">
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
                    <Link className="Nav-link" to="/delete/cars">
                        <button className="Nav-btn" to="/delete/cars">
                            <p>Удалить автомобиль</p>
                        </button>
                    </Link>
                    <Link className="Nav-link" to="/update/cars">
                        <button className="Nav-btn" to="/update/cars">
                            <p>Изменить автомобиль</p>
                        </button>
                    </Link>
                </header>
                <section className="workspace-up">
                    <Routes>
                        <Route path="/" element={<h1> home page </h1>}/>
                        <Route path="/authorization" element={<h1> authorization page </h1>}/>
                        <Route path="/read/cars" element={<ReadCarsUnsortedTable/>}/>
                        <Route path="/read/users" element={<ReadUsersUnsortedTable/>}/>
                        <Route path="/create/cars" element={<CreateCarForm/>}/>
                        <Route path="/create/users" element={<CreateUserForm/>}/>
                        <Route path="/delete/cars" element={<DeleteCarForm/>}/>
                        <Route path="/delete/users" element={<DeleteCarForm/>}/>
                        <Route path="/update/cars" element={<UpdateCarForm/>}/>
                        <Route path="/update/users" element={<UpdateCarForm/>}/>
                    </Routes>
                </section>
            </div>
        </BrowserRouter>
    );
}

export default App;
