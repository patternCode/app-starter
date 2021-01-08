import { Component, Prop, State, h, Host } from '@stencil/core';
import { userStore } from '../../../store/user.store';

@Component({
  tag: 'p-profile',
  styleUrl: 'p-profile.css',
})
export class PProfile {
  @State() state = false;

  @Prop() name: string;

  formattedName(): string {
    const name = this.name;
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
    }
    return '-';
  }

  render() {
    return (
      <Host>
        <c-grid class="section">
        Profile: {this.formattedName()}
        User: {userStore.firstname} {userStore.lastname}
        User Id: {userStore.id}
        Email: {userStore.email}

        <p>
          My name is {this.formattedName()}. My name was passed in through jwt access token!
        </p>
        </c-grid>
        <c-grid class="aside">
          Aside
        </c-grid>
      </Host>
    )
  }
}
