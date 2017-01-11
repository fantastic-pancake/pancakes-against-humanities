import _ from "lodash";

/*
	Server-side plan
	************
						actions         
	client/dispatcher  	------->  handlers/controllers ----> models
															<------ view diff
	Each individual player will have a "view". When an interaction occurs,
	the model will perform the interaction on itself and then generate a new copy
	of its own view. Then the model will compare its new view to its old view, and create
	a diff between the old and new view. Then it'll create a view diff.

	e.g "the messages array has one new item in it or the game round has gone from null to having
	all this information or this player was the card tzar and now he's not"

	The view diff will contain only the properties of the thing we're looking at such as a game
	or a player or the application and sends just the changes straight back through web socket
	and to the clients who are listening to that particular view.
 */

 /*
 	Here we create our functions for generating the view diff
 */

export const IS_UNCHANGED = Symbol("Is Unchanged");

export function makeDiff(before, after, location = "") {
	if (_.isArray(after)) {
		return makeDiffArray(before, after, location);
	}

	if (_.isObject(after)) {
		return makeDiffObject(before, after, location);
	}

	return makeDiffScalar(before, after, location);
}

export function makeDiffArray(before, after, location = "") {
	if (before !== null && !_.isArray(before)) {
		throw new Error(`${location}: you can't change the type of a value`);
	}

	if (before == null) {
		return after;
	}

	if (after.length == 0) {
		return (before && before.length)
			? {$splice: [0, before.length]}
			: IS_UNCHANGED;
	}

	if (!after[0].hasOwnProperty("id")) {
		let spliceBegin = -1;
		let spliceAdd = [];
		for (let i = 0; i < after.length; i++) {
			const item = after[i];
			if (i >= before.length) { // we've now gone through the after array
				if (spliceBegin == -1) { // if we haven't already started splicing, start splicing here
						spliceBegin = i;
					}

					spliceAdd.push(item);
					continue;
				}

				if (spliceBegin != -1) { // if we've started splicing already, then add it to spliceAdd array
					spliceAdd.push(item);
					continue;
				}

				// recursively invoke makeDiff to see if the item that we're looking at, at the index of the after array
				// is the same as the item that we're looking at in the instance of the before array
				const result = makeDiff(before[i], item, `.${location}[${i}]`); // recursively constructing a location string to help with debugging - consider removing for production
				if (result != IS_UNCHANGED) {
					if (spliceBegin == -1) {
						spliceBegin = i; // we found our change, begin splice
					}

					spliceAdd.push(item);
				}
			}
		

		let spliceCount = before.length - spliceBegin;
		if (spliceBegin == -1 && after.length < before.length) { // means items were removed if condition is true
			spliceBegin = after.length;
			// means we reached the end of looping over our after items, and we didn't find any changes, but the after array is smaller than before array
			// we now have to chop off the end of that before array
			spliceCount = before.length - after.length; 
		}

		return spliceBegin == -1 // if spliceBegin is -1 at this point, then it's completely unchanged
			? IS_UNCHANGED
			: {$splice: [spliceBegin, spliceCount, ...spliceAdd]}; // start splicing at spliceBegin, delete this many items with spliceCount, and then add these items in spliceAdd
	
	// if we do have complex arrays
	} else {
		let itemsBefore = before == null 
			? {}
			// loop through all the items in the before array and creates a new object 
			// called itemsBefore that will contain all of the id's with the items
			// [{id: 1}, text: "whoa"] ---> {1: {id: 1, text: "whoa"}}
			: before.reduce((obj, item) => { 
				obj[item.id] = item;
				return obj;
			}, {});

		const idOrder = [];
		const mutatedItems = {};
		let mutatedCount = 0;
		let sameCount = 0; 

		for (let i = 0; i < after.length; i++) {
			let itemAfter = after[i];
			idOrder.push(itemAfter.id); // keeping track of the id order of all the after array items

			if (before != null && i < before.length && before[i].id == itemAfter.id) {
				sameCount++ // the order of the item didn't change
			}
	
			let itemBefore = itemsBefore[itemAfter.id];

			const result = makeDiff(itemBefore, itemAfter, `.${location}[${i}]`);

			if (result == IS_UNCHANGED) {
				continue;
			} 

			// delete the id key out of the result
			delete result.id;
			mutatedItems[itemAfter.id] = result;
			mutatedCount++;
		}

		if (sameCount == after.length && mutatedCount == 0 && before.length == after.length) {
			// basically if nothing changed
			return IS_UNCHANGED;
		}

		// if items were mutated - but didn't change order - same id
		return sameCount == after.length && before.length == after.length
			? {$update: mutatedItems}
			: {$update: mutatedItems, ids: idOrder};
	}
}

