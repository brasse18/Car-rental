import React from "react";
import { Dropdown } from "primereact/dropdown";

class CarSelectorComponent extends React.Component {
  state = {
    selectedCarName:
        "välj bil",
    selectedCarId:
        0,
};

    sendDataToParent(data) {
      this.setState({ selectedCarName: data.name });
        this.props.onDataReceived(data.code);
    };

    render() {
        return (
            <div>
                <div className="card flex justify-content-center">
                    <Dropdown
                        value={this.state.selectedCarId}
                        placeholder={this.state.selectedCarName}
                        onChange={(e) => this.sendDataToParent(e.value, e)}
                        optionLabel="name"
                        options={this.props.arr}
                        className="w-full md:w-14rem"
                    />
                </div>
            </div>
        );
    }
}

export default CarSelectorComponent;
