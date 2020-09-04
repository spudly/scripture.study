const getCsrfToken = () => {
  const token = document
    .querySelector('meta[name="CSRF-Token"]')
    ?.getAttribute('content');

  if (!token) {
    throw new Error('Missing CSRF Token');
  }

  return token;
};

export default getCsrfToken;
