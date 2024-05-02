import React, { useState, useEffect, useRef } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { Badge } from "primereact/badge";
import "./RentCar.css";
import "primereact/resources/themes/mira/theme.css";

const RentCarComponent = (props) => {
    const [rentingDates, setRentingDates] = React.useState(() => {
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + 86400000);
        return [startDate, endDate];
    });
    const [selectedCar, setSelectedCar] = React.useState([]);
    const [selectedRenter, setSelectedRenter] = React.useState([]);
    const [birthDate, setBirthDate] = React.useState(null);
    const [carList, setCarList] = React.useState([]);
    const [rentList, setRentList] = React.useState([]);
    const [totalRentCost, setTotalRentCost] = React.useState(0);
    const [errMsgIsVisible, setErrMsgIsVisible] = React.useState(false);
    const [errMessageText, setErrMessageText] = React.useState("");
    const messageToUser = useRef(null);
    let minDate = new Date();

    useEffect(() => {
        getCarData()
            .then((data) => {
                console.log("Data hämtad:", data);
            })
            .catch((error) => {
                console.error("Något gick fel:", error);
            });

        getRentData()
            .then((data) => {
                console.log("Data hämtad:", data);
            })
            .catch((error) => {
                console.error("Något gick fel:", error);
            });
        return () => {};
    }, []);

    useEffect(() => {
        if (
            selectedCar !== undefined &&
            rentingDates[0] !== undefined &&
            rentingDates[1] !== null
        ) {
            updateTotalCost();
        }
        return () => {};
    }, [selectedCar, rentingDates]);

    const getCarData = async () => {
        const response = await fetch("/cars");
        const responseData = await response.json();

        const cars = responseData.map((car) => ({
            name: car.model + " Price: " + car.price + " Kr",
            model: car.model,
            price: car.price,
            code: car.id,
        }));

        console.log(cars);

        setCarList(cars);
        return responseData;
    };

    const getRentData = async () => {
        const response = await fetch("/rents/all");
        const responseData = await response.json();

        if (responseData.length === 0) {
            console.log(responseData);
        }
        const renters = responseData.map((rent) => ({
            name: rent.renterName,
            code: rent.id,
        }));

        setRentList(renters);
        return responseData;
    };

    const rentCar = async () => {
        if (validateForm()) {
            var renter_name = "";
            if (selectedRenter.name === undefined) {
                renter_name = selectedRenter;
            } else {
                renter_name = selectedRenter.name;
            }
            const url =
                "/rent?car_id=" +
                selectedCar.code +
                "&from_date=" +
                rentingDates[0] +
                "&to_date=" +
                rentingDates[1] +
                "&renter_name=" +
                renter_name;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            await console.log("Answer: " + data);
            if (data === 1) {
                displayMessage("Success", "Your order has been successfully placed.");
            } else {
                displayMessage("Error", "We apologize, but your order could not be placed.");
            }
        } else {
            console.log("sdfsdfs");
        }
    };

    const checkAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        const ageDifference = today.getFullYear() - dob.getFullYear();

        if (ageDifference >= 18) {
            return true;
        } else {
            return false;
        }
    };

    const setInvalidOnElementWithId = (id) => {
        document.getElementById(id).classList.add("p-invalid");
    };

    const resetInvalidStatusOnAllElements = () => {
        const elements = document.querySelectorAll(".p-invalid");
        elements.forEach((element) => {
            element.classList.remove("p-invalid");
        });
    };

    const validateForm = () => {
        let validForm = true;
        resetInvalidStatusOnAllElements();
        if (!rentingDates[0] || !rentingDates[1]) {
            setErrMsgIsVisible(true);
            setErrMessageText("You most pic 2 dates");
            setInvalidOnElementWithId("rentingDatesCalendar");
            validForm = false;
        } else if (rentingDates[0].getTime() === rentingDates[1].getTime()) {
            setErrMsgIsVisible(true);
            setErrMessageText("Pick up date is not allowed to be the same as drop off date");
            setInvalidOnElementWithId("rentingDatesCalendar");
            validForm = false;
        } else if (!selectedCar.code) {
            setErrMsgIsVisible(true);
            setErrMessageText("You most pic a car");
            setInvalidOnElementWithId("carDropdown");
            validForm = false;
        } else if (typeof selectedRenter !== "string" && !selectedRenter.code) {
            setErrMsgIsVisible(true);
            setErrMessageText("You must enter your name s");
            setInvalidOnElementWithId("RenterNameDropdown");
            validForm = false;
        } else if (selectedRenter === "" && typeof selectedRenter === "string") {
            setErrMsgIsVisible(true);
            setErrMessageText("You must enter your name v");
            setInvalidOnElementWithId("RenterNameDropdown");
            validForm = false;
        } else if (!isNaN(selectedRenter)) {
            setErrMsgIsVisible(true);
            setErrMessageText("Please enter a valid name with no numbers in it");
            setInvalidOnElementWithId("RenterNameDropdown");
            validForm = false;
        } else if (!checkAge(birthDate)) {
            setErrMsgIsVisible(true);
            setErrMessageText("You must be 18 or older");
            setInvalidOnElementWithId("BirthDateCalendar");
            validForm = false;
        } else {
            setErrMsgIsVisible(false);
            resetInvalidStatusOnAllElements();
        }
        return validForm;
    };

    const getNumberOfDaysToRent = () => {
        const timeDifference = rentingDates[1] - rentingDates[0];
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));

        return isNaN(daysDifference) || daysDifference < 0 ? 0 : daysDifference;
    };

    const updateTotalCost = () => {
        setTotalRentCost(
            isNaN(selectedCar.price * getNumberOfDaysToRent())
                ? 0
                : selectedCar.price * getNumberOfDaysToRent()
        );
    };

    const displayMessage = (type, message) => {
        if (type === "Success") {
            messageToUser.current.show({
                severity: "success",
                summary: "Success",
                detail: message,
            });
        } else if (type === "Error") {
            messageToUser.current.show({ severity: "error", summary: "Error", detail: message, sticky: true });
        } else {
            messageToUser.current.show({ severity: "info", summary: "Info", detail: message,  sticky: true });
        }
    };

    const footer = (
        <>
            <div>
                <Button
                    label="Rent Car"
                    onClick={rentCar}
                    icon="pi pi-car"
                    className="p-button-raised"
                >
                    <Badge value={`Total: ${totalRentCost} Kr`} severity="success" />
                </Button>
            </div>
        </>
    );

    return (
        <div className="center-content" id="rentalContainer">
            <div className="card justify-content-center W-60p">
                <Toast ref={messageToUser} position="bottom-right" />
                <Card title="Rent a Car" footer={footer}>
                    <p className="m-0">
                        To rent a car, you must select a renter's name from the list or add a new
                        one. Then, choose the car you like and specify the rental duration
                    </p>
                    <div className="spacers">
                        <FloatLabel>
                            <Dropdown
                                value={selectedRenter}
                                placeholder="Select a Renter"
                                onChange={(e) => setSelectedRenter(e.value)}
                                optionLabel="name"
                                options={rentList}
                                className="w-full md:w-14rem"
                                editable
                                inputId="Renter-Label"
                                id="RenterNameDropdown"
                            />
                            <label htmlFor="Renter-Label">Your Name</label>
                        </FloatLabel>
                    </div>
                    <div className="spacers">
                        <FloatLabel>
                            <Calendar
                                inputId="birthDate"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.value)}
                                id="BirthDateCalendar"
                            />
                            <label htmlFor="birthDate">Birth Date</label>
                        </FloatLabel>
                    </div>
                    <div className="spacers">
                        <FloatLabel>
                            <Dropdown
                                value={selectedCar}
                                inputId="CarLabel"
                                onChange={(e) => setSelectedCar(e.value)}
                                optionLabel="name"
                                options={carList}
                                className="w-full md:w-14rem"
                                checkmark={true}
                                filter
                                id="carDropdown"
                                data-testid="carDropdown"
                            />
                            <label htmlFor="CarLabel">Car</label>
                        </FloatLabel>
                    </div>
                    <div className="spacers">
                        <FloatLabel>
                            <Calendar
                                value={rentingDates}
                                inputId="DateLabel"
                                onChange={(e) => {
                                    setRentingDates(e.value);
                                }}
                                minDate={minDate}
                                selectionMode="range"
                                id="rentingDatesCalendar"
                            />
                            <label htmlFor="DateLabel">Rental duration</label>
                        </FloatLabel>
                    </div>
                    <div data-testid="status">
                    {errMsgIsVisible && (
                        <Message severity="error" text={errMessageText} id="errMsg" />
                    )}
                    </div>
                    <Panel header="Cost Summary" className="cost-summary-panel spacers">
                        <div className="p-grid p-justify-between">
                            <div className="p-col">
                                <label htmlFor="CarModelName">Car to rent:</label>
                                <span id="CarModelName">
                                    {selectedCar.model ? selectedCar.model : ""}
                                </span>
                            </div>
                            <div className="p-col">
                                <label htmlFor="dailyCost">Daily Cost:</label>
                                <span id="dailyCost">
                                    {selectedCar.price ? selectedCar.price + "Kr" : "0Kr"}
                                </span>
                            </div>
                            <div className="p-col">
                                <label htmlFor="totalRentingDays">Days to rent:</label>
                                <span id="totalRentingDays">{getNumberOfDaysToRent()} Days</span>
                            </div>
                            <div className="p-col">
                                <label htmlFor="totalCost">Total Cost:</label>
                                <span id="totalCost">{totalRentCost}Kr</span>
                            </div>
                        </div>
                    </Panel>
                </Card>
            </div>
        </div>
    );
};

export default RentCarComponent;
