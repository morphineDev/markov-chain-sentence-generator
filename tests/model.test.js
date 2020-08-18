import {getFirstWord, initLoop, makePair, setWordsDistribution} from "../src/model";

beforeEach(() => {
	jest.spyOn(global.Math, 'random').mockReturnValue(0);
});

afterEach(() => {
	global.Math.random.mockRestore();
})

test("Should makePair(testText: string): string[][] return pair of words", () => {
  const testText = "Test text";
  const pair = makePair(testText);
  expect(pair).toEqual([["Test", "text"]]);
});

test(`Should setWordsDistribution(textPair: string[][]) {[key: string]: string[];} return dictionary with words`, () => {
	const testText = "Foo bar foo bar go ";
	const pair = makePair(testText);
	const wordsDictionary = setWordsDistribution(pair);

	expect(wordsDictionary).toEqual({
		"Foo": ["bar"],
		"bar": ["foo", "go"],
		"foo": ["bar"],
		"go": [""]
	})
});

test("Should getFirstWord(testText: string): string return random word of testText", () => {
	const testText = "Test text";
	const firstWord = getFirstWord(testText);
	expect(firstWord).toEqual("Test");
})
