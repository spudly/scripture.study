import fetchJson from './fetchJson';

test('fetches json', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({it: 'works'}),
    ok: true,
    status: 200,
    statusText: 'Internal Server Error',
  });
  await expect(fetchJson('/test')).resolves.toStrictEqual({it: 'works'});
});

test('throws if non-ok status received', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({it: 'works'}),
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  });
  await expect(fetchJson('/test')).rejects.toThrow(
    'fetchJson(GET /test): Internal Server Error',
  );
});
