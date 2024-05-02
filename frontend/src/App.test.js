/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import RentCarComponent from "./component/RentCar";
import AdminPanelComponent from "./component/AdminPanel";
import App from "./App";

test("render App", () => {
    render(<App />);
    const linkElement = screen.getByText("Rent a Car");
    expect(linkElement).toBeInTheDocument();
});

describe("RentCarComponent", () => {
    beforeEach(() => {});

    test.each([
        ["Your Name"],
        ["Birth Date"],
        ["Car"],
        ["Rental duration"],
        ["Cost Summary"],
        ["1 Days"],
    ])("'%s' element exists", (text) => {
        render(<RentCarComponent />);
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    test("Renter input", async () => {
        jest.spyOn(global, "fetch").mockImplementation((url) => {
            if (url === "/cars") {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve([
                            { id: 1, model: "Toyota", price: 200 },
                            { id: 2, model: "Honda", price: 250 },
                        ]),
                });
            } else if (url === "/rents/all") {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve([
                            {
                                id: 1,
                                carId: 1,
                                fromDate: "2024-05-01",
                                toDate: "2024-05-10",
                                renterName: "John Doe",
                            },
                            {
                                id: 2,
                                carId: 2,
                                fromDate: "2024-05-05",
                                toDate: "2024-05-15",
                                renterName: "Jane Doe",
                            },
                        ]),
                });
            }
        });
		render(<RentCarComponent />);
        fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'test String' } }); // Simulerar en ändring i inputfältet
        expect(screen.getByLabelText('Your Name').value).toBe('test String');
    });

});

describe("AdminPanelComponent", () => {
    test("renders car DataTable correctly", async () => {
        jest.spyOn(global, "fetch").mockImplementation((url) => {
            if (url === "/cars") {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve([
                            { id: 1, model: "Toyota", price: 200 },
                            { id: 2, model: "Honda", price: 250 },
                        ]),
                });
            } else if (url === "/rents/all") {
                return Promise.resolve({
                    json: () =>
                        Promise.resolve([
                            {
                                id: 1,
                                carId: 1,
                                fromDate: "2024-05-01",
                                toDate: "2024-05-10",
                                renterName: "John Doe",
                            },
                            {
                                id: 2,
                                carId: 2,
                                fromDate: "2024-05-05",
                                toDate: "2024-05-15",
                                renterName: "Jane Doe",
                            },
                        ]),
                });
            }
        });
        render(<AdminPanelComponent />);
        await waitFor(() => {
            expect(screen.getByText("Model")).toBeInTheDocument();
            expect(screen.getByText("Price")).toBeInTheDocument();
            expect(screen.getAllByText("Toyota")[0]).toBeInTheDocument();
            expect(screen.getAllByText("Toyota")[1]).toBeInTheDocument();
            expect(screen.getByText("200Kr/day")).toBeInTheDocument();
            expect(screen.getAllByText("Honda")[0]).toBeInTheDocument();
            expect(screen.getAllByText("Honda")[1]).toBeInTheDocument();
            expect(screen.getByText("250Kr/day")).toBeInTheDocument();
        });
    });
});
