import { Component } from '@angular/core';

@Component({
  selector: 'h-app',
  template: `
    <h1>What to do?</h1>

    <div ui-view></div>
  `,
})
class AppComponent { }

export const appComponent  = {
  template: `
    <h1>What to do?</h1>

    <div ui-view></div>
  `,
  controller: AppComponent
};
