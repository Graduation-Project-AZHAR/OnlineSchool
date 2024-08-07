package com.luv2code.eschool.Entity;

import com.luv2code.eschool.compositekeys.FinalTestKey;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="final_test")
public class FinalTest {

	@EmbeddedId
	private FinalTestKey finalTestKey;
	
	@Column(name="grade")
	private int grade;


	public FinalTest() {
		
	}
	
	public FinalTest(FinalTestKey finalTestKey, int grade) {
		super();
		this.finalTestKey = finalTestKey;
		this.grade = grade;
	}



	public FinalTestKey getFinalTestKey() {
		return finalTestKey;
	}


	public void setFinalTestKey(FinalTestKey finalTestKey) {
		this.finalTestKey = finalTestKey;
	}


	public int getGrade() {
		return grade;
	}


	public void setGrade(int grade) {
		this.grade = grade;
	}
	
}
