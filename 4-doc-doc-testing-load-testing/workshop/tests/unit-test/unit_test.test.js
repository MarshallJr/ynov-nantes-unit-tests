const { describe, expect, test } = global;
const { formatTodoText, hash } = require("../../public/script");

describe("Unit tests for script.js", () => {
    it("test formatting function", () => {
        const message = "Hello";

        expect(formatTodoText(message)).toBe("*Hello*");
    });

    it("test hsh function", () => {
        const message = "Hello";
        const msgHashed = hash(message);
        expect(msgHashed).toBe(69609650);
        expect(typeof msgHashed).toBe("number");
    });
});