import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { APP_BASE_HREF } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { HomeModule } from './home/home.module';
import { TodoEditModule } from './todo-edit/todo-edit.module';

import { TodosEffects } from './components/todos/todos.effects';

import { todos, todo, todosFilter } from './components/todos/todos.state';

const rootReducer = { todos, todo, todosFilter };

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,

    HomeModule,
    TodoEditModule,
    
    AppRoutingModule,
    RouterModule.forRoot([], {
      initialNavigation: true
    }),

    EffectsModule.run(TodosEffects),
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
 ],
 bootstrap: [ AppComponent ]
})
export class AppModule {

}
