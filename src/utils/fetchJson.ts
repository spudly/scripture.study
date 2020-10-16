import getCsrfToken from './getCsrfToken';

const fetchJson = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const method = init?.method ?? 'GET';
  const headers = new Headers(init?.headers);
  if (['POST', 'PUT', 'DELETE'].includes(method)) {
    headers.set('Content-Type', 'application/json');
    headers.set('CSRF-Token', getCsrfToken());
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(
      `fetchJson(${init?.method ?? 'GET'} ${input}): ${response.statusText}`,
    );
  }

  return response.json();
};

export default fetchJson;
