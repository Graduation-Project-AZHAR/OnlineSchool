package com.luv2code.eschool.Entity;

public class FinalTestQuestion {
	
	private int number;
	
	
	
	
	private String Answer;

	public FinalTestQuestion() {
		
	}
	
	public FinalTestQuestion(int number, String answer) {
		super();
		this.number = number;
		Answer = answer;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getAnswer() {
		return Answer;
	}

	public void setAnswer(String answer) {
		Answer = answer;
	}
	
	

}
