package com.example.rental;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RentRepository extends JpaRepository<Rent, Long> {

	@Query(value = "SELECT * FROM rents", nativeQuery = true)
	List<Rent> getAllRents();

	@Query(value = "SELECT * FROM rents WHERE CAR_ID = :id", nativeQuery = true)
	List<Rent> getRentsOfCar(@Param("id") int id);

	@Transactional
    @Modifying
	@Query(value = "INSERT INTO rents (CAR_ID, FROM_DATE, TO_DATE, RENTER_NAME) VALUES (:car_id, :to_date, :from_date, :renter_name)", nativeQuery = true)
	int AddRent(
			@Param("car_id") int car_id,
			@Param("from_date") String fromDate,
			@Param("to_date") String toDate,
			@Param("renter_name") String renter_name);

}