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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
	
	@Column(name="picture_url")
	private String pictureURL;



    @Column(name="contentOfFirstTerm")
    private String contentOfFirstTerm ;
    
    @Column(name="contentOfSecondTeam")
    private String contentOfSecondTeam ;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinColumn(name="teacher_id")
	private Teacher teacher;
	
	@OneToMany(mappedBy = "subject", // fetch = FetchType.EAGER,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JsonIgnore
	private List<Unite> unite;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="subject_id")
    private List<FinalQuestionAnswer> finalQuestionAnswer;

	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	public Subject() {
		
	}

public Subject(String title, String description, String pictureURL, String contentOfFirstTerm,String contentOfSecondTeam) {
	super();
	this.title = title;
	this.description = description;
	this.pictureURL = pictureURL;
	this.contentOfFirstTerm = contentOfFirstTerm;
	this.contentOfSecondTeam = contentOfSecondTeam;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////



	public String getContentOfFirstTerm() {
	return contentOfFirstTerm;
}

public void setContentOfFirstTerm(String contentOfFirstTerm) {
	this.contentOfFirstTerm = contentOfFirstTerm;
}

public String getContentOfSecondTeam() {
	return contentOfSecondTeam;
}

public void setContentOfSecondTeam(String contentOfSecondTeam) {
	this.contentOfSecondTeam = contentOfSecondTeam;
}

	public List<FinalQuestionAnswer> getFinalQuestionAnswer() {
		return finalQuestionAnswer;
	}


	public void setFinalQuestionAnswer(List<FinalQuestionAnswer> finalFinalQuestionAnswer) {
		this.finalQuestionAnswer = finalFinalQuestionAnswer;
	}

	public int getId() {
		return id;
	}

	public String getPictureURL() {
		return pictureURL;
	}

	public void setPictureURL(String pictureURL) {
		this.pictureURL = pictureURL;
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

	public void addFinalQuestionAnswer (FinalQuestionAnswer theFinalQuestionAnswer) {
		
		if (finalQuestionAnswer==null) {
			finalQuestionAnswer=new ArrayList<>();
		}
		finalQuestionAnswer.add(theFinalQuestionAnswer);
		
	}
	public void AddUnite(Unite theUnite) {
		
		if(unite==null) {
			unite=new ArrayList<>();
		}
		unite.add(theUnite);
		theUnite.setSubject(this);
	}
	
}
