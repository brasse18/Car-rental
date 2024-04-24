package com.example.rental;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RenterRepository extends JpaRepository<Car, Long> {

	@Query(value = "SELECT * FROM renters", nativeQuery = true)
	List<Renter> getAllRenters();

	@Query(value = "SELECT * FROM renters WHERE ID = :id", nativeQuery = true)
	Renter getRenter(@Param("id")int id);

	@Query(value = "UPDATE renters SET name = :name WHERE ID = :id", nativeQuery = true)
	void SetNameOfRenter(
		@Param("id")int id,
		@Param("name") String name);
}