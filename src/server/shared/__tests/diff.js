import _ from "lodash";
import { makeDiff, mergeDiff, IS_UNCHANGED } from "../diff";

// go over a list of objects and run tests
// recursively loop through all of the object's properties and subproperties passed in
// until it finds a property with a value that's an array - and then it'll run these tests
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
            expect(() => makeDiff("whoa", [])).toThrow(); // if we tried to make a diff with a before of a string and an after of an array, it should throw an exception
        },
        "unchanged on empty": [
            [],
            [],
            IS_UNCHANGED
        ],
        "empties array": [
            [1, 2, 3],
            [], // a before with populated array and an after with empty array should result in a splice operation to clear out the array
            { $splice: [0, 3] }
        ],
        simple: {
            "unchanged": [
                [1, 2, 3],
                [1, 2, 3],
                IS_UNCHANGED
            ],

            "spliced": [
                [1, 2, 3],
                [1, 2, 4, 5],
                { $splice: [2, 1, 4, 5] } // start on the second index, delete one item, and then add four and five to the end
            ],

            "add one at end": [
                [1, 2, 3],
                [1, 2, 3, 4],
                { $splice: [3, 0, 4] }
            ],

            "remove one at end": [
                [1, 2, 3],
                [1, 2],
                { $splice: [2, 1] }
            ],

            "remove one in the middle": [
                [1, 2, 3],
                [1, 3],
                { $splice: [1, 2, 3] }
            ]
        },
        complex: {
            "unchanged": [
                [
                    { id: 1, text: "old" },
                    { id: 2, text: "whoah" },
                    { id: 3, text: "hey" }
                ],
                [
                    { id: 1, text: "old" },
                    { id: 2, text: "whoah" },
                    { id: 3, text: "hey" }
                ],
                IS_UNCHANGED
            ],

            "removes one": [
                [{ id: 1, text: "hey" }, { id: 2, text: "whoa" }],
                [{ id: 1, text: "hey" }],
                { $update: {}, ids: [1] } // update will contain all updated values on an object, and the ids will be ordered - so that we can re order things
            ],

            "reorder": [
                [{ id: 1, text: "hey" }, { id: 2, text: "whoa" }],
                [{ id: 2, text: "whoa" }, { id: 1, text: "hey" }],
                { $update: {}, ids: [2, 1] }
            ],

            "update": [
                [{ id: 1, text: "hey" }, { id: 2, text: "whoa" }],
                [{ id: 1, text: "hey" }, { id: 2, text: "hey and whoa" }],
                { $update: { 2: { text: "hey and whoa" } } }
            ],

            "update and reorder": [
                [{ id: 1, text: "hey" }, { id: 2, text: "whoa" }],
                [{ id: 2, text: "hey and whoa" }, { id: 1, text: "hey" }],
                { $update: { 2: { text: "hey and whoa" } }, ids: [2, 1] }
            ]
        }
    },

    objects: {
        "throws on invalid type": () => {
            expect(() => makeDiff("whoa", {})).toThrow(); // before string and after object - throw exception
        },

        "set nested": [
            { whoa: { hey: { stuff: 1, test: "bleh" } } }, // before
            { whoa: { hey: { stuff: 2, test: "bleh" } } }, // after
            { whoa: { hey: { stuff: 2 } } } // diff should only include the value that changed
        ],

        "add property": [
            { unchanged: "hey" },
            { unchanged: "hey", added: "whoa" },
            { added: "whoa" } // only show what has changed
        ],

        "remove property": [
            { unchanged: "hey", toRemove: 123 },
            { unchanged: "hey" },
            { toRemove: { $remove: true } }
        ]
    }
});

// allow us to write a hierarchy of tests by running describe recursively
function runDiffTests(tests) {
    _.forOwn(tests, (test, key) => { // recursively loop
        if (_.isFunction(test)) {
            it(key, test); // jasmine will run the function as a normal unit test
        } else if (_.isArray(test)) {
            const [before, after, diff] = test; // if we run into an array, extract those values out of the array
            const result = makeDiff(before, after);

            describe(`(${key})`, () => {
                it("diff", () => {
                    expect(result).toEqual(diff);
                });

                if (result != IS_UNCHANGED) {
                    it("merge", () => {
                        const mergeBack = mergeDiff(before, result);
                        expect(mergeBack).toEqual(after);
                    });
                }
            });


        } else if (_.isObject(test)) {
            describe(`${key}:`, () => runDiffTests(test)); // recursively walk through adding a describe to each nested property of the object
        }
    });
}
