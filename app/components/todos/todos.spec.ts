import { todos, GET_TODOS } from './todos.state';

describe('Todos', () => {
  describe('todos reducer', () => {
    const initialState = [
      { id: 0, description: 'foo', done: false },
      { id: 1, description: 'bar', done: true }
    ];

    it('should return an empty array for state by default', () => {
      const result = todos(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    describe('GET_TODOS', () => {
      it('should return the state by default', () => {
        const result = todos(initialState, { type: 'GET_TODOS' });
        expect(result).toBe(initialState);
      });

      it('should return the given todos', () => {
        const result = todos(
          [],
          {
            type: 'GET_TODOS',
            payload: [{
              id: 0, description: 'another', done: true
            }]
          }
        );

        expect(result).toEqual(
          [{ id: 0, description: 'another', done: true }]
        );
      });

      it('should be immutable', () => {
        const initial = todos(initialState, { type: 'GET_TODOS' });
        
        const result = todos(
          [{ id: 0, description: 'another', done: true }],
          { type: 'GET_TODOS' }
        );

        expect(result).toEqual(
          [{ id: 0, description: 'another', done: true }]
        );
        expect(initial).toEqual(initialState);
      });
    });
  });
});
