package com.example.rental;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CarRepository extends JpaRepository<Car, Long> {

	@Query(value = "SELECT ID, MODEL, PRICE, RENTED, FROM_DATE, TO_DATE, USER_ID FROM cars", nativeQuery = true)
	List<Car> getAllCars();

	@Query(value = "SELECT ID, MODEL, PRICE, RENTED, FROM_DATE, TO_DATE, USER_ID WHERE RENTED = true FROM cars", nativeQuery = true)
	List<Car> getAllFreeCars();

	@Query(value = "SELECT * FROM cars WHERE ID = :id", nativeQuery = true)
	Car getCar(@Param("id")int id);
}
