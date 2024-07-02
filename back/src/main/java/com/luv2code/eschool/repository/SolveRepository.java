package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.solve;
import com.luv2code.eschool.compositekeys.SolveKey;

public interface SolveRepository extends JpaRepository<solve, SolveKey> {

}
