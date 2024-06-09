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
import jakarta.persistence.OneToMany;


@Entity
@Table(name="exercise")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="number")
    private int number;
   

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="exercise_id")
    private List<QuestionAndAnswer> questionAndAnswer;
    
    
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

	
	public List<Student> getStudents() {
		return students;
	}


	public void setStudents(List<Student> students) {
		this.students = students;
	}


	public Exercise() {
		
	}

	public Exercise(int number) {
		super();
		this.number = number;
	}


	public List<QuestionAndAnswer> getQuestionAndAnswer() {
		return questionAndAnswer;
	}


	public void setQuestionAndAnswer(List<QuestionAndAnswer> questionAndAnswer) {
		this.questionAndAnswer = questionAndAnswer;
	}


	public void addQuestionAndAnswer (QuestionAndAnswer theQuestionAndAnswer) {
		
		if (questionAndAnswer==null) {
			questionAndAnswer=new ArrayList<>();
		}
		questionAndAnswer.add(theQuestionAndAnswer);
		
	}
	
}
