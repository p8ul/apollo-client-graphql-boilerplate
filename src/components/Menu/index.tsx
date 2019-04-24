import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

interface Imenu {
    sidebarOpen: boolean;
    toggleSidebar: (arg: boolean) => any;
    goBack: () => any;
    pathname: string;
}
const MainMenu = ({ sidebarOpen, toggleSidebar, goBack, pathname }: Imenu) => {
  return (
    <div className="ui mobile mn only">
      <div className="back ui hidden">
        {pathname !== '/' && (
          <Icon
            name="arrow left"
            className="item hidden"
            size="big"
            onClick={() => goBack()}
          />
        )}
      </div>
      <a href="/" className="logo item">
        APOLLO
      </a>
      <div >
        <svg
          className={sidebarOpen ? 'bars active' : 'bars'}
          viewBox="0 0 100 100"
          onClick={() => toggleSidebar(sidebarOpen)}
        >
          <path
            className="line top"
            d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
          />
          <path
            className="line middle"
            d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
          />
          <path
            className="line bottom"
            d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
          />
        </svg>
      </div>
    </div>
  );
};

MainMenu.propTypes = {
  sidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  goBack: PropTypes.func,
  pathname: PropTypes.string,
};
MainMenu.defaultProps = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  goBack: () => {},
  pathname: '',
};
export default MainMenu;
