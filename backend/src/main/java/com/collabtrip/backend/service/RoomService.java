import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.collabtrip.backend.repository;
import com.collabtrip.backend.model.UserPreference;
import com.collabtrip.backend.model.TripRoom;

@Service
public class RoomService {
    @Autowired
    private TripRoomRepository roomRepo;

    @Autowired
    private PrefRepository prefRepo;

    public TripRoom createRoom(String code, String adminName){
        TripRoom room = new TripRoom();
        room.setRoomcode(code);
        room.setAdminName(adminName);
        return roomRepo.save(room);
    }
    public UserPreference addPreference(String roomCode, UserPreference pref){
        TripRoom room = roomRepo.findByRoomCode(roomCode).
                                orElseThrow(()->new RuntimeException("Room not Found!"));
        pref.setTripRoom(room);
        return prefRepo.save(pref);
    }
}
