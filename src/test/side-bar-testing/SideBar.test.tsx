import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SideBar } from '../../components/home-side-bar/SideBar';

test('Home button routes user to home page', () => {
  const closeSideBar = jest.fn();

  render(
    <MemoryRouter>
      <SideBar closeSideBar={closeSideBar} />
    </MemoryRouter>
  );

  const homeButton = screen.getByTestId('homeButton');

  expect(homeButton).toBeInTheDocument();

  fireEvent.click(homeButton);

  expect(window.location.pathname).toBe('/');
});
