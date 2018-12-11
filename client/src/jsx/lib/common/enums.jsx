import Enum from "./Enum";

export const Option = Enum({
    SOME: ["value"],
    NONE: [],
});

export const Result = Enum({
    OK: ["value"],
    ERROR: ["error"],
});
