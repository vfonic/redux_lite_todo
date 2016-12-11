var nextTodoId = 1;

function todosReducer(state, action) {
  // the initial state
  if (typeof state === 'undefined') {
    state = [];
    return state;
  }

  switch (action.type) {
    case 'ADD_TODO':
      // action.payload is the new todo's title
      var todo = {
        id: nextTodoId++,
        title: action.payload,
        completed: false
      };
      var newState = state.concat([ todo ]);
      return newState;
    case 'TOGGLE_TODO':
      var newState = state.map(function(todo) {
        // action.payload is the todo's id
        if (todo.id === action.payload) {
          var newTodo = Object.assign({}, todo, {
            completed: !todo.completed
          });
          return newTodo;
        }
        return todo;
      });
      return newState;
    default:
      return state;
  }
}