export function makeDiffObject(before, after, location = "") {
	if (before !== null && !_.isObject(before)) {
		throw new Error(`${location}: you can't change the type of a value`);
	}

	const seen = {};
	let obj = {};
	let changed = null; // keeps track if we've changed a value at any point

	for (let key in after) {
		if (!after.hasOwnProperty(key)) {
			continue;
		}

		seen[key] = true;
		const value = after[key];

		if (before == null || !before.hasOwnProperty(key)) {
			obj[key] = value;
			changed = true; 
		} else {
			// if before is not null, or it has own property, then we have to compare old property to new property recursively
			const result = makeDiff(before[key], value, `${location}.${key}`); // diff the two values
			if (result != IS_UNCHANGED) {
				obj[key] = result;
				changed = true;
			}
		}
	}

	if (before != null) {
		for (let key in before) {
			if (!before.hasOwnProperty(key) || seen[key]) {
				continue;
			}

			changed = true;
			obj[key] = {$remove: true};
		}
	}

	return changed ? obj : IS_UNCHANGED; // if changed, then go ahead and return our obj - which is our diff
}

export function makeDiffScalar(before, after) {
	return before !== after ? after : IS_UNCHANGED;
}

export function mergeDiff(base, diff, location = "") {
	if (diff == null) 
		return null;
	

	if (diff.hasOwnProperty("$remove")) 
		return undefined;
	

	if (diff.hasOwnProperty("$set")) 
		return diff.$set; //shortcut the entire merging algorithm and just set whatever it says to set to this property or value
	

	if (diff.hasOwnProperty("$splice")) {
		const arr = base.slice(); // copy the array
		arr.splice(...diff.$splice); // splice operation returns the arguments needed to be passed into diff itself
		return arr;
	}

	if (diff.hasOwnProperty("$update")) {
		const updateItems = diff.$update;
		const idOrder = diff.ids;

		if (idOrder) {
			const result = new Array(idOrder.length); // making a new array and prefilling it with the x amount of items where x amount of items is the id order
			
			// take all of the old items and were turning it in to an object where their ids are the keys to everything
			const oldItems = !base
				? {}
				: base.reduce((obj, item) => {
					obj[item.id] = item;
					return obj;
				}, {});

			for (let i = 0; i < idOrder.length; i++) {
				const id = idOrder[i];

				// if this item was not updated, then go ahead and copy out the old items at id into the result at i
				// this handles reordering items that haven't changed
				if (!updateItems.hasOwnProperty(id)) {
					result[i] = oldItems[id];
					continue;
				}

				// if there was a change, so now we have to recursively merge that object from the update object into our old object,
				// and then we have to set that on the result
				const newItem = mergeDiff(oldItems[id], updateItems[id]);
				newItem.id = id; // because the id property is chopped off
				result[i] = newItem;
			}

			return result;
		} else {
			// if there's no id order meaning there was no reordering of the elements in the array
			// so we construct a new array, loop through the old items
			// and then check to seeif any of those items were updated
			// if they were, merge them
			// if they weren't, just return the old item
			const result = new Array(base.length);

			for (let i = 0; i < base.length; i++) {
				const item = base[i];
				result[i] = updateItems.hasOwnProperty(item.id)
					? mergeDiff(base[i], updateItems[item.id])
					: base[i];
			}

			return result;
		}
	}

	if (_.isArray(diff)) {
		return diff;
	}

	if (_.isObject(diff)) {
		if (base != null && !_.isObject(base)) {
			throw new Error(`${location}: you can't change the type of a value`);
		}

		// if the base is null, then just replace it with whatever value came from diff
		if (!base) {
			return diff;
		}

		const copy = {...base};

		// recursively loop over the object hierarchy and merging the diff on every matching key
		for (let key in diff) {
			if (!diff.hasOwnProperty(key)) {
				continue;
			}

			const value = diff[key];
			const result = mergeDiff(copy[key], value, `${location}.${key}`);

			// if it encountered a $remove
			if (typeof(result) == "undefined") {
				delete copy[key];
			} else {
				copy[key] = result;
			}
		}

		return copy;
	}

	// if we made it all the way down here
	// merge the scalars - if it's just a number or a string, just return the diff - replace whatever was the old value with the new value
	return diff;
}















