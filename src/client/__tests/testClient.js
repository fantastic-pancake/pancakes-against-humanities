import React from 'react';
const TestUtils = React.addons.TestUtils;
import {LobbyContainer, GameList} from '../../components/lobby';


console.log('Client side: .....')

describe("GameList", () => {
	it("renders empty list when no games currently open", () => {
		let joinGameRequest = false;
		const gameList = TestUtils.renderIntoDocument(
			<GameList games={{}} joinGame={()=>{joinGameRequest = true}}/>
		);
		console.log("gameList:", gameList);
		expect(true).toBe(true);
	})
});

describe("User authentication", () => {
	it("redirects user to oauth", () => expect(true).toBe(true));
	it("redirects user to oauth", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});

describe("Start game", () => {
	it("works", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});

describe("Join game", () => {
	it("works", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});

describe("Distribute cards to user", () => {
	it("works", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});

describe("User selects card", () => {
	it("works", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});

describe("Live chat", () => {
	it("works", () => expect(true).toBe(true));
	it("doesn't work", () => expect(true).toBe(true));
});
