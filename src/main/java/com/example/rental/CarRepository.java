package com.example.rental;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface CarRepository extends JpaRepository<Car, Long> {

	@Query(value = "SELECT * FROM cars", nativeQuery = true)
	List<Car> getAllCars();

	@Query(value = "SELECT * FROM cars WHERE ID = :id", nativeQuery = true)
	Car getCar(@Param("id")int id);

}
