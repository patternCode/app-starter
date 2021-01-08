import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  access_token: localStorage.getItem('access_token') || null,
  access_token_iat: null,
  access_token_exp: null,
  refresh_token: null,
  refresh_token_iat: null,
  refresh_token_exp: null,
});

onChange('access_token', value => {
  state.access_token = value;
});

onChange('access_token_iat', value => {
  state.access_token_iat = value;
});

onChange('access_token_exp', value => {
  state.access_token_exp = value;
});

onChange('access_token', value => {
  state.access_token = value;
});

onChange('refresh_token', value => {
  localStorage.setItem('refresh_token', value);
  state.refresh_token = value;
});

export const authenticationStore = state;
