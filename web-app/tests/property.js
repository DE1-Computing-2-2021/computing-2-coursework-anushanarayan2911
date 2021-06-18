import fc from "fast-check";

const property = function (description, arbitaries, predicate, options = {}) {
    return it(description, function() {
        fc.assert(fc.property(
            ...arbitaries,
            predicate,
        ), options);
    });
};

export default Object.freeze(property);