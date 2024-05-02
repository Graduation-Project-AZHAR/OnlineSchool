package com.luv2code.eschool.compositekeys;

import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.Entity.Student;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class SolveKey {


	@ManyToOne
	@JoinColumn(name="student_id")
	private Student student;

	@ManyToOne
	@JoinColumn(name="exercise_number")
	private Exercise exercise;

	public SolveKey() {
		
	}
	
	public SolveKey(Student student, Exercise exercise) {
		super();
		this.student = student;
		this.exercise = exercise;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}
	
	
}



