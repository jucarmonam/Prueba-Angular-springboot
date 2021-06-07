import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from './register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getRegisters(): Observable<Register[]> {
    return this.http.get<Register[]>(`${this.apiServerUrl}/register/all`);
  }

  public addRegister(register: Register): Observable<Register> {
    return this.http.post<Register>(
      `${this.apiServerUrl}/register/add`,
      register
    );
  }

  public processRegister(register: Register): Observable<Register> {
    return this.http.put<Register>(
      `${this.apiServerUrl}/register/update`,
      register
    );
  }
}
