import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import colors from 'styles/colors';

const useStyles = createUseStyles({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: colors.background,
    overflow: 'none',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
});

const Container = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Container;
