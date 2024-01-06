const perimeterSpan = document.getElementById("perimeter");
const areaSpan = document.getElementById("area");
const diagonalSpan = document.getElementById("diagonal");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");

lengthInput.addEventListener("input", calculate);
widthInput.addEventListener("input", calculate);

function calculate(event) {
  event.preventDefault();

  const form = document.getElementById("calcForm");

  const length = parseFloat(form.length.value);
  const width = parseFloat(form.width.value);

  if (!isNaN(length) && !isNaN(width)) {
    const perimeter = 2 * (length + width);
    const area = length * width;
    const diagonal = Math.sqrt(length ** 2 + width ** 2);

    perimeterSpan.textContent = "Периметр: " + perimeter;
    areaSpan.textContent = "Площа: " + area;
    diagonalSpan.textContent = "Діагональ: " + diagonal;
  } else {
    perimeterSpan.textContent = "Периметр: ";
    areaSpan.textContent = "Площа: ";
    diagonalSpan.textContent = "Діагональ: ";
  }
}
