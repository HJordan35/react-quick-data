import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';

export const TestForm = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  return (
    <form id="testForm">
      <Input title="First Name" name="firstName" value={firstName} handleChange={e => setFirstName(e.target.value)} />
      <Input title="Last Name" name="lastName" value={lastName} handleChange={e => setLastName(e.target.value)} />
      <Select title="Gender" name="gender" value={gender} handleChange={e => setGender(e.target.value)} options={['Male', 'Female']} />
      <TextArea title="Bio" name="bio" value={bio} handleChange={e => setBio(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
};

TestForm.propTypes = {};

export default TestForm;
