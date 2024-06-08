package com.luv2code.eschool.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="student")
public class Student extends User {
	
//	@Id
//	@GeneratedValue(strategy =GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//	
//	@Column(name="name")
//	private String name;
//	
//	@Column(name="personal_Photo")
//	private String personalPhoto;
	
	@Column(name="time_spent")
	private int timeSpent;

//	@Column(name="email")
//	private String email;
//	
//	@Column(name="password")
//	private String password;
	
	@ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinColumn(name="parent_id")
	private Parent parent;
	
	
	@ManyToMany(fetch=FetchType.LAZY ,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH} )
	@JoinTable(
			   name ="solve",
			   joinColumns = @JoinColumn(name="student_id"),
			   inverseJoinColumns = @JoinColumn(name="exercise_number"))
	@JsonIgnore
	private List<Exercise> exercise ;
	

////////////////////////////////////////////////////////////////////////////////////////////
 
	public Student() {
		super();
	}
	
	public Student(String name, String personalPhoto, String email, String password) {
		super(name, personalPhoto, email, password,"student");
		// TODO Auto-generated constructor stub
	}


//	public Student(String name,String personalPhoto, String email, String password) {
//		super();
//		this.name = name;
//		this.personalPhoto = personalPhoto;
//		this.email = email;
//		this.password = password;
//	}
//	
////////////////////////////////////////////////////////////////////////////////////////////
	
	
//	public String getpersonalPhoto() {
//		return personalPhoto;
//	}



	public int getParent() {
		return parent.getId();
	}


	public void setParent(Parent parent) {
		this.parent = parent;
	}


//	public void setpersonalPhoto(String personalPhoto) {
//		this.personalPhoto = personalPhoto;
//	}


	public int getTimeSpent() {
		return timeSpent;
	}


	public void setTimeSpent(int timeSpent) {
		this.timeSpent = timeSpent;
	}
	
//	
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//	
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//

	


////////////////////////////////////////////////////////////////////////////////////////////

	
}
