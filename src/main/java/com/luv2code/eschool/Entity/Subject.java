package com.luv2code.eschool.Entity;

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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="subject")
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="description")
	private String description;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinColumn(name="teacher_id")
	private Teacher teacher;
	
	@OneToMany(mappedBy = "subject", // fetch = FetchType.EAGER,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JsonIgnore
	private List<Unite> unite;

    @ElementCollection
    @CollectionTable(name="TestQuestionsAnswers")
    @Column(name="question")
    private List<String> question;
    
    @ElementCollection
    @CollectionTable(name="TestQuestionsAnswers")
    @Column(name="answer")
    private List<String> answer;
	

	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public Subject() {
		
	}

	public Subject( String title, String description) {
		super();
		this.title = title;
		this.description = description;
	}
	
	
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////



	public int getId() {
		return id;
	}

	public List<String> getQuestion() {
		return question;
	}

	public void setQuestion(List<String> question) {
		this.question = question;
	}

	public List<String> getAnswer() {
		return answer;
	}

	public void setAnswer(List<String> answer) {
		this.answer = answer;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Unite> getUnite() {
		return unite;
	}

	public void setUnite(List<Unite> unite) {
		this.unite = unite;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	

	public int getTeacher() {
		return teacher.getId();
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}


	
	
	
}