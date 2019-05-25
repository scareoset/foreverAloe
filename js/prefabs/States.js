// sdapted from Nathan's state machine code
// used for player states
"use strict";

var States = function(stateList, receiver) {
  this.stateList = stateList;     // JSON obj w/ all states
  this.receiver = receiver;       // obj that "receives" the states
  this.initialState = undefined;  // obj's initial state
  this.indices = {};              // array used for fast lookup of events/states

  // inititalize indices & find the intitial states
  for(var i = 0; i < stateList.length; i++) {
    this.indices[this.stateList[i].name] = i;
    if(this.stateList[i].initial) {
      this.initialState = this.stateList[i];
    }
  }

  // warn if no initial state
  if(!this.initialState) {
    console.warn("State Machine has no initial state!");
  }

  // set current state to initial state
  this.currentState = this.initialState;
};

States.prototype = {
  // consume an event (e) and cause a new state to be entered
  consumeEvent: function(e) {
    if(this.currentState.events[e]) {
      this.currentState = this.stateList[this.indices[this.currentState.events[e]]];
    } else {
      console.warn("State Machine called with invalid event: '" + e + "' for current state: '" + this.currentState.name + "'.");
    }
  },
  // retrieve the name of the current state
  getState: function() {
    return this.currentState;
  },
  // reset the state machine to its intitial state
  reset: function() {
    this.currentState = this.initialState;
  }
}
