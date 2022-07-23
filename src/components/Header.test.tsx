/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import Header from './Header';

test('render header', () => {
  const {getByText, } = render(<Header />);

  getByText('Hacker News');
})