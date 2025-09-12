// write a method accepts a string value and the output must not
// contain any whitespace larger than 1 character length and without
// bad_words such as 'damn' or 'bullshit'

const formatString = (string) => {
  if (typeof string !== "string" || !string) return string;
  const removeWhiteSpace = string.replace(/\s+/g, " ");
  const badWords = ["damn", "bullshit"];
  const splittedString = removeWhiteSpace.split(" ");
  return splittedString.filter(s => !badWords.includes(s)).join(" ")
}
