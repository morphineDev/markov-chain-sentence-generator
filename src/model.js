"use strict";
exports.__esModule = true;
exports.initLoop = exports.getFirstWord = exports.setWordsDistribution = exports.makePair = exports.initModel = void 0;
exports.initModel = function (testText) {
    var pair = exports.makePair(testText);
    var wordsDictionary = exports.setWordsDistribution(pair);
    var firstWord = exports.getFirstWord(testText);
    exports.initLoop(wordsDictionary, firstWord);
};
exports.makePair = function (testText) {
    var wordsPair = [];
    var splittedText = testText.split(" ");
    splittedText.reduce(function (acc, value, index, array) {
        acc.push(array.slice(index, index + 2));
        return acc;
    }, wordsPair);
    wordsPair.length = wordsPair.length - 1;
    return wordsPair;
};
exports.setWordsDistribution = function (textPair) {
    var dictionaryWordsDistribution = {};
    textPair.forEach(function (pair) { return (dictionaryWordsDistribution[pair[0]] = []); });
    textPair.forEach(function (pair, pairIndex) {
        dictionaryWordsDistribution[pair[0]].push(pair[1]);
    });
    return dictionaryWordsDistribution;
};
exports.getFirstWord = function (testText) {
    var parsedText = testText.trim().split(" ");
    var wordsWithCapitalChar = parsedText.filter(function (textKey) {
        var reg = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        if (textKey.charAt(0).match(reg)) {
            return;
        }
        return textKey.charAt(0) === textKey.charAt(0).toUpperCase();
    });
    return wordsWithCapitalChar[Math.floor(Math.random() * wordsWithCapitalChar.length)];
};
exports.initLoop = function (wordsDictionary, firstWord) {
    var WORDS_COUNT = 500;
    var chain = [firstWord];
    var prevWord = chain[0];
    while (WORDS_COUNT >= 0) {
        var randomValueOfProp = Math.floor(Math.random() * wordsDictionary[prevWord].length);
        var nextWord = wordsDictionary[prevWord][randomValueOfProp];
        chain.push(nextWord);
        prevWord = nextWord;
        --WORDS_COUNT;
    }
    console.log(chain.join(" "));
};
