package com.example.rental;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/")

public class RentalController {
    private final CarRepository carRepository;
	private final RentRepository rentRepository;

	public RentalController(CarRepository carRepository, RentRepository rentRepository) {
		this.carRepository = carRepository;
		this.rentRepository = rentRepository;
	}

	@GetMapping("cars")
	public List<Car> getCars() {
		System.out.println("Sending: Cars");
		return carRepository.getAllCars();
	}

	@GetMapping("car")
	public Car getCar(@RequestParam int id) {
		System.out.println("Sending: Car[" + Integer.toString(id) + "]");
		return carRepository.getCar(id);
	}

	@GetMapping("rent")
	public int rentCar(@RequestParam int car_id, @RequestParam String from_date, @RequestParam String to_date, @RequestParam String renter_name) {
		System.out.println("renting: Car[" + Integer.toString(car_id) + "]");
		return rentRepository.AddRent(car_id, from_date, to_date, renter_name);
	}

	@GetMapping("rents/all")
	public List<Rent> getRenters() {
		System.out.println("Sending: Rents");
		return rentRepository.getAllRents();
	}

	@GetMapping("rents/carId")
	public List<Rent> getRentsOfCar(@RequestParam int id) {
		return rentRepository.getRentsOfCar(id);
	}


}
