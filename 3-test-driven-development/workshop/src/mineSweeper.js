class MineSweeper {

    constructor(input, rl = null) {
        const args = input.split(' ');

        args[0] === '0' && args[1] === '0'
            ? rl.close()
            : this.isValid(args);
        this.rows = parseInt(args[0]);
        this.columns = parseInt(args[1]);
        this.field = [];
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

    addLine(args) {
        const line = args.split('');
        // check if there is correct amount of fields provided
        if (line.length !== this.columns) throw "You must provide * or . for "+this.columns+" columns";
        const regex = new RegExp('[\\*\\.]{'+this.columns+'}')
        // check if the line only contains * or .
        if (!args.match(regex)) throw "You must provide only * (mine) or . (empty) characters";
        this.field.push(line);
    }

    isAMine(cell) {
        return cell === "*";
    }

    detectMines(row, rowIndex) {
        let formattedRow = []
        row.forEach((cell, _index) => {
            let nbMines = 0;
            // previous row
            if (rowIndex-1 >= 0) {
                const previousRow = this.field[rowIndex-1].filter((c, index) => index >= _index-1 && index <= _index+1);
                previousRow.forEach((c) => {
                    if (this.isAMine(c)) nbMines++;
                })
            }
            //currentRow
            const currentRow = row.filter((c, index) => index >= _index-1 && index <= _index+1);
            currentRow.forEach((c) => {
                if (c !== cell && this.isAMine(c)) nbMines++;
            })
            // next row
            if (rowIndex+1 <= this.rows-1) {
                const nextRow = this.field[rowIndex+1].filter((c, index) => index >= _index-1 && index <= _index+1);
                nextRow.forEach((c) => {
                    if (this.isAMine(c)) nbMines++;
                })
            }

            this.isAMine(cell) ? formattedRow.push("*") : formattedRow.push(nbMines);
            // this.field[rowIndex] = formattedRow;
        });
        // this.field[rowIndex] = formattedRow;
        // return formattedRow;
        const stringify = formattedRow.reduce((prev, current) => {
            return prev+current.toString();
        }, "")
        return stringify;
    }

    displayOutput() {
        this.field.forEach((row, index) => {
            console.log(this.detectMines(row, index));
        })
    }
}

module.exports = MineSweeper;