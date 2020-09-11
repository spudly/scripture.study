import fetchJson from './fetchJson';

test('fetches json', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'Internal Server Error',
    json: jest.fn().mockResolvedValue({it: 'works'}),
  });
  await expect(fetchJson('/test')).resolves.toStrictEqual({it: 'works'});
});

test('throws if non-ok status received', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
    json: jest.fn().mockResolvedValue({it: 'works'}),
  });
  await expect(fetchJson('/test')).rejects.toThrow(
    'fetchJson(/test): Internal Server Error',
  );
});
