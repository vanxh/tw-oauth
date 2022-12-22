<h2 align="center">
<img width="50" src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter Logo">
<br>
tw-oauth
</h2>

**A library to quickly authenticate a user against the Twitter API using PIN based OAuth.**

## Installation

```bash
npm install twoauth
# or
yarn add twoauth
```

## Usage Example

```ts
import {TwoAuth} from 'twoauth';
import inquirer from "inquirer";
import open from "open";

const tw = new TwoAuth("API KEY", "API SECRET");

const {token, tokenSecret, authorizationUrl} = await tw.getAuthorizationUrl();
console.log("Please visit the following URL to authorize the app.");
console.log(authorizationUrl);
open(authorizationUrl);

const {pin} = await inquirer.prompt([{
  type: "number",
  name: "pin",
  message: "Paste the PIN here:",
  filter: (value) => (value >= 0 && value <= 9_999_999) ? value : Promise.reject(`Invalid PIN: ${value}`)
}]);

const {accessToken, accessTokenSecret} = await tw.getAccessToken(pin, token, tokenSecret);
console.log("Access Token:", accessToken);
console.log("Access Token Secret:", accessTokenSecret);

// Use the access token and access token secret to make API calls to Twitter API.
```

## License

MIT License

Copyright (c) 2022 Vanxh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
