import { Injectable } from '@angular/core';
import { ApiRequestService } from './api.request.service';
import { Usuario } from '../app/models/usuario.model';
import { Login } from '../app/models/login.model';

@Injectable()
export class LoginService {
  constructor(private api: ApiRequestService) { }

  postUserCredentials(usuario: Usuario) {
    return this.api.post<Login>('token', usuario);
  }

  private key: string = 'SessionPrihood';

  saveSession(obj: Login): boolean {
    try {
      const json = JSON.stringify(obj);

      window.localStorage.setItem(this.key, json);

      return true;
    } catch (error) {
      return false;
    }
  }

  getSession(): Login {
    try {
      const json = window.localStorage.getItem(this.key);

      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  }

  clearSession(): boolean {
    try {
      window.localStorage.removeItem(this.key);

      return true;
    } catch (error) {
      return false;
    }
  }
}  