# DevJobSearchApp
This is a Node.js web application that helps software developers find jobs 

# setup locally
This app requires redis in-memory database.
To install Redis on Mac:
brew install redis
Start Redis on Mac:
brew services start redis

Install the npm dependencies:
Under DevJobSearchApp folder, run:
npm install
then:
cd client
npm install

# run the app locally
Start the Application:
Go back to DevJobSearchApp folder, run:
node worker/index.js
node api/index.js
cd client
npm start

Then, in browser enter http://localhost:3000

