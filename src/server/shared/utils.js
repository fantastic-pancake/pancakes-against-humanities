/*
In place shuffle for the cards (or pancakes)
 */

export function shuffle(arr) {
	let counter = arr.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;

		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return arr;
 }