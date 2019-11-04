import React from 'react';
import { Link } from 'react-router-dom';

// using the anchor tag would lead to the whole page refresh -- communicate with server
// 404 - <a href="/">Go Home</a>
// using Link, JS just swap the content and re-render
const NotFoundPage = () => (
  <div>
    404 - <Link to="/">Go Home</Link>
  </div>
);

export default NotFoundPage;
