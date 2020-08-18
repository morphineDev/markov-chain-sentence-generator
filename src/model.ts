interface IDictionaryWithDistributedPairsOfWords {
	[key: string]: string[];
}

export const initModel = (testText: string) => {
	const pair = makePair(testText);
	const wordsDictionary = setWordsDistribution(pair);
	const firstWord = getFirstWord(testText);
	initLoop(wordsDictionary, firstWord);
};

export const makePair = (testText: string): string[][] => {
	const wordsPair: string[][] = [];
	const splittedText = testText.split(" ");
	splittedText.reduce(
		(
			acc: string[][],
			value: string,
			index: number,
			array: string[]
		): string[][] => {
			acc.push(array.slice(index, index + 2));
			return acc;
		},
		wordsPair
	);
	wordsPair.length = wordsPair.length - 1;
	return wordsPair;
};

export const setWordsDistribution = (
	textPair: string[][]
): IDictionaryWithDistributedPairsOfWords => {
	const dictionaryWordsDistribution: IDictionaryWithDistributedPairsOfWords = {};

	textPair.forEach(pair => (dictionaryWordsDistribution[pair[0]] = []));

	textPair.forEach((pair, pairIndex) => {
		dictionaryWordsDistribution[pair[0]].push(pair[1]);
	});

	return dictionaryWordsDistribution;
};

export const getFirstWord = (testText: string): string => {
	const parsedText = testText.trim().split(" ");

	const wordsWithCapitalChar: string[] = parsedText.filter(textKey => {
		const reg = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
		if (textKey.charAt(0).match(reg)) {
			return;
		}
		return textKey.charAt(0) === textKey.charAt(0).toUpperCase();
	});

	return wordsWithCapitalChar[
		Math.floor(Math.random() * wordsWithCapitalChar.length)
		];
};

export const initLoop = (
	wordsDictionary: IDictionaryWithDistributedPairsOfWords,
	firstWord: string
) => {
	let WORDS_COUNT = 500;
	const chain: string[] = [firstWord];
	let prevWord: string = chain[0];
	while (WORDS_COUNT >= 0) {
		const randomValueOfProp = Math.floor(
			Math.random() * wordsDictionary[prevWord].length
		);
		const nextWord = wordsDictionary[prevWord][randomValueOfProp];
		chain.push(nextWord);
		prevWord = nextWord;
		--WORDS_COUNT;
	}

	console.log(chain.join(" "));
};
