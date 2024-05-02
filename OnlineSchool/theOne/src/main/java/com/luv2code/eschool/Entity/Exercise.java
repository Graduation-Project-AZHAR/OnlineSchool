package com.luv2code.eschool.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;


@Entity
@Table(name="exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="number")
    private int number;
   
    @ElementCollection
    @CollectionTable(name="ExerciseQuestionsAnswers")
    @Column(name="question")
    private List<String> question;
    
    @ElementCollection
    @CollectionTable(name="ExerciseQuestionsAnswers")
    @Column(name="answer")
    private List<String> answer;

    
    
    @ManyToMany(fetch=FetchType.LAZY ,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinTable(
			   name ="solve",
			   joinColumns = @JoinColumn(name="exercise_number"),
			   inverseJoinColumns = @JoinColumn(name="student_id"))
	@JsonIgnore
	private List<Student> students;
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////

	public int getNumber() {
		return number;
	}


	public void setNumber(int number) {
		this.number = number;
	}

	public List<String> getQuestions() {
		return question;
	}

	public void setQuestions(List<String> questions) {
		this.question = questions;
	}

	public List<String> getAnswers() {
		return answer;
	}

	public void setAnswers(List<String> answers) {
		this.answer = answers;
	}


	
	public List<Student> getStudents() {
		return students;
	}


	public void setStudents(List<Student> students) {
		this.students = students;
	}


	public Exercise() {
		
	}

	public Exercise(List<String> questions, List<String> answers) {
		super();
		this.question = questions;
		this.answer = answers;
	}


	public void addQuestion (String theQuestion) {
		
		if (question==null) {
			question=new ArrayList<>();
		}
		question.add(theQuestion);
		
	}
	
}
