package com.example.rental;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class CarTest {

    @Test
    public void testGettersAndSetters() {
        Long id = 1L;
        String model = "Toyota Camry";
        int price = 20000;

        Car car = new Car();
        car.setId(id);
        car.setModel(model);
        car.setPrice(price);

        Long retrievedId = car.getId();
        String retrievedModel = car.getModel();
        int retrievedPrice = car.getPrice();

        assertEquals(id, retrievedId);
        assertEquals(model, retrievedModel);
        assertEquals(price, retrievedPrice);
    }
}
