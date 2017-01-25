import * as angular from 'angular';

class AppComponent { }

export const appComponent  = {
  template: `
    <h1>What to do?</h1>

    <div ui-view></div>
  `,
  controller: AppComponent
};
