package com.example.rental;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class RentalControllerTest {

    @MockBean
    private CarRepository carRepository;

    @MockBean
    private RentRepository rentRepository;

    private RentalController rentalController;

    @BeforeEach
    public void setUp() {
        rentalController = new RentalController(carRepository, rentRepository);
    }

    @Test
    public void testGetCars() {
        List<Car> cars = Arrays.asList(new Car(), new Car());
        when(carRepository.getAllCars()).thenReturn(cars);

        List<Car> result = rentalController.getCars();

        assertEquals(cars.size(), result.size());
    }

    @Test
    public void testGetAllCars() {

        List<Car> cars = Arrays.asList(new Car(), new Car());
        when(carRepository.getAllCars()).thenReturn(cars);

        List<Car> result = rentalController.getCars();

        assertEquals(cars.size(), result.size());
    }

    @Test
    public void testGetAllRents() {

        List<Rent> rents = Arrays.asList(new Rent(), new Rent());
        when(rentRepository.getAllRents()).thenReturn(rents);

        List<Rent> result = rentalController.getRenters();

        assertEquals(rents.size(), result.size());
    }
}
