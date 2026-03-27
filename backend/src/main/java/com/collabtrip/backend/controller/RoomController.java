package com.collabtrip.backend.controller;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.collabtrip.backend.model.TripRoom;
import com.collabtrip.backend.repository.TripRoomRepository;
import com.collabtrip.backend.service.RoomService;
import com.collabtrip.backend.model.UserPreference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private TripRoomRepository roomRepo;

    @PostMapping("/create")
    public ResponseEntity<TripRoom> createRoom(@RequestParam String code, @RequestParam String admin, @RequestParam LocalDate travelDate){
        return ResponseEntity.ok(roomService.createRoom(code, admin, travelDate));
    }
    @PostMapping("/{roomCode}/preferences")
    public ResponseEntity<UserPreference> savePref(@PathVariable String roomCode, @RequestBody UserPreference pref){
        return ResponseEntity.ok(roomService.addPreference(roomCode, pref));
    }
    @GetMapping("/{roomCode}")
    public ResponseEntity<TripRoom> getRoomDetails(@PathVariable String roomCode){
        return ResponseEntity.ok(roomRepo.findByRoomCode(roomCode).orElseThrow(()-> new RuntimeException("Room not found")));
    }
    @PostMapping("/{roomCode}/update-date")
    public ResponseEntity<TripRoom> updateDate(@PathVariable String roomCode, @RequestParam LocalDate newDate){
        return ResponseEntity.ok(roomService.updateRoomDate(roomCode, newDate));
    }
}
