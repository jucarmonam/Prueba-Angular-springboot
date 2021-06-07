package valid.register.registermanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import valid.register.registermanager.model.Register;

import java.util.Optional;


public interface RegisterRepository extends JpaRepository<Register, Long> {

    Optional<Register> findRegisterById(Long id);
}
