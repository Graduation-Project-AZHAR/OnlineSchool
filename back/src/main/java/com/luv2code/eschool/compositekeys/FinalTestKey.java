package com.luv2code.eschool.compositekeys;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.Subject;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Embeddable
public class FinalTestKey implements Serializable {
	
	@ManyToOne
	@JoinColumn(name="student_id")
	@JsonIgnore
	private Student student;

	@ManyToOne
	@JoinColumn(name="subject_id")
	@JsonIgnore
	private Subject subject;
	

	public FinalTestKey() {
		
	}
	
	public FinalTestKey(Student student, Subject subject) {
		super();
		this.student = student;
		this.subject = subject;
	}
	

	public String getSubjectTitle() {
		return subject.getTitle();
	}
	
	public int getStudentNumber() {
		return student.getId();
	}


	public int getSubjectNumber() {
		return subject.getId();
	}
	
	
	public Student getStudent() {
		return student;
	}


	public void setStudent(Student student) {
		this.student = student;
	}


	public Subject getSubject() {
		return subject;
	}


	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	@Override
	public String toString() {
		return "FinalTestKey [student=" + student + ", subject=" + subject + "]";
	}
	
	
	
	
}
