package org.example.esubmission.model;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.example.esubmission.util.Gender;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;

public class Person {
    private Integer id;
    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate dob;


    public Person(Integer id, String firstName, String lastName, Gender gender, LocalDate dob) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
    }

    public Person() {

    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public Integer getAge() {
        return Period.between(dob, LocalDate.now()).getYears();
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public boolean isChild() {
        return Period.between(dob, LocalDate.now()).getYears() < 18;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

}