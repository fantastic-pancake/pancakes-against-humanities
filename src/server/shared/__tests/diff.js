import _ from "lodash";
import {makeDiff, mergeDiff, IS_UNCHANGED} from "../diff";

runDiffTests({
	scalar: {
		"changed on numbers": [
			1, 2,
			2
		],
		"unchanged on numbers": [
			1, 1,
			IS_UNCHANGED
		],
		"changed on type": [
			1, "1",
			"1"
		],
		"unchanged on null": [
			null, null,
			IS_UNCHANGED
		],
		"bheg": [
			[1], [2],
			[1]
		]
	}
});

function runDiffTests(tests) {
	_.forOwn(tests, (test, key) => {
		if (_.isFunction(test)) {
			it(key, test);
		} else if (_.isArray(test)) {
			const [before, after, diff] = test;
			const result = makeDiff(before, after);

			describe(`(${key})`, () => {
				it("diff", () => {
					expect(result).toEqual(diff);
				});
			});

			// TODO: ADD MERGE TEST
		} else if (_.isObject(test)) {
			describe(`${key}:`, () => runDiffTests(test));
		}
	});
}