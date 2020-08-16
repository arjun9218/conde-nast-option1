# conde-nast-option1
This is a solution for the option 1 in the se-test.

## Project Structure
There are two main folders in this project namely `news-client` which is the client side project and `news-server` which is the server side project.
There is alos one more folder `test-automation` which consists of cypress tests for this project.
The `build.sh` file is a shell script which bundles the client project and copies the bundled and built folder to the server's `public` directory.

### Server framework
Server code is written in `Node JS`. It uses `express` dependency for exposing REST APIs.
The server context path is pointed to `public/build` folder which is where the bundled client code resides.
The server code has following components:
 - config
 - lib
 - server.js

The `config` is where all the server configurations and some of the required `NewsAPI` configurations resides.
The `lib` is where all the actions happen. The `router.js` file has all the REST APIs exposed by the server along with the mapping to the respective functions.

### Client framework
Client code is written using `React JS` with FLUX framework.
It has a `store` which the entire application is subscribed to. Any changes made to the store will be updated throughout the application. This is similar to `Redux`.

Majority of the components and styles are from React's `material-ui`. Here's a link for reference: https://material-ui.com/
Custom theme is applied on `material-ui` components.

## How to run the application

### `git clone https://github.com/arjun9218/conde-nast-option1.git`

Once you've cloned the project, navigate to project root directory.
`cd conde-nast-option1`

Now run `sh build.sh`

Once the build is successful, navigate to news-server folder.
`cd news-server`

Start the server by `node server.js`

In the browser open http://localhost:2020/news

## How to run tests

### To run tests with cypress test runner
Once the server is started, open another terminal or git bash and navigate to `test-automation` folder.

Run `npm install`
Then run `npm test`

This will launch the Cypress test runner.

### To run headless tests

Run `npm install`
Then run `npm run test-ec`