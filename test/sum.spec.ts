import { sum } from "./sum"

describe('testing function sum', () => {
    it("sum of 1 and 2 is 3", () => {
        expect(sum(1, 2)).toBe(3);
    });

    it("sum of two negative number shuold be a negative number", () => {
        //Prepare
        const a = -1;
        const b = -2;

        // execute
        const result = sum(a, b);

        // verify

        expect(result).toBeLessThan(0);
    })
})