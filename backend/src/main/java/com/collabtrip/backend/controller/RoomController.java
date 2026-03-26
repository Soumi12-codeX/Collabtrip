
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping("/create")
    public ResponseEntity<TripRoom> createRoom(@RequestParam String code, @RequestParam String admin){
        return ResponseEntity.ok(roomService.createRoom(code, admin));
    }
    @PostMapping("/{roomCode}/preferences")
    public ResponseEntity<UserPreference> savePref(@PathVariable String roomCode, @RequestBody UserPreference pref){
        return ResponseEntity.ok(roomService.addPreference(roomCode, pref));
    }
}
