import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";

export default function DatePiker(props) {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        if (dates[1] !== null) {
            console.log("date: " + dates );
            //props.getDate(dates);
        }
    });

    return (
        <div className="card flex justify-content-center">
            <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                hideOnRangeSelection
            />
        </div>
    );
}
