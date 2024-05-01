import "./App.css";
import "primereact/resources/themes/mira/theme.css";
import 'primeicons/primeicons.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RentCarComponent from "./component/RentCar";
import AdminPanelComponent from "./component/AdminPanel";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<RentCarComponent />} />
                    <Route path="/rent" element={<RentCarComponent />} />
					<Route path="/admin" element={<AdminPanelComponent />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
