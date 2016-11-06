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
		]
	},
	array: {
		"throws on invalid type": () => {
			expect(() => makeDiff("whoa", [])).toThrow();
		},
		"unchanged on empty": [
			[], [],
			IS_UNCHANGED
		],
		"empties array": [
			[1, 2, 3], [],
			{$splice: [0, 3]}
		],
		simple: {
			"unchanged": [
				[1, 2, 3], [1, 2, 3],
				IS_UNCHANGED
			],
			"splice": [
				[1, 2, 3], [1, 2, 4, 5],
				{$splice: [2, 1, 4, 5]}
			],
			"add one at end": [
				[1, 2, 3], [1, 2, 3, 4],
				{$splice: [3, 0, 4]}
			],
			"remove one at end": [
				[1, 2, 3], [1, 2],
				{$splice: [2, 1]}
			],
			"remove one in middle": [
				[1, 2, 3], [1, 3],
				{$splice: [1, 2, 3]}
			]
		},
		complex: {
			"unchanged": [
				[
					{id: 1, text: "old"},
					{id: 2, text: "whoa"},
					{id: 3, text: "hey"}
				], [
					{id: 1, text: "old"},
					{id: 2, text: "whoa"},
					{id: 3, text: "hey"}
				],
				IS_UNCHANGED
			],
			"removes one": [
				[{id: 1, text: "hey"}, {id: 2, text: "whoa"}],
				[{id: 1, text: "hey"}],
				{$update: {}, ids: [1]}
			],
			"reorder": [
				[{id: 1, text: "hey"}, {id: 2, text: "whoa"}],
				[{id: 2, text: "whoa"}, {id: 1, text: "hey"}],
				{$update: {}, ids: [2, 1]}
			],
			"update": [
				[{id: 1, text: "hey"}, {id: 2, text: "whoa"}],
				[{id: 1, text: "hey"}, {id: 2, text: "hey and whoa"}],
				{$update: {2: {text: "hey and whoa"}}, ids: [1, 2]}
			]
		}
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