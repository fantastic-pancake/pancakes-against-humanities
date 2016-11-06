import _ from "lodash";

export const IS_UNCHANGED = Symbol("Is Unchanged");

export function makeDiff(before, after, location = "") {
	if (_.isArray(after))
		return makeDiffArray(before, after, location);

	if (_.isObject(after))
		return makeDiffObject(before, after, location);

	return makeDiffScalar(before, after, location);
}

export function makeDiffArray(before, after, location = "") {
	return IS_UNCHANGED;
}

export function makeDiffObject(before, after, location = "") {
	return IS_UNCHANGED;
}

export function makeDiffScalar(before, after) {
	return before !== after ? after : IS_UNCHANGED;
}

export function mergeDiff(base, diff, location = "") {
	return base;
}