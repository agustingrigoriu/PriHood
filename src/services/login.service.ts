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

  postPushToken(token: string) {
    return this.api.post<any>('usuarios/push/token', { token });
  }

  private key: string = 'SessionPrihood';
  private _token: string = 'PushPrihood';

  saveSession(obj: Login): boolean {
    try {
      const json = JSON.stringify(obj);

      window.localStorage.setItem(this.key, json);

      return true;
    } catch (error) {
      return false;
    }
  }

  savePushToken(token: string): Boolean {
    try {
      window.localStorage.setItem(this._token, token);

      return true;
    } catch (error) {
      return false;
    }
  }

  getPushToken(): string {
    return window.localStorage.getItem(this._token) ||  '';
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