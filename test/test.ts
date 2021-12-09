import condParse from "../src/index";
import { parseToArr } from "../src/lib/stringToArr";
import setPriority from "../src/lib/setPriority";

const obj = {
    a: false,
    b: true,
    c: false,
    d: true,
    e: true,
    f: true,
};

const conditions = {
    "a||b": {
        val: true,
        pa: ["a", "||", "b"],
        sp: ["a", "||", "b"],
    },
    "(a||b)&& !d": {
        val: false,
        pa: [["a", "||", "b"], "&&", "!", "d"],
        sp: [["a", "||", "b"], "&&", "!", "d"],
    },
    "(a &&(b||c)) || !!d": {
        val: true,
        pa: [["a", "&&", ["b", "||", "c"]], "||", "!!", "d"],
        sp: [["a", "&&", ["b", "||", "c"]], "||", "!!", "d"],
    },
    "!f": {
        val: false,
        pa: ["!", "f"],
        sp: ["!", "f"],
    },
    "a||d&&c && (e || f && d) && !d": {
        val: false,
        pa: [
            "a",
            "||",
            "d",
            "&&",
            "c",
            "&&",
            ["e", "||", "f", "&&", "d"],
            "&&",
            "!",
            "d",
        ],
        sp: [
            "a",
            "||",
            [
                "d",
                "&&",
                "c",
                "&&",
                ["e", "||", ["f", "&&", "d"]],
                "&&",
                "!",
                "d",
            ],
        ],
    },
};

for (const i in conditions) {
    test("test parseToArr" + i, () => {
        expect(parseToArr(i)).toEqual(conditions[i].pa);
    });

    test("test setPriority" + i, () => {
        expect(setPriority(conditions[i].pa)).toEqual(conditions[i].sp);
    });

    test("test " + i, () => {
        expect(condParse(i, obj)).toBe(conditions[i].val);
    });
}
