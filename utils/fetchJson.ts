const fetchJson = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  fetch(...args).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });

export default fetchJson;
