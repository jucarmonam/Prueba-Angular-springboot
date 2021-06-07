package valid.register.registermanager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        return ResponseEntity.ok(registers);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addRegister(@RequestBody Register register){
        try{
            if(!register.getName().equals("") && !register.getLastname().equals("")){
                Register newRegister = registerService.addRegister(new Register(register.getName(), register.getLastname(), false));
                return new ResponseEntity<>(newRegister, HttpStatus.CREATED);
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Los campos no pueden ir vacios");
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Todos los campos son obligatorios");
        }

    }

    @PutMapping("/update")
    public ResponseEntity<Object> processRegister(@RequestBody List<Register> registers){
        try{
            for(Register register : registers){
                registerService.findRegisterById(register.getId());
            }
            registerService.processRegister(registers);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception handlerException){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(handlerException.getMessage());
        }
    }

}
