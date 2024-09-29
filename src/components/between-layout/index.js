import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function BetweenLayout({children}) {
  const cn = bem('BetweenLayout');
  return (
    <div className={cn()}>
         {children}
    </div>
  );
}

BetweenLayout.propTypes = {
  children: PropTypes.node,
 
}


export default BetweenLayout;
