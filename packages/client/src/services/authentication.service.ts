// packages/client/src/services/authentication.service.ts
import {
  IChangePasswordAuthenticationRequest,
  IForgotPasswordAuthenticationRequest,
  ILoginAuthenticationRequest,
  IVerifyEmailAuthenticationRequest,
  IRegisterAuthenticationRequest
} from 'shared/src/interfaces/authentication.interface';
import { authenticationStore } from '../store/authentication.store';
import { FetchUtil } from '../utils/fetch.util';

export class AuthenticationService {

  static async changePassword(body: IChangePasswordAuthenticationRequest) {
    return await FetchUtil.authentication(
      'change-password',
      'PUT',
      body
    );
  }

  static async forgotPassword(body: IForgotPasswordAuthenticationRequest) {
    return await FetchUtil.authentication(
      'forgot-password',
      'PUT',
      body
    );
  }

  static async login(body: ILoginAuthenticationRequest) {
    return await FetchUtil.authentication(
      'login',
      'POST',
      body
    );
  }

  static async verifyEmail(body: IVerifyEmailAuthenticationRequest) {
    return await FetchUtil.authentication(
      'verify-email',
      'PUT',
      body
    );
  }

  static async register(body: IRegisterAuthenticationRequest) {
    return await FetchUtil.authentication(
      'register',
      'POST',
      body
    );
  }

  static logout() {
    authenticationStore.access_token = null;
    return Promise.resolve();
  }

  static checkAuth() {
    return authenticationStore.access_token ? Promise.resolve() : Promise.reject();
  }

  static checkError(error) {
    const status = error.status;
    if (status === 401 || status === 403) {
      authenticationStore.access_token = null;
      return Promise.reject();
    }
    return Promise.resolve();
  }

  static getPermissions() {
    return authenticationStore.access_token ? Promise.resolve() : Promise.reject();
  }
}

