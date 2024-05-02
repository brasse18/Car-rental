package com.example.rental;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class RentTest {

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        Long carId = 123L;
        String fromDate = "2024-05-01";
        String toDate = "2024-05-10";
        String renterName = "John Doe";

        Rent rent = new Rent();
        rent.setId(id);
        rent.setCarId(carId);
        rent.setFromDate(fromDate);
        rent.setToDate(toDate);
        rent.setRenterName(renterName);

        Long retrievedId = rent.getId();
        Long retrievedCarId = rent.getCarId();
        String retrievedFromDate = rent.getFromDate();
        String retrievedToDate = rent.getToDate();
        String retrievedRenterName = rent.getRenterName();

        assertEquals(id, retrievedId);
        assertEquals(carId, retrievedCarId);
        assertEquals(fromDate, retrievedFromDate);
        assertEquals(toDate, retrievedToDate);
        assertEquals(renterName, retrievedRenterName);
    }
}