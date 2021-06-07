package valid.register.registermanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import valid.register.registermanager.exception.RegisterNotFoundException;
import valid.register.registermanager.model.Register;
import valid.register.registermanager.service.RegisterService;

import java.util.List;

@RestController
@RequestMapping("/register")
public class RegisterController {
    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Register>> getAllRegisters(){
        List<Register> registers = registerService.findAllRegisters();
        //return new ResponseEntity<>(registers, HttpStatus.OK);
        return ResponseEntity.ok(registers);
    }

    @PostMapping("/add")
    public ResponseEntity<Register> addRegister(@RequestBody Register register){
        Register newRegister = registerService.addRegister(new Register(register.getName(), register.getLastname(), false));
        return new ResponseEntity<>(newRegister, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> processRegister(@RequestBody List<Register> registers){
        try{
            for(Register register : registers){
                registerService.findRegisterById(register.getId());
            }
            registerService.processRegister(registers);
            return ResponseEntity.status(HttpStatus.OK).body("Registros procesados correctamente");
        }catch(Exception handlerException){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(handlerException.getMessage());
        }
    }

}
