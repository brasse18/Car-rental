package com.example.rental;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/cars")

public class RentalController {
    private final CarRepository carRepository;

	public RentalController(CarRepository carRepository) {
		this.carRepository = carRepository;
	}

	@GetMapping("/all")
	public List<Car> sendCar() {
		return carRepository.getAllCars();
	}

	@GetMapping("/allFree")
	public List<Car> getMethodName() {
		return carRepository.getAllFreeCars();
	}

	@GetMapping("/car")
	public Car getMethodName(@RequestParam int id) {
		return carRepository.getCar(id);
	}

	@GetMapping("/rent")
	public int getMethodName(@RequestParam int id, @RequestParam String from_date, @RequestParam String to_date, @RequestParam int renter_id) {
		return carRepository.rentCar(id, from_date, to_date, renter_id);
	}

}
