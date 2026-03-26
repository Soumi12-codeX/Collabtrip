import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserPreference {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private Integer budgetLimit;
    private Integer availableDays;
    private String preferredStyle; //Comfort, luxury, budget

    @ManyToOne
    @JoinColumn(name = "room_id")
    private TripRoom tripRoom;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public Integer getBudgetLimit(){
        return budgetLimit;
    }
    public void setBudgetLimit(Integer budgetLimit){
        this.budgetLimit = budgetLimit;
    }
    public Integer getAvailableDays(){
        return availableDays;
    }
    public void setAvailableDays(Integer availableDays){
        this.availableDays = availableDays;
    }
    public String getPreferredStyle(){
        return preferredStyle;
    }
    public void setPreferredStyle(String prefferedStyle){
        this.preferredStyle = prefferedStyle;
    }
    public TripRoom getTripRoom(){
        return tripRoom;
    }
    public void setTripRoom(TripRoom tripRoom){
        this.tripRoom = tripRoom;
    }
}
