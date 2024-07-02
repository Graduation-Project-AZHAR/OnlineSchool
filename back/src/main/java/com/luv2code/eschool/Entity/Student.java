package com.luv2code.eschool.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="student")
public class Student extends User {
	
	@Column(name="time_spent")
	private int timeSpent;

	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinColumn(name="parent_id")
	private Parent parent;
	
	
	@ManyToMany(fetch=FetchType.LAZY ,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinTable(
			   name ="solve",
			   joinColumns = @JoinColumn(name="student_id"),
			   inverseJoinColumns = @JoinColumn(name="exercise_number"))
	@JsonIgnore
	private List<Exercise> exercise ;
	

////////////////////////////////////////////////////////////////////////////////////////////
 
	public Student() {
		super();
	}
	
	public Student(String name, String personalPhoto, String email, String password) {
		super(name, personalPhoto, email, password);
		// TODO Auto-generated constructor stub
	}



	public List<Exercise> getExercise() {
		return exercise;
	}

	public void setExercise(List<Exercise> exercise) {
		this.exercise = exercise;
	}

	public int getParent() {
		return parent.getId();
	}


	public void setParent(Parent parent) {
		this.parent = parent;
	}


	public int getTimeSpent() {
		return timeSpent;
	}


	public void setTimeSpent(int timeSpent) {
		this.timeSpent = timeSpent;
	}
	
}
