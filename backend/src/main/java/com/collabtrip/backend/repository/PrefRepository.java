import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.collabtrip.backend.model;

@Repository
public interface PrefRepository extends JpaRepository<UserPreference, Long> {
    
}
