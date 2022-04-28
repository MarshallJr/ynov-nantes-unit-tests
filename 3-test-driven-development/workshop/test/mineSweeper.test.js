const MineSweeper = require("../src/mineSweeper");

describe("Mine Sweeper", function() {

    // describe("Inputs", function () {
    //
    //     it("only one args", function() {
    //         const input = "4";
    //         expect(() => {
    //             new MineSweeper(input);
    //         }).toThrow();
    //     });
    //
    //     it("more than two args", function() {
    //         const input = "4 5 6";
    //         expect(() => {
    //             new MineSweeper(input);
    //         }).toThrow();
    //     });
    //
    //     it("two integers", function() {
    //         const input = "4 5";
    //         const ms = new MineSweeper(input);
    //         expect(ms.lines).toBe(4);
    //         expect(ms.rows).toBe(5);
    //     });
    //
    //     it("not integers", function() {
    //         const input = "a 5";
    //         expect(() => {
    //             new MineSweeper(input);
    //         }).toThrow();
    //     });
    //
    //     it("0 < n,m < 100", function() {
    //         const input = "78 97";
    //         const ms = new MineSweeper(input);
    //         expect(ms.lines).toBe(78);
    //         expect(ms.rows).toBe(97);
    //     });
    //
    //     it("one arg under 0", function() {
    //         const input = "-8 5";
    //         expect(() => {
    //             new MineSweeper(input);
    //         }).toThrow();
    //     });
    //
    //     it("one arg over 100", function() {
    //         const input = "75 120";
    //         expect(() => {
    //             new MineSweeper(input);
    //         }).toThrow();
    //     });
    // });

    describe("Field inputs", function () {

        let ms;

        beforeAll(function () {
            const input = "4 4";
            ms = new MineSweeper(input);
        })

        it("correct input", function() {
            const lineInput = "*...";
            ms.addLine(lineInput);
            expect(ms.field[0]).toStrictEqual(["*", ".", ".", "."])
        });

        it("no line input", function() {
            const lineInput = "";
            expect(() => {
                ms.addLine(lineInput);
            }).toThrow();
        });

        it("less than nbCol", function() {
            const lineInput = "*..";
            expect(() => {
                ms.addLine(lineInput);
            }).toThrow();
        });

        it("more than nbCol", function() {
            const lineInput = "*....";
            expect(() => {
                ms.addLine(lineInput);
            }).toThrow();
        });

        it("char other than * or .", function() {
            const lineInput = "*../";
            expect(() => {
                ms.addLine(lineInput);
            }).toThrow();
        });
    })

});