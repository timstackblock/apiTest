# apiTest
apiTest is a node script for testing transactions on micro block api and anchor block api.

### Prerequisites

- npm installed and Node v16.*
- Stacks CLI on your machine [@stacks/cli](https://www.npmjs.com/package/@stacks/cli)
- environment file that is stored on the root of the project

### Run script
1. Go to the root of the project and do `npm install`. Make sure you have satisfied the above Prerequisites.
2. Run all the test script:
    ```sh
    $ npm run test
    ```
3. Run the script for anchor block testing:
    ```sh
    $ npm run triggerAnchorBlockTests
    ```
4. Run the script for deploy test contract:
   ```sh
   $ npm run triggerDeployTestContract
   ```
5. Run the script for testing APIs for 404:
  ```sh
  $ npm run api404Test
  ```
