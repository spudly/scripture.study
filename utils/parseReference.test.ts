import parseReference, { Result } from "./parseReference";

type ResultMap = { [reference: string]: Array<Result> };

const map: ResultMap = {
  "1 Nephi 3:7": [{ book: "1 nephi", chapter: 3, verses: [7] }],
  "1Nephi3:7": [{ book: "1 nephi", chapter: 3, verses: [7] }],
  " 1 Nephi 3 : 7 ": [{ book: "1 nephi", chapter: 3, verses: [7] }],
  "1Ne3:7": [{ book: "1 ne", chapter: 3, verses: [7] }],
  "1Ne.3:7": [{ book: "1 ne", chapter: 3, verses: [7] }],
  "1 Nephi 3:7-8": [{ book: "1 nephi", chapter: 3, verses: [7, 8] }],
  " 1 Nephi 3 : 7 - 8 ": [{ book: "1 nephi", chapter: 3, verses: [7, 8] }],
  "1 Nephi 3:7,11": [{ book: "1 nephi", chapter: 3, verses: [7, 11] }],
  " 1 Nephi 3 : 7 , 11 ": [{ book: "1 nephi", chapter: 3, verses: [7, 11] }],
  "1 Nephi 3:7-8,11;2 Nephi 4:6": [
    { book: "1 nephi", chapter: 3, verses: [7, 8, 11] },
    { book: "2 nephi", chapter: 4, verses: [6] }
  ],
  "John 3:16": [{ book: "john", chapter: 3, verses: [16] }],
  "1 Nephi 3": [{ book: "1 nephi", chapter: 3 }]
};

Object.keys(map).forEach(reference => {
  test(`"${reference}"`, () => {
    expect(parseReference(reference)).toStrictEqual(map[reference]);
  });
});
