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
@Table(name="questionAndAnswer")
public class QuestionAndAnswer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int Id;
	
	@Column(name="question")
	private String question;
	
	
	@ElementCollection
	@CollectionTable(name="questionOptions")
	@Column(name="options")
	private List<String> options;
	
	
	@Column(name="Answer")
	private String Answer;
	
	@Column(name="number")
	private int number;
	
	
	public QuestionAndAnswer() {
		
	}

	public QuestionAndAnswer(String question, List<String> options, String answer, int number) {
		super();
		this.question = question;
		this.options = options;
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

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public String getAnswer() {
		return Answer;
	}

	public void setAnswer(String answer) {
		Answer = answer;
	}
	
	
	

}
