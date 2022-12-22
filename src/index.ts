import { OAuth } from 'oauth';

/**
 * Twitter OAuth
 */
// eslint-disable-next-line import/prefer-default-export
export class TWOAuth {
  /**
   * Twitter API base URL
   * @type {string}
   * @default https://api.twitter.com
   */
  public baseUrl: string;

  /**
   * OAuth 1.0a Request Token URL
   * @type {string}
   * @default https://api.twitter.com/oauth/request_token
   */
  public oauth1RequestTokenUrl: string;

  /**
   * OAuth 1.0a Access Token URL
   * @type {string}
   * @default https://api.twitter.com/oauth/access_token
   */
  public oauth1AccessTokenUrl: string;

  /**
   * OAuth 1.0a Authorize URL
   * @type {string}
   * @default https://api.twitter.com/oauth/authorize
   */
  public oauth1AuthorizeUrl: string;

  /**
   * OAuth version
   * @type {string}
   * @default 1.0
   */
  public oauthVersion: string;

  /**
   * OAuth Signature Method
   * @type {string}
   * @default HMAC-SHA1
   */
  public oauthSignatureMethod;

  /**
   * Twitter API Consumer Key
   * @type {string}
   */
  public consumerKey: string;

  /**
   * Twitter API Consumer Secret
   * @type {string}
   */
  public consumerSecret: string;

  /**
   * OAuth handler
   * @type {OAuth}
   * @private
   */
  private oauth: OAuth;

  /**
   * Twitter OAuth constructor
   * @param {string} consumerKey Twitter API Consumer Key
   * @param {string} consumerSecret Twitter API Consumer Secret
   * @param {string} baseUrl Twitter API base URL
   * @param {string} oauthVersion OAuth version
   * @param {string} oauthSignatureMethod OAuth Signature Method
   */
  constructor(consumerKey: string, consumerSecret: string, baseUrl: string = 'https://api.twitter.com', oauthVersion: string = '1.0', oauthSignatureMethod: string = 'HMAC-SHA1') {
    this.baseUrl = baseUrl;
    this.oauth1RequestTokenUrl = `${baseUrl}/oauth/request_token`;
    this.oauth1AccessTokenUrl = `${baseUrl}/oauth/access_token`;
    this.oauth1AuthorizeUrl = `${baseUrl}/oauth/authorize`;

    this.oauthVersion = oauthVersion;

    this.oauthSignatureMethod = oauthSignatureMethod;

    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;

    this.oauth = new OAuth(
      this.oauth1RequestTokenUrl,
      this.oauth1AccessTokenUrl,
      this.consumerKey,
      this.consumerSecret,
      this.oauthVersion,
      'oob',
      this.oauthSignatureMethod,
    );
  }

  /**
   * Get Twitter Authorization URL
   * @returns {Promise<string>} Twitter Authorization URL
   * @example
   * const res = await client.getAuthorizationUrl();
   * console.log(res.authorizationUrl); // https://api.twitter.com/oauth/authorize?oauth_token=...
   */
  public async getAuthorizationUrl(): Promise<{
    token: string;
    tokenSecret: string;
    authorizationUrl: string;
  }> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthRequestToken((error, token, tokenSecret) => {
        if (error) {
          reject(error);
        }

        resolve({
          token,
          tokenSecret,
          authorizationUrl: `${this.oauth1AuthorizeUrl}?oauth_token=${token}`,
        });
      },
      );
    });
  }

  /**
   * Get Twitter Access Token
   * @param pin PIN code you get from Authorization URL ({@link getAuthorizationUrl}) after user authorized your app
   * @param token Twitter OAuth Request Token you get from {@link getAuthorizationUrl}
   * @param tokenSecret Twitter OAuth Request Token Secret you get from {@link getAuthorizationUrl}
   */
  public async getAccessToken(pin: string, token: string, tokenSecret: string): Promise<{
    accessToken: string;
    accessTokenSecret: string;
  }> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthAccessToken(
        token,
        tokenSecret,
        pin,
        (error, accessToken, accessTokenSecret) => {
          if (error) {
            reject(error);
          }

          resolve({
            accessToken,
            accessTokenSecret,
          });
        });
    });
  }
}
