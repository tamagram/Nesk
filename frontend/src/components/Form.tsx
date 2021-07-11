import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Form = () => {
  return (
    <StyledForm>
      <TextField label="title" />
      <TextField
        label="details"
        multiline
        variant="outlined"
        rows={3}
      />
      <Button type="submit" variant="contained">stack</Button>
    </StyledForm>
  );
};

export default Form;