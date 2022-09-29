import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Routes, Route, HashRouter} from "react-router-dom"
import AuthorizationForm from "./boostrapBlocks/authorization/authorizationForm";
import GetCars from "./boostrapBlocks/cars/getCars";
import PostCar from "./boostrapBlocks/cars/postCar";
import PostUserMoney from "./boostrapBlocks/users/postUserMoney";
import PostUserCar from "./boostrapBlocks/crossover/postUserCar";
import PostUserHouse from "./boostrapBlocks/crossover/postUserHouse";
import GetHouses from "./boostrapBlocks/houses/getHouses";
import GetHouse from "./boostrapBlocks/houses/getHouse";
import PostHouse from "./boostrapBlocks/houses/postHouse";
import AllPostBlock from "./boostrapBlocks/crossover/allPostBlock";
import {AxiosForm} from "./utils/axiosForm";
import GetUsers from "./boostrapBlocks/users/getUsers";
import PostUser from "./boostrapBlocks/users/postUser";
import "./logo192.png"

/**
 * Одностраничное приложение react-bootstrap, рендерится в папку /build в виде статического сайта
 * для дальнейшего хостинга на сервере.
 * Папка /rendered предназначена для копирования и хранения на репозитории
 * рабочей версии статического сайта.
 *
 * Все связанные с хостингом статического сайта файлы, скрипты и инструкции находятся в папке /server
 *
 * Для запуска рендеринга в статический сайт необходимо вызвать скрипт "build" из package.json
 * Для проверки работоспособности тестами необходимо вызвать скрипт "test" из package.json
 * Для временного развёртывания на localhost с целью проверки вручную
 * или редактирования кода с одновременным отображением результатов в браузере
 * необходимо вызвать скрипт "build" из package.json
 *
 * Приложение использует хэш-роутинг для отображения контента в зависимости от используемой ссылки.
 * Все кнопки навигации расположены в хэдере и не подвержены изменению хэш-роутером.
 * Все блоки форм и отправки запросов заключены в отображаемые в зависимости от ссылки
 * react-компоненты, расположенные под хэдером.
 *
 * Футер в приложении отсутствует, а длина поля под хэдером меняется динамически, что позволяет
 * прокручивать страницу в случае вывода большого количества информации.
 *
 * Все CSS стили описаны напрямую в элементах.
 *
 * @returns {JSX.Element}
 */

function App() {
  return (
      <HashRouter>
        <div className="App">
          <Navbar className="App-header" style={{padding: "2%"}} bg="light" expand="sm">
            <Navbar.Brand href="#">&nbsp;&nbsp;&nbsp;<img
                src="logo192.png"
                width={"32"}
                height={"32"}
                className="d-inline-block align-top"
                alt=""
            />&nbsp;&nbsp;PFLB&nbsp;Test-API</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Users" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/read/users">Read all</NavDropdown.Item>
                  <NavDropdown.Item href="#/create/user">Create new</NavDropdown.Item>
                  <NavDropdown.Item href="#/update/users/plusMoney">Add money</NavDropdown.Item>
                  <NavDropdown.Item href="#/update/users/buyCar">Buy a car</NavDropdown.Item>
                  <NavDropdown.Item href="#/update/houseAndUser">Settle to house</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Cars" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/read/cars">Read all</NavDropdown.Item>
                  <NavDropdown.Item href="#/create/cars">Create new</NavDropdown.Item>
                  <NavDropdown.Item href="#/update/users/buyCar">Buy for user</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Houses" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#/read/houses">Read all</NavDropdown.Item>
                  <NavDropdown.Item href="#/create/house">Create new</NavDropdown.Item>
                  <NavDropdown.Item href="#/update/houseAndUser">Settle user</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#/create/all">All POST</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <section className="workspace" style={{textAlign: "center", margin: "2%"}}>
            <Routes>
              <Route path="/" element={<AuthorizationForm/>}/>

              <Route path="/read/users" element={<GetUsers/>}/>
              <Route path="/create/user" element={<PostUser/>}/>

              <Route path="/create/cars" element={<PostCar/>}/>
              <Route path="/read/cars" element={<GetCars/>}/>

              <Route path="/read/houses" element={<GetHouses/>}/>
              <Route path="/read/house" element={<GetHouse/>}/>
              <Route path="/create/house" element={<PostHouse/>}/>

              <Route path="/create/all" element={<AllPostBlock/>}/>

              <Route path="/update/users/plusMoney" element={<PostUserMoney/>}/>
              <Route path="/update/users/buyCar" element={<PostUserCar/>}/>
              <Route path="/update/houseAndUser" element={<PostUserHouse/>}/>

              <Route path="/reqres" element={<AxiosForm/>}/>
            </Routes>
          </section>
        </div>
      </HashRouter>
  );
}

export default App;

