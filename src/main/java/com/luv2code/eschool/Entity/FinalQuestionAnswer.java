package com.luv2code.eschool.Entity;

import java.util.List;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="finalQuestionAnswer")
public class FinalQuestionAnswer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int Id;
	
	@Column(name="question")
	private String question;
	
	
	@ElementCollection
	@CollectionTable(name="FinalOptions")
	@Column(name="FinalOptions")
	private List<String> FinalOptions;
	
	
	@Column(name="Answer")
	private String Answer;
	
	@Column(name="number")
	private int number;
	
	
	public FinalQuestionAnswer() {
		
	}

	public FinalQuestionAnswer(String question, List<String> FinalOptions, String answer, int number) {
		super();
		this.question = question;
		this.FinalOptions = FinalOptions;
		this.Answer = answer;
		this.number = number;
	}



	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public int getId() {
		return Id;
	}

	public void setId(int Id) {
		this.Id = Id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<String> getFinalOptions() {
		return FinalOptions;
	}

	public void setFinalOptions(List<String> FinalOptions) {
		this.FinalOptions = FinalOptions;
	}

	public String getAnswer() {
		return Answer;
	}

	public void setAnswer(String answer) {
		Answer = answer;
	}
	
	
	

}
