package com.luv2code.eschool.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="personal_Photo")
	private String personalPhoto;
	
	@Column(name="active")
	private int active;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	@Column(name="User_type")
	private String UserType;
	
	public User() {
		
	}

	public User(String name, String personalPhoto, String email, String password,String UserType) {
		super();
		this.name          = name;
		this.personalPhoto = personalPhoto;
		this.email         = email;
		this.password      = password;
		this.UserType      = UserType;
		this.active  =1;
	}

	
	
	
	public String getUserType() {
		return UserType;
	}

	public void setUserType(String userType) {
		UserType = userType;
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

	public String getPersonalPhoto() {
		return personalPhoto;
	}

	public void setPersonalPhoto(String personalPhoto) {
		this.personalPhoto = personalPhoto;
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

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", personalPhoto=" + personalPhoto + ", active=" + active
				+ ", email=" + email + ", password=" + password + ", UserType=" + UserType + "]";
	}
	
	
	
}
