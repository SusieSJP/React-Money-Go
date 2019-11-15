import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout} from '../actions/auth';

// this would show up on every single page
const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="head__content">
        <Link className="header__title" to="/dashboard"><h1>Money Go</h1></Link>
        <div className="header__content">
          <Link className="header__link" to="/setting"><span>Setting</span></Link>
          <button className="button button-noBg" onClick={ startLogout }>Log out</button>
        </div>
      </div>
    </div>

  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};
export default connect(undefined, mapDispatchToProps)(Header);
