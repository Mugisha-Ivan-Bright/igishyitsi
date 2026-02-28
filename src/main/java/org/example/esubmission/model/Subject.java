package org.example.esubmission.model;

import jakarta.persistence.*;

/**
 * Represents a subject in the school curriculum.
 */
@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private Integer credits;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    public Subject() {}

    public Subject(String code, String name, String department, Integer credits) {
        this.code = code;
        this.name = name;
        this.department = department;
        this.credits = credits;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }
}
