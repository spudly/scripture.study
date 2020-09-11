const fetchJson = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`fetchJson(${args[0]}): ${response.statusText}`);
  }
  return response.json();
};

export default fetchJson;
