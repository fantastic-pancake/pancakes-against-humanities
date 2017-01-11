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
- React/Redux
- Node/Express
- Websockets

## Develop
- Clone this repo, then navigate to the cloned folder on the command line, and run

  ```npm install```

- Next, install gulp-cli globally if not already installed

  ```npm install -g gulp-cli```

- Run build and start development mode by running

  ```gulp build```

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
- Coming soon...
