package com.collabtrip.backend.model;

import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

@Entity
public class TripRoom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String roomCode;

    private String adminName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate travelDate;

    @OneToMany(mappedBy = "tripRoom", cascade = CascadeType.ALL)
    private List<UserPreference> members;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getRoomCode(){
        return roomCode;
    }
    public void setRoomCode(String roomCode){
        this.roomCode = roomCode;
    }
    public String getAdminName(){
        return adminName;
    }
    public void setAdminName(String adminName){
        this.adminName = adminName;
    }
    public List<UserPreference> getMembers(){
        return members;
    }
    public void setMembers(List<UserPreference> members){
        this.members =  members;
    }
    public LocalDate getTravelDate(){
        return travelDate;
    }
    public void setTravelDate(LocalDate travelDate){
        this.travelDate = travelDate;
    }
}
