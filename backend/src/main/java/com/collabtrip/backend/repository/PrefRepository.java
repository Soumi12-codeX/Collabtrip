package com.collabtrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.collabtrip.backend.model.UserPreference;

@Repository
public interface PrefRepository extends JpaRepository<UserPreference, Long> {
    
}
