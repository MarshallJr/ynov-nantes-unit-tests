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
console.log("--------------------------------------------------------------------------------------------------------\n");

let fields = [];
let index = 1

rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

function displayQuestion () {
    rl.question(`Game#${index}: Nombre de lignes et de colonnes ? `, function (nbLinesAndRows) {
        const field = new MineSweeper(nbLinesAndRows, rl);
        fields.push(field);
        index++;

        displayQuestion();
        // rl.close();
    });
}

displayQuestion();
