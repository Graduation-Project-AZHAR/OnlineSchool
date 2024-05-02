package com.luv2code.eschool.Entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="unite")
public class Unite {

		@Id
		@GeneratedValue(strategy =GenerationType.IDENTITY)
		@Column(name="id")
		private int id;
		
		@Column(name="title")
		private String title;

		@Column(name="number")
		private int number;
		
		@Column(name="description")
		private String description;
		
		@OneToMany(mappedBy = "unite", // fetch = FetchType.EAGER,
				fetch = FetchType.LAZY,
				cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
		@JsonIgnore
		private List<Lesson> lesson;
		
		
		@OneToOne(cascade = CascadeType.ALL)
		@JoinColumn(name = "exercise_number")
		private Exercise exercise ;
		
		@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
		@JoinColumn(name="subject_id")
		@JsonIgnore
		private Subject subject ;
		
		
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		

		public Unite () {
			
		}
		
		
		public Unite(String title, int number, String description) {
			super();
			this.title = title;
			this.number = number;
			this.description = description;
}




		public int getNumber() {
			return number;
		}


		public void setNumber(int number) {
			this.number = number;
		}


		public List<Lesson> getLesson() {
			return lesson;
		}


		public void setLesson(List<Lesson> lesson) {
			this.lesson = lesson;
		}


		public int getExerciseNumber() {
			return exercise.getNumber();
		}


		public void setExercise(Exercise exercise) {
			this.exercise = exercise;
		}


		public int getSubjectId() {
			return subject.getId();
		}


		public void setSubject(Subject subject) {
			this.subject = subject;
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

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}


		@Override
		public String toString() {
			return "Unite [number=" + id + ", title=" + title + ", description=" + description + "]";
		}
		
	
}
