import React from "react";
import { Calendar } from "primereact/calendar";

class DateSelectorComponent extends React.Component {
    state = {
        selectedDate: [],
    };

    sendDateBack(date) {
        console.log("date: " + date[0] + " - " + date[1]);
        this.props.getDate(date[0]);
    }

    render() {
        return (
            <div>
                <div className="card flex justify-content-center">
                    <Calendar
                        value={this.state.selectedDate}
                        onChange={(e) => this.sendDateBack(e.value, e)}
                        selectionMode="range"
                        readOnlyInput
                        hideOnRangeSelection
                    />
                </div>
            </div>
        );
    }
}

export default DateSelectorComponent;
