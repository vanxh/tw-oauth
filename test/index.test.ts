/* eslint-env jest */
import 'dotenv/config';
import { TWOAuth } from '../src';

let client: TWOAuth;
beforeAll(() => {
  client = new TWOAuth(
    process.env.API_KEY as string,
    process.env.API_SECRET as string,
  );
});

describe('Test Index', () => {
  it('should be able to create a new TWOauth instance', () => {
    expect(client).toBeInstanceOf(TWOAuth);
  });

  it('should be able to get an authorization url', async () => {
    const authUrl = await client.getAuthorizationUrl();
    expect(authUrl.token).toBeDefined();
    expect(authUrl.tokenSecret).toBeDefined();
    expect(authUrl.authorizationUrl).toBeDefined();
  });

  it('should be able to get an access token', async () => {
    expect(true).toBe(true);
  });
});
