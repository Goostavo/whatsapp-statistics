/*
* Analytics that:
* Counts words on the group history to generate a word cloud format
* https://www.wordclouds.com/
* Format:
* weight: "Word count"
* word: "the word"
* color: "color used"
* url: "not used, leave blank"
*/
const COLORS = require('../COLORS');
const fs = require('fs');



/******************************
 * ignored words
 ******************************/
const ignoredWords = [
    'de', 'que', 'e', 'o', 'a', 'do', 'para', 'é', 'em', 'um', 'com', 'da', 'no', 'não', 'uma', 'omitted', 'na', 'mais', 'tem', 'se', 'pra', 'por',
    '‎image', 'os', 'mas', 'as', '-', 'O', 'ou', 'como', 'muito', 'aqui', 'ser', 'já', 'está', 'me', 'A', 'eu', 'isso', 'E','Mas', 'sobre', 'dos',
    'vai', 'só', 'ao', 'Se', 'Não', 'foi', 'quem', 'bem', 'Eu', 'ter', 'das', 'você', 'esse', 'são', 'pelo', 'também', 'até', 'ainda',
    'alguém', 'pode', 'fazer', 'É', 'nos', 'sua', 'mesmo', 'estão', 'bom', 'essa', 'seu', 'meu', 'sem', 'eles', 'tudo',
    'pela', 'minha', 'te', 'nosso', 'lá', 'to', 'Quem', 'Tem', 'aí', 'alguma', 'boa', 'vocês', 'estou', 'melhor', 'vc',
    'algum', 'faz', 'tenho', 'agora', 'todo', 'the', 'ver', 'q', 'à', 'nao', 'tá', 'was', 'será', 'Vou', 'Boa', 'este', 'falar', 'for', 'Já',
    'message', 'vou', 'link', 'quando', 'dar', 'algo', 'Acho', 'temos', '31', 'parte', 'Que', 'apenas', 'nem', 'Para', 'há', 'outros', 'Isso', 'menos',
    'Como', '‎This', 'tiver', 'cada', 'Só', 'tipo', 'sei', 'No', '2', 'entre', 'esta', 'depois', 'caso', 'nas', 'pois', 'Bom', 'Por',
    'quer', 'seria', 'Estou', 'pro', 'porque', 'and', 'qual', '?', , 'Um', 'seja', '3', 'às', 'outras', 'eh', '1', 'Na', 'of', 'onde', 'Em', 'deleted.',
    'Muito', 'estamos', 'era', 'Vamos', ',','pouco', 'muita', 'sempre', 'cara', 'demais', 'qualquer', 'vamos', 'outro', 'nossa','Estamos', 'alguns',
    'mídia', '<Arquivo', 'oculto>', 'Mensagem', 'apagada', ':', 'todos', 'Alguém', 'deste', 'sendo', '(arquivo', 'anexado)', 'podem', 'com', 'Com',
    'As', 'Você', 'tinha', 'Ou', 'vagas', 'nada', 'nova'
];

const mergedWords = [
    ['empresa', 'empresas']
]





module.exports = function(messages) {
    console.log('Gerando nuvem de palavras');
    let wordCount = {};
    for (const message of messages) {
        // Split by space removing multiple spaces and blank strings.
        const wordArray = message.message.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
        
        for (let word of wordArray) {
            if (ignoredWords.includes(word)) {
                continue;
            }

            word = word.toLowerCase();
            if (!wordCount[word]) {
                wordCount[word] = 1;
            } else {
                wordCount[word]++;
            }
        }
    }

    let colorIndex = 0;
    let wordCountArray = Object.keys(wordCount).map(entry => {
        colorIndex = (colorIndex + 1) % COLORS.length;
        return {
            weight: wordCount[entry],
            word: entry,
            color: COLORS[colorIndex],
            url: ''
        }
    });

    // Sort descending
    wordCountArray = wordCountArray.sort(function (a, b) {
        if (a.weight > b.weight) {
          return -1;
        }
        if (a.weight < b.weight) {
          return 1;
        }
        // a must be equal to b
        return 0;
    });

    wordCountArray = wordCountArray.slice(0, 49);
    const csvOutput = obj2csv(wordCountArray);

    console.log('nuvem gerada em: outout/wordcloud.csv');
    fs.writeFileSync('output/wordcloud.csv', csvOutput);


    return wordCountArray;
}


/*******************8
 * easy object 2 CSV
 */
 function obj2csv(arr) {
    let claves = Object.keys(arr[0])
    let rows = claves.join(";") + "\r\n";
    arr.forEach((row) => {
      let nrow = [];
      claves.forEach((clave) => {
        let valor = JSON.stringify(row[clave]);
        nrow.push(valor.split(";").join(" ").split(",").join(" "));
      });
      rows = rows + nrow.join(";") + "\r\n";
    });
    return rows;
}
