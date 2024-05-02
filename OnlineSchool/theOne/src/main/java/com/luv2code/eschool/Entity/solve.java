package com.luv2code.eschool.Entity;

import com.luv2code.eschool.compositekeys.SolveKey;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name="solve")
public class solve {

	
	@EmbeddedId
	private SolveKey solveKey;
	
	@Column(name="grade")
	private int grade;

	public solve() {
		
	}
	
	public solve(SolveKey solveKey, int grade) {
		super();
		this.solveKey = solveKey;
		this.grade = grade;
	}

	public SolveKey getSolveKey() {
		return solveKey;
	}

	public void setSolveKey(SolveKey solveKey) {
		this.solveKey = solveKey;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

}
