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
        //System.out.println("returning Car List");
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

}
