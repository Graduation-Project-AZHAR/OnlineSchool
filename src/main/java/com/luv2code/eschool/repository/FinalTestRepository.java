package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.FinalTest;
import com.luv2code.eschool.compositekeys.FinalTestKey;

public interface FinalTestRepository extends JpaRepository<FinalTest, FinalTestKey> {

}
