# Pancakes Against Humanity

## Motivation
A pancake twist of [Cards Against Humanity](https://www.cardsagainsthumanity.com/) where users can play one another remotely using pancake themed cards while interacting over live chat.

## How to play
- Navigate to (deploy link here) to play now
- Login through Facebook OAuth
- Join or create room
- See [Official Rules](http://s3.amazonaws.com/cah/CAH_Rules.pdf) for an in-depth explaination. The basic idea is to:
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
- HTML5/CSS3
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
  - `.on("action", <action>)` : triggers action in recipient
    - request made using `.emit("action" <action>)`
    - there are [server](https://github.com/fantastic-pancake/pancakes-against-humanities/blob/master/src/server/actions.js), [client](https://github.com/fantastic-pancake/pancakes-against-humanities/blob/master/src/client/actions.js) and [shared](https://github.com/fantastic-pancake/pancakes-against-humanities/blob/master/src/server/shared/actions.js) actions.
  - `.on("disconnect")` : deletes socket connection between client and server
    - request made using `.emit("disconnect")`
