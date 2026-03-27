package com.collabtrip.backend.repository;
import java.util.Optional;
import com.collabtrip.backend.model.TripRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRoomRepository extends JpaRepository<TripRoom, Long> {
    Optional<TripRoom> findByRoomCode(String roomCode);
}
