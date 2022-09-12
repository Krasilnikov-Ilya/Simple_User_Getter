import './App.css';
import GetUser from "./utils/getUser";
import React from "react"


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <GetUser num={1}/>
            </header>
        </div>
    );
}

export default App;
