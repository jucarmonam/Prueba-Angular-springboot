import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Register } from '../register';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css'],
})
export class RegisterManagerComponent implements OnInit {
  public registers: Register[];
  public registersToProcess: Register[];

  constructor(private registerService: RegisterService) {
    this.registers = [];
    this.registersToProcess = [];
  }

  ngOnInit() {
    //when this component its initialized we call the function that gets
    //the registers
    this.getRegisters();
  }

  //Function that call the service to get the registers
  public getRegisters(): void {
    this.registerService.getRegisters().subscribe(
      (response: Register[]) => {
        this.registers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public processSelected(e: any, register: Register) {
    if (e.target.checked) {
      this.registersToProcess.push(register);
    } else {
      let i: number = 0;
      this.registersToProcess.forEach((item: Register) => {
        if (item.id == register.id) {
          this.registersToProcess.splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  public processClicked() {
    if (this.registersToProcess.length == 0) {
      alert('No se ha seleccionado almenos un registro');
    } else {
      this.registersToProcess.forEach(
        (register) => (register.processed = true)
      );
      this.registerService.processRegister(this.registersToProcess).subscribe(
        (response: void) => {
          alert('registros actualizados correctamente');
          this.getRegisters();
          this.registersToProcess = [];
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
}
