// the state machine that keeps the state of certain part of the application
// it is possible to subscribe as many listeners as wanted to perform certain
// actions on state change
function StateMachine(inputProcessor) {
  // private machine state, not exposed publicly
  var state;
  // array of subscribed listeners
  var listeners = [];

  // the immutable machine state
  function getState() { return state; };

  // the only way to change the machine state
  // action parameter must contain type property
  // additionally it can contain any other arbitrary data needed for action
  // to be performed
  // example:
  // action = {
  //   type: 'REMOVE_TODO',
  //   id: 5 // the id of the todo being removed
  // }
  function dispatch(action) {
    // call state changing function
    // this function must take two arguments: state and action object
    state = inputProcessor(state, action);
    // notify all subscribed listeners
    listeners.forEach(function(listener) { listener(); });
  };

  // subscribe a new listener
  // if you want to unsubscribe, this function returns a function that can be
  // called to unsubscribe
  // example:
  // var sm = StateMachine(todosProcessor);
  // var unsubscriber = sm.subscribe(printState);
  // unsubscriber(); // unsubscribed!
  function subscribe(listener) {
    listeners.push(listener);
    return function() {
      listeners = listeners.filter(function(l) { l !== listener; });
    };
  };

  // dispatch a dummy action to get the initial state populated from inputProcessor
  dispatch({});

  // state machine public API
  // you can only call these three methods to interact with state machine
  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
};
