import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react'

export const Inpu = ({ ...props }) => {
  const { onChange, className, label, errors, ...rest } = props;
  return (
    <div className="field">
      {/* eslint-disable-next-line */}
      <label>{label}</label>
      <Input fluid iconPosition='left' {...rest} className={className} onChange={onChange} required />
      
      {errors && <div className="ui pointing red basic label">{errors}</div>}
      <br />
    </div>
  );
};

Inpu.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  errors: PropTypes.string,
  label: PropTypes.string,
};

Inpu.defaultProps = {
  onChange: () => {},
  className: '',
  errors: '',
  label: '',
};

export default Inpu;