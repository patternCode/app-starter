import { Component, h } from '@stencil/core';
import { Route, match } from 'stencil-router-v2';
import { authenticationStore } from '../store/authentication.store';
import { Router } from '../store/router.store';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {

  render() {
    return (
      <div>
        <o-header reduced={Router.activePath === '/login'}></o-header>

        <main>
          <Router.Switch>
            <Route path="/">
              <p-home></p-home>
            </Route>
            <Route path={/^\/login/}>
              <p-login></p-login>
            </Route>
            <Route path={/^\/register/}>
              <p-register></p-register>
            </Route>
            <Route
              path={match('/auth/verify-email/:email/:token')}
              render={({ email, token }) => (
                <p-auth-verify>
                  <p>email: {email}</p>
                  <p>token: {token}</p>
                </p-auth-verify>
              )}
            ></Route>
            <Route path={/^\/forgot-password/}>
              <p-forgot-password></p-forgot-password>
            </Route>
            <Route
              path={match('/auth/change-password/:email/:token')}
              render={({ email, token }) => (
                <p-change-password>
                  <p>email: {email}</p>
                  <p>token: {token}</p>
                </p-change-password>
              )}
            ></Route>
            <Route path={/^\/results/}>
              <app-results></app-results>
            </Route>

            {authenticationStore.access_token ? <Route path={match('/profile')} render={<p-profile></p-profile>} /> : <Route path={match('/profile')} to="/login" />}
          </Router.Switch>
        </main>
      </div>
    );
  }
}
