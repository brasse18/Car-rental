package com.example.rental;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "rents")
public class Rent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Long car_id;
    String from_date;
    String to_date;
    String renter_name;

    public Rent() {
        this.renter_name = "Renter name";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCarId(Long id) {
        this.car_id = id;
    }

    public Long getCarId () {
        return this.car_id;
    }

    public void setFromDate(String date) {
        this.from_date = date;
    }

    public String getFromDate() {
        return this.from_date;
    }

    public void setToDate(String date) {
        this.to_date = date;
    }

    public String getToDate() {
        return this.to_date;
    }

    public void setRenterName(String name) {
        this.renter_name = name;
    }

    public String getRenterName() {
        return this.renter_name;
    }
}
