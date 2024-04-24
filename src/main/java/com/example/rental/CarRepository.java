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

	@Query(value = "SELECT * FROM cars WHERE RENTED = true", nativeQuery = true)
	List<Car> getAllFreeCars();

	@Query(value = "SELECT * FROM cars WHERE ID = :id", nativeQuery = true)
	Car getCar(@Param("id")int id);

	@Transactional
	@Modifying(flushAutomatically = true)
	@Query(value = "UPDATE cars SET rented = true, from_date = :from_date, to_date = :to_date, renter_id = :renter_id WHERE ID = :id", nativeQuery = true)
	int rentCar(
		@Param("id")int id,
		@Param("from_date") String fromDateObj,
		@Param("to_date") String toDateObj,
		@Param("renter_id") int renter_id);

}
