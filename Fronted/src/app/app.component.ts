import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, SimpleChange } from '@angular/core';
import { Register } from './register';
import { RegisterService } from './register.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //Variable to store all the registers
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
        console.log(response);
        this.registers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public processSelected(e: any, register: Register) {
    console.log('checkeado', register);
    register.processed = true;
    if (e.target.checked) {
      console.log('check');
      this.registersToProcess.push(register);
    } else {
      console.log('uncheck');
      let i: number = 0;
      this.registersToProcess.forEach((item: Register) => {
        if (item.id == register.id) {
          register.processed = false;
          this.registersToProcess.splice(i, 1);
          return;
        }
        i++;
      });
    }

    console.log('seleccionadossdf sdfsdfsdf', this.registersToProcess);
  }
}
