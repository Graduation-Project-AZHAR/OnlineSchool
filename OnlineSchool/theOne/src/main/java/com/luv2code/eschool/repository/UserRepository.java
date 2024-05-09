package com.luv2code.eschool.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.luv2code.eschool.Entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u.email FROM User u")
    List<Object> selectEmail();
    
    //@Query("SELECT u.user-type FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> findByEmailAndPassword(String email, String password);
    

    Optional<User> findByEmail(String email);
    
    
}
