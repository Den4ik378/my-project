document.getElementById("ukrainianText").addEventListener("input", function () {
  const ukrainianText = this.value;
  const transliteratedText = transliterateText(ukrainianText);
  document.getElementById("transliteratedText").value = transliteratedText;
});

function transliterateText(ukrainianText) {
  const transTable = {
    а: "a",
    б: "b",
    в: "v",
    г: "h",
    ґ: "g",
    д: "d",
    е: "e",
    є: "ye",
    ж: "zh",
    з: "z",
    и: "y",
    і: "i",
    ї: "yi",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ь: "'",
    ю: "yu",
    я: "ya",
  };

  return ukrainianText
    .split("")
    .map((char) => {
      if (transTable[char.toLowerCase()]) {
        if (char === char.toUpperCase()) {
          return transTable[char.toLowerCase()].toUpperCase();
        } else {
          return transTable[char.toLowerCase()];
        }
      } else {
        return char;
      }
    })
    .join("");
}
