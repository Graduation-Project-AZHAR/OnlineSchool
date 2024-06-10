package com.luv2code.eschool.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="parent")
public class Parent extends User {

	@OneToMany(mappedBy = "parent", // fetch = FetchType.EAGER,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	private List<Student> student;

	public Parent() {
		super();
	}
	
	public Parent(String name, String personalPhoto, String email, String password) {
		super(name, personalPhoto, email, password,"parent");
		
	}
	

	public List<Student> getStudent() {
		return student;
	}

	public void setStudent(List<Student> student) {
		this.student = student;
	}

}
