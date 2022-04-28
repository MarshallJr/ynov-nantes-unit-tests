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

    /*
     * Check if the args received from the command line are corrects
     */
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

    /*
     * Add one line to the MineSweeper field
     */
    addLine(args) {
        const line = args.split('');
        // check if there is correct amount of fields provided
        if (line.length !== this.columns) throw "You must provide * or . for "+this.columns+" columns";
        const regex = new RegExp('[\\*\\.]{'+this.columns+'}')
        // check if the line only contains * or .
        if (!args.match(regex)) throw "You must provide only * (mine) or . (empty) characters";
        this.field.push(line);
    }

    /*
     * Return true if the cell contains a mine
     */
    isAMine(cell) {
        return cell === "*";
    }

    /*
     * Calculate the mines around each cell from a row
     */
    detectMines(rowIndex, cellIndex, mines) {
        let minesAround = mines
        const row = this.field[rowIndex].filter((c, index) => index >= cellIndex-1 && index <= cellIndex+1);
        row.forEach((c) => {
            if (this.isAMine(c)) minesAround++;
        })
        return minesAround;
    }

    /*
     * Transform a row into a character chain, with number of mines instead of "."
     */
    formatRow(row, rowIndex) {
        let formattedRow = []
        row.forEach((cell, _index) => {
            let nbMines = 0;
            // previous row
            if (rowIndex-1 >= 0) {
                nbMines = this.detectMines(rowIndex-1, _index, nbMines);
            }
            //currentRow
            nbMines = this.detectMines(rowIndex, _index, nbMines);
            // next row
            if (rowIndex+1 <= this.rows-1) {
                nbMines = this.detectMines(rowIndex+1, _index, nbMines);
            }

            this.isAMine(cell) ? formattedRow.push("*") : formattedRow.push(nbMines);
        });

        return formattedRow.reduce((prev, current) => {
            return prev+current.toString();
        }, "")
    }

    /*
     * Display the field with each row formatted
     */
    displayOutput() {
        this.field.forEach((row, index) => {
            console.log(this.formatRow(row, index));
        })
    }
}

module.exports = MineSweeper;