package com.collabtrip.backend.service;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collabtrip.backend.repository.TripRoomRepository;
import com.collabtrip.backend.repository.PrefRepository;
import com.collabtrip.backend.model.UserPreference;
import com.collabtrip.backend.model.TripRoom;

@Service
public class RoomService {
    @Autowired
    private TripRoomRepository roomRepo;

    @Autowired
    private PrefRepository prefRepo;

    public TripRoom createRoom(String code, String adminName, LocalDate travelDate){
        TripRoom room = new TripRoom();
        room.setRoomCode(code);
        room.setAdminName(adminName);
        room.setTravelDate(travelDate);
        return roomRepo.save(room);
    }
    public UserPreference addPreference(String roomCode, UserPreference pref){
        TripRoom room = roomRepo.findByRoomCode(roomCode).
                                orElseThrow(()->new RuntimeException("Room not Found!"));
        pref.setTripRoom(room);
        return prefRepo.save(pref);
    }
    public TripRoom updateRoomDate(String roomCode, LocalDate newDate){
        TripRoom room = roomRepo.findByRoomCode(roomCode).orElseThrow(()-> new RuntimeException("Room not Found"));
        room.setTravelDate(newDate);
        return roomRepo.save(room);
    }
}
