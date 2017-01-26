# Pancakes Against Humanity

### To Do:
- Allow to login through facebook from game room
- Write tests for all react components
- Display user profile image in game list, player list and chat
- Fix up the chat box so that chat messages scroll correctly
- Finalize CSS

## Motivation
A pancake twist of [Cards Against Humanity](https://www.cardsagainsthumanity.com/) where users can play one another remotely using pancake themed cards while interacting over live chat.

## How to play
Navigate to (deploy link here) to play now

Login through Facebook OAuth

Join or create room

See [Official Rules](http://s3.amazonaws.com/cah/CAH_Rules.pdf) for an in-depth explaination. The basic idea is to:
- Have each player draw ten white cards
- Select one player to be the Card Czar
- This person draws a black card, which contains a question or fill-in-the-blank phrase
- All other players select one of their white cards to answer the question or fill in the blank
  - Some black cards say "pick two", in which case all other players submit two white cards, specifying the order in which they are to be used
- The Card Czar displays all submitted cards, and chooses the white card containing the funniest response
- The user who submitted the chosen white card recieves one Awesome Point
- A new round begins
  - Another player becomes the Card Czar
  - Everyone draws white cards until they once again have ten.

## Tech
This application is built in React, using the RxJS library to create and subscribe to event streams. RxJS is also employed on the server, and the two are connected via Websockets. The enables application state to be managed as event streams, found as stores in React, and as models serverside.

Tech Used
- HTML5/CSS3
- Gulp/Webpack/Babel
- Jasmine
- React
- RxJS
- Node/Express
- Facebook OAuth2.0
- Websockets
- Mongo/Mongoose

## Develop
- Clone this repo, then navigate to the cloned folder on the command line, and run
  ```npm install```

- You will need to create a .env file containing facebook oauth application credentials and a database uri. The .env file will need:
 - ``DATABASE_URI``
 - ``FB_CLIENT_ID``
 - ``FB_CLIENTSECRET``
 - ``FB_CALLBACK_URL``

- Next, install gulp-cli globally if not already installed
  ```npm install -g gulp-cli```

- Run build and start development mode by running
  ```gulp build```, then
  ```gulp dev```

- To run unit tests

  - For server
    ```gulp server:test```

  - For client
    ```gulp client:test```

  - For both
     - Note: failing test in server will prevent client tests from running
    ```gulp test```


## API
- Websockets are used to allow real-time bidirectional communication between the client and server. This enables:
 - changes in game state made by one player to be instantly displayed to all other players.
 - real-time chat during the game.
- Websocket endpoints
  - `.on("connection")` : establishes socket connection between client and server
    - request made using `.emit("connection")`
  - `.on("disconnect")` : deletes socket connection between client and server
    - request made using `.emit("disconnect")`
  - `.on("action", <action>)` : triggers action in recipient
    - request made using `.emit("action" <action>)`
    - [shared actions] : (https://github.com/fantastic-pancake/pancakes-against-humanities/blob/master/src/server/shared/actions.js) include:
      - STATUS_REQUEST: logs request made
      - STATUS_FAIL: logs request failed
      - STATUS_SUCCESS: logs request succeeded
      - MERGE_VIEW: updates player view
      - VIEW_APP: ?
      - VIEW_LOBBY: display lobby?
      - VIEW_GAME: display game?
      - VIEW_PLAYER: display player?
      - USER_LOGIN: local user login
      - USER_DETAILS_SET: sets user information
      - LOBBY_SEND_MESSAGE: sends message in lobby chatroom
      - LOBBY_JOIN: joins lobby
      - GAME_CREATE: creates new game
      - GAME_JOIN: joins game of specified gameId
      - GAME_SET_OPTIONS: sets game options
      - GAME_START: starts game
      - GAME_SELECT_CARD: selects card by cardId in game of gameId
      - GAME_SELECT_STACK: selects deck version for game of gameId
      - GAME_SEND_MESSAGE: sends message in game chatroom
      - STEP_SETUP: initialize game step
      - STEP_CHOOSE_WHITES: wait for players to choose whitecards
      - STEP_JUDGE_STACKS: wait for card czar to select winner
      - STEP_WAIT: wait before next step in game
      - STEP_DISPOSED: marks game as ended
      - WAIT_GAME_OVER: display "game over", ends game
      - WAIT_ROUND_OVER: display "round over", ends round
      - WAIT_REASON_GAME_FINISHED: display "it ended"
      - WAIT_REASON_TOO_FEW_PLAYERS: display "there are too few players"
      - WAIT_REASON_CZAR_LEFT: display "the czar left"
      - WAIT_REASON_ROUND_FINISHED: display "it ended"
