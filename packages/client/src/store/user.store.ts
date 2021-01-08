import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  id: null,
  firstname: null,
  lastname: null,
  email: null
});

onChange('id', value => {
  state.id = value;
});

onChange('firstname', value => {
  state.firstname = value;
});

onChange('lastname', value => {
  state.lastname = value;
});

onChange('email', value => {
  state.email = value;
});

export const userStore = state;
