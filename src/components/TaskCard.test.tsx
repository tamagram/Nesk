import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TaskCard from './TaskCard';

afterEach(cleanup);

test('should generate a snapshot for `TaskCard` component', () => {
  const asFragment = render(<TaskCard />);
  expect(asFragment).toMatchSnapshot();
});
