import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../register';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private registerService: RegisterService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  public onAddRegister(addForm: NgForm): void {
    if (addForm.value.name && addForm.value.lastname) {
      this.registerService.addRegister(addForm.value).subscribe(
        (response: Register) => {
          console.log(response);
          this._router.navigate(['registerManager']);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
}
