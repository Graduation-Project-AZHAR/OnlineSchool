package com.luv2code.eschool.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="lesson")
public class Lesson {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="title")
	private String title;
	
	@Column(name="number")
	private int number;
	
	@Column(name="video_url")
	private String video_url;
	
	@Lob   ///this field can hold a large amount of data
	@ElementCollection
    @CollectionTable(name="explantions")
    @Column(name="explantions",columnDefinition = "TEXT")
    private List<String> explantions;
	
	@ElementCollection
    @CollectionTable(name="pictureUrl")
    @Column(name="pictureUrl")
    private List<String> pictureUrl;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinColumn(name="unite_id")
	@JsonIgnore
	private Unite unite;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "exercise_number")
	private Exercise exercise ;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	public Lesson() {
		
		
	}


	public Lesson(String title, int number, String video_url, List<String> explantions, List<String> pictureUrl) {
		super();
		this.title = title;
		this.number = number;
		this.video_url = video_url;
		this.explantions = explantions;
		this.pictureUrl = pictureUrl;
	}


	public int getId() {
		return id;
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

	public String getVideo_url() {
		return video_url;
	}

	public void setVideo_url(String video_url) {
		this.video_url = video_url;
	}

	public List<String> getExplantions() {
		return explantions;
	}

	public void setExplantions(List<String> explantions) {
		this.explantions = explantions;
	}

	public List<String> getPictureUrl() {
		return pictureUrl;
	}

	public void setPictureUrl(List<String> pictureUrl) {
		this.pictureUrl = pictureUrl;
	}

	public int getUniteNumber() {
		return unite.getNumber();
	}
	
	
	public int getUnite() {
		return unite.getId();
	}

	public void setUnite(Unite unite) {
		this.unite = unite;
	}

//	public int getExerciseNumber() {
//		if(exercise==null) {
//			return 0;
//		}
//		return this.exercise.getNumber();
//	}
	
	public Exercise getExercise() {

		return this.exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}
	
	
}
