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
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="teacher")
public class Teacher {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	@Column(name="id")
	private int id;

	@Column(name="name")
	private String name;
	
	@Column(name="personal_Photo")
	private String personal_Photo;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	
	
	
	@OneToMany(mappedBy = "teacher", // fetch = FetchType.EAGER,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JsonIgnore
	private List<Subject> subject;
	
	
	
////////////////////////////////////////////////////////////////////////////////////////////



	public Teacher() {
		
	}
	

	public Teacher(String name,String personal_Photo, String email, String password) {
		this.name = name;
		this.personal_Photo = personal_Photo;
		this.email = email;
		this.password = password;
		
	}
	
////////////////////////////////////////////////////////////////////////////////////////////
	

	
	public String getPersonal_Photo() {
		return personal_Photo;
	}


	public void setPersonal_Photo(String personal_Photo) {
		this.personal_Photo = personal_Photo;
	}

	
	public List<Subject> getSubject() {
		return subject;
	}


	public void setSubject(List<Subject> subject) {
		this.subject = subject;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	
	public String getPersonalPhoto() {
		return personal_Photo;
	}


	
	public void setPersonalPhoto(String personal_Photo) {
		this.personal_Photo = personal_Photo;
	}



	


////////////////////////////////////////////////////////////////////////////////////////////

	@Override
	public String toString() {
		return "Teacher [id=" + id + ", name=" + name + ", personal_Photo=" + personal_Photo + ", email=" + email
				+ ", password=" + password + "]";
	}
	
	
	
	

}
