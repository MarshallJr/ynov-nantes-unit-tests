const readline = require('readline');
const MineSweeper = require("./mineSweeper");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log("");
console.log("--------------------------------------------------------------------------------------------------------");
console.log("|                                          REGLE DU JEU                                                |");
console.log("|          Sur la première ligne vous renseignez le nombre le ligne/colonnes de votre tableau          |");
console.log("|               Vous devrez ensuite renseigner l'emplacement des mines (*) ou du vide (.)              |");
console.log("|            Quittez le jeu en mettant 0 0 à la première ligne de votre tableau, ou CTRL + C           |");
console.log("--------------------------------------------------------------------------------------------------------\n");

let fields = [];
let index = 1

rl.on('close', function () {
    fields.forEach((field, index) => {
        console.log(`Field #${index+1}:`)
        field.displayOutput();
        console.log("")
    })
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

function displayLineTemplate(field, row) {
    if (row <= field.rows) {
        rl.question(`row#${row}: `, function (lineTemplate) {
            field.addLine(lineTemplate);
            row++;
            displayLineTemplate(field, row)
        })
    } else {
        displayQuestion();
    }
}

function displayQuestion () {
    rl.question(`Game#${index}: Nombre de lignes et de colonnes ? `, function (nbLinesAndRows) {
        const field = new MineSweeper(nbLinesAndRows, rl);
        fields.push(field);
        index++;
        let row = 1;

        displayLineTemplate(field, row)

        // displayQuestion();
        // rl.close();
    });
}

displayQuestion();
