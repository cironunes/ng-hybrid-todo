import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { GET_TODOS, GET_TODOS_SUCCESS } from './todos.state';

@Injectable()
export class TodosEffects {

  constructor(
    private http: Http,
    private actions$: Actions
  ) {}

  @Effect() getTodos$ = this.actions$
    .ofType(GET_TODOS)
    .map(action => action.payload)
    .switchMap(payload => {
      if (payload.length) {
        return Promise.resolve({ type: GET_TODOS_SUCCESS, payload });
      } else {
        return this.http.get('data/todos.json')
          .map(res => ({ type: GET_TODOS_SUCCESS, payload: res.json() }));
      }
    });

  @Effect() filterTodos$ = this.actions$
    .ofType('FILTER_TODOS')
    .map(action => JSON.stringify(action.payload));
}