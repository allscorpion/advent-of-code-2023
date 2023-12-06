import { input } from "./day1.input";

const convertStringToNumber = (str: string): string => {
  switch (str) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
  }
  return str;
};

const findMatch = (match: RegExpMatchArray) => {
  for (const item of match) {
    if (item) {
      return item;
    }
  }
};

const inputList = input.trim().split("\n");
let total = 0;
inputList.forEach((row) => {
  const numbersMatchRegex = row
    .toLowerCase()
    .matchAll(
      /[0-9]|(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))/g
    );
  const numbers = Array.from(numbersMatchRegex, (x) => findMatch(x));
  if (!numbers) {
    return;
  }
  const firstNumber = convertStringToNumber(numbers[0] ?? "");
  const lastNumber = convertStringToNumber(numbers[numbers.length - 1] ?? "");
  const currentAnswer = parseInt(`${firstNumber}${lastNumber}`, 10);
  total += currentAnswer;
});

console.log(total);
