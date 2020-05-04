# Unmind technical test
Had a great time doing this test, its on the large side in terms of test but the app components requested are fun to work on.

## Overview of Approach
- Created a bunch of reusable functional components based upon the design breif given.
- Tried to focus more on front end work the server api, since i believe the best approach here is to use json-server and not right larger express router, writing data to json is good enough for demo.
- Wanted to make sure user experience was enjoyable since the breif of the app was about `mood` so didnt want the app interface to look displeasing.
- Used axios to make requests, taking advatage of lifecycle hooks to load data when component mounted for insights screen.
- Decided not to use redux for app as it felt abit overkill and I havent spent a great deal of time with redux.
- Made some headway in testing but due to tight time constraint didnt fully scope this.
- Not used svg to much before but found it so satisfying when got the mood face to work.
- Tried to seperate out components into individual folders to make directory structure more readable and easier to navigate.
- Tried to avoid using component libaries and build most of the components 

## Netx Steps / Trade Offs
- Tried to give coverage to most things, slightly better state managment could be achieved with scope to expanding to redux as application grows. Better naviagtion and handling of errors and feedback to user of them could be made using an error modal/overlay component etc. More testing with larger coverage is need for sure less was performed as had tight timeframe in which to build the app.

- As for server larger express server could be made with more routres and controllers as app grows, storing of data into database as well should be done. Also authorization and authentication logic to protect data leakage as data being sotred is somewhat sensitive.

## Server

### Endpoints

### `GET /checkin/1`

- `Array` of users previous mood check in's

Each available check in is an object which contains

- `id`: `Int` the check in id
- `userId`: `Int` The users ID this is hardcoded in the demo
- `mood`: `Int` mood of user between 1 - 7
- `feelings`: ``Array` of `String` of the feelings users was experiencing
- `comment`: `String` an optional comment about users check in
- `createdAt`: `Date ISO 8601` the time of the check in

### `POST /checkin`

Expects an object in the request's body with the following information:

- `userId`: `Int` The users ID this is hardcoded in the demo
- `mood`: `Int` mood of user between 1 - 7
- `feelings`: ``Array` of `String` of the feelings users was experiencing
- `comment`: `String` an optional comment about users check in _comment_: not required, can be null.

The endpoint responds with a 200 status on success.

## Setup

Run install in root dir

```
npm install
```

Then change directory to run install for React frontend client

```
cd src/client && npm install
```

Next run build command for frontend

```
cd src/client && npm run build
```

Finally from root direectory run both the app and the server

```
npm run start
```

