import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/mira/theme.css";

const AdminPanelComponent = () => {
    const [carList, setCarList] = useState([]);
    const [rentList, setRentList] = useState([]);

    useEffect(() => {
        getAllData()
            .then((data) => {
                console.log("Data hämtad:", data);
            })
            .catch((error) => {
                console.error("Något gick fel:", error);
            });
        return () => {};
    }, []);

    const getAllData = async () => {
        const responseOfCar = await fetch("/cars");
        const responseDataOfCar = await responseOfCar.json();

        const responseOfRents = await fetch("/rents/all");
        const responseDataOfRents = await responseOfRents.json();

        const cars = responseDataOfCar.map((car) => ({
            id:     car.id,
            model:  car.model,
            price:  car.price + "Kr/day",
        }));

        const renters = responseDataOfRents.map((rent) => ({
            id:         rent.id,
            car:        responseDataOfCar.find(({ id }) => id === rent.carId).model,
            fromDate:   rent.fromDate,
            toDate:     rent.toDate,
            renterName: rent.renterName,
        }));

        setCarList(cars);
        setRentList(renters);
        return [responseDataOfCar, responseDataOfRents]

    }

    const footer = (
        <>
            <label htmlFor="footer">The site is made by Björn Bloomberg ggg</label>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Panel title="Admin Panel" footerTemplate={footer}>
                <DataTable value={carList} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="model" header="Model"></Column>
                    <Column field="price" header="Price"></Column>
                </DataTable>
                <DataTable value={rentList} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="car" header="Car"></Column>
                    <Column field="fromDate" header="From"></Column>
                    <Column field="toDate" header="To"></Column>
                    <Column field="renterName" header="Renter"></Column>
                </DataTable>
            </Panel>
        </div>
    );
};

export default AdminPanelComponent;
