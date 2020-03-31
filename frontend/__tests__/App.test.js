import App from '../src/App';

/**
 * Simple test for checking if App structure is still the same
 */
it('testing App with Jest snapshot testing', () => {
  const renderedApp = App();
  expect(renderedApp).toMatchSnapshot();
});
