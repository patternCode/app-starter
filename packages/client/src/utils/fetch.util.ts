// packages/client/src/utils/fetch.util.ts
import jwt_decode from 'jwt-decode';
import {
  IChangePasswordAuthenticationRequest,
  IForgotPasswordAuthenticationRequest,
  ILoginAuthenticationRequest,
  IVerifyEmailAuthenticationRequest,
  IRegisterAuthenticationRequest
} from 'shared/src/interfaces/authentication.interface';
import { authenticationStore } from '../store/authentication.store';
import { userStore } from '../store/user.store';

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';
type TBody = IChangePasswordAuthenticationRequest
  | IForgotPasswordAuthenticationRequest
  | ILoginAuthenticationRequest
  | IVerifyEmailAuthenticationRequest
  | IRegisterAuthenticationRequest;

export class FetchUtil {
  private static apiUrl: string = 'http://localhost:3001/api/authentication';

  static async authentication(endpoint: string, method: TMethod, body: TBody) {
    const request = new Request(`${FetchUtil.apiUrl}/${endpoint}`, {
      method: method,
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body),
    });

    return await fetch(request)
        .then((response) => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }

            const accessToken = response.headers.get('Authorization');

            if (accessToken) {
              const decodedAccessToken: any = jwt_decode(accessToken);
              authenticationStore.access_token = accessToken;
              authenticationStore.access_token_iat = decodedAccessToken?.iat;
              authenticationStore.access_token_exp = decodedAccessToken?.exp;
              userStore.id = decodedAccessToken?.id;
              userStore.firstname = decodedAccessToken?.firstname;
              userStore.lastname = decodedAccessToken?.lastname;
              userStore.email = decodedAccessToken?.email;
            }

            return response.json();
        })
        .catch((_error) => {
          return {
            status: 500,
            error: 'Internal Server Error'
          }
        });
  }
}
