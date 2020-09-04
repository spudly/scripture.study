import getCsrfToken from './getCsrfToken';

afterEach(() => {
  document.querySelectorAll('meta[name="CSRF-Token"]').forEach((el) => {
    el.remove();
  });
});

test('gets the content of the CSRF-Token meta tag', () => {
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'CSRF-Token');
  meta.setAttribute('content', 'Dude!');
  document.head.appendChild(meta);

  expect(getCsrfToken()).toBe('Dude!');
});

test('throws if CSRF token is not found', () => {
  expect(getCsrfToken).toThrow('Missing CSRF Token');
});
