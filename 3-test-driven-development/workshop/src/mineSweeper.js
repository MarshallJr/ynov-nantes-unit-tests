class MineSweeper {

    constructor(input) {
        const args = input.split(' ');
        this.isValid(args);
        this.lines = parseInt(args[0]);
        this.rows = parseInt(args[1]);
    }

    isValid(args) {
        // check if we have exactly 2 values
        if (args.length !== 2) {
            throw "You must provide two values for lines & rows";
        } else {
            // check if they are 0 < numbers < 100
            args.forEach((arg) => {
                if ((arg.toString().includes(",") || arg.toString().includes(".")) || isNaN(parseInt(arg.toString())) ) {
                    throw "You must provide an integer couple for lines & rows";
                }
                if (parseInt(arg.toString()) > 100 || parseInt(arg.toString()) < 0) {
                    throw "You must provide an integer couple between 0 and 100";
                }
            });
        }
    }
}

module.exports = MineSweeper;