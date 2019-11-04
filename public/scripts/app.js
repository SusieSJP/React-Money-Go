'use strict';

// JSX

var template = React.createElement(
  'p',
  null,
  'This works!!!'
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
