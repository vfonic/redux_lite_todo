$(document).ready(function() {
  var todosMachine = StateMachine(todosReducer);

  function addTodo() {
    var $todoInput = $('#todoInput');
    var todoTitle = $todoInput.val();

    // reset todo input value
    $todoInput.val('');

    // dispatch add new todo action
    todosMachine.dispatch({
      type: 'ADD_TODO',
      payload: todoTitle
    });
  };

  function toggleTodo() {
    var $todoNode = $(this);
    var todoId = $todoNode.data('id');

    todosMachine.dispatch({
      type: 'TOGGLE_TODO',
      payload: todoId
    });
  };


  var $todoButton = $('#addTodoButton');
  $todoButton.click(addTodo);


  function render() {
    var todos = todosMachine.getState();

    var $todosContainer = $('#todos');
    $todosContainer.empty();

    todos.forEach(function(todo) {
      var $todoNode = $('<li>');
      $todoNode.text(todo.title);
      $todoNode.data('id', todo.id);
      $todoNode.toggleClass('is-completed', todo.completed);

      $todoNode.click(toggleTodo);

      $todosContainer.append($todoNode);
    });
  }

  todosMachine.subscribe(render);
  // initial render
  render();
});
