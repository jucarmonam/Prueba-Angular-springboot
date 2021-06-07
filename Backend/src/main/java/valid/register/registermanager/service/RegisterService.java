package valid.register.registermanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import valid.register.registermanager.exception.RegisterNotFoundException;
import valid.register.registermanager.model.Register;
import valid.register.registermanager.repository.RegisterRepository;

import java.util.List;

@Service
public class RegisterService {
    private final RegisterRepository registerRepository;

    @Autowired
    public RegisterService(RegisterRepository registerRepository) {
        this.registerRepository = registerRepository;
    }

    public Register addRegister(Register register){
        return registerRepository.save(register);
    }

    public List<Register> findAllRegisters(){
        return registerRepository.findAll();
    }

    public void processRegister(List<Register> registers){
        for(Register register : registers){
            registerRepository.save(register);
        }
    }

    public Register findRegisterById(Long id){
        return registerRepository.findRegisterById(id)
                .orElseThrow(() -> new RegisterNotFoundException("Register by id " + id + " was not found"));
    }
}
