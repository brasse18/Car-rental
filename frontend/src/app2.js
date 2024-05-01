import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Component} from "react";

class App extends Component {

    state = {
        selectedCar: 0,
        from_date: "",
        to_date: "",
        message:
            "If spring backend is running and database is running, then this message should be replaced!",
    };
    async componentDidMount() {
        console.log("App is mounted");
    }

    render() {
        return (
            <div className="App">
                <p>sdfsdf</p>
            </div>
        );
    }
}

export default App;