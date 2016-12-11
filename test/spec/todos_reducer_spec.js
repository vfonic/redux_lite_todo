describe('todosReducer', function() {
  var todosMachine;

  beforeEach(function() {
    todosMachine = StateMachine(todosReducer);
  });

  it('sets the correct initial state', function() {
    expect(todosMachine.getState()).toEqual([]);
  });

  it('adds a new todo', function() {
    todosMachine.dispatch({
      type: 'ADD_TODO',
      payload: 'Write a third test'
    });

    var expectedState = [{
      id: jasmine.anything(),
      title: 'Write a third test',
      completed: false
    }];
    expect(todosMachine.getState()).toEqual(expectedState);
  });

  it('marks todo as completed', function() {
    // ARRANGE
    todosMachine.dispatch({
      type: 'ADD_TODO',
      payload: 'Write a todo uncompleted test'
    });
    var todo = todosMachine.getState()[0];

    // ACT
    todosMachine.dispatch({
      type: 'TOGGLE_TODO',
      payload: todo.id
    });

    // ASSERT
    var expectedState = [{
      id: todo.id,
      title: todo.title,
      completed: true
    }];
    expect(todosMachine.getState()).toEqual(expectedState);
  });

  it('marks the completed todo as uncompleted', function() {
    // ARRANGE
    todosMachine.dispatch({
      type: 'ADD_TODO',
      payload: 'Finish the blog post'
    });
    var todo = todosMachine.getState()[0];
    todosMachine.dispatch({
      type: 'TOGGLE_TODO',
      payload: todo.id
    });

    // ACT
    todosMachine.dispatch({
      type: 'TOGGLE_TODO',
      payload: todo.id
    });

    // ASSERT
    var expectedState = [{
      id: todo.id,
      title: todo.title,
      completed: false
    }];
    expect(todosMachine.getState()).toEqual(expectedState);
  });

  it('does not change the state for unknown action', function() {
    var beforeState = todosMachine.getState();

    todosMachine.dispatch({
      type: 'SORT_TODOS'
    });

    var afterState = todosMachine.getState();
    expect(afterState).toEqual(beforeState);
  });
});
