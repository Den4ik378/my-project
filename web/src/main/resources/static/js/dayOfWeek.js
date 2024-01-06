const dateInput = document.getElementById("birthday-date");

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");

const maxDate = `${year}-${month}-${day}`;

dateInput.setAttribute("max", maxDate);
dateInput.setAttribute("value", maxDate);
document
  .getElementById("birthday-button")
  .addEventListener("click", function () {
    const birthdayInput = dateInput.value;
    const birthDate = new Date(dateInput.value);
    const parts = birthdayInput.split("-");

    if (isNaN(birthDate)) {
      document.getElementById("dayOfWeek").textContent =
        "Введіть свою дату народження!";
    } else {
      const dayOfWeek = getDayOfWeek(parts);
      const daysTable = [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
      ];
      document.getElementById("dayOfWeek").textContent =
        "Ви народились в день: " + daysTable[dayOfWeek];
    }
  });

function getDayOfWeek(parts) {
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);
  const birthday = new Date(year, month, day);
  console.log(birthday.getDate());
  console.log(birthday.getMonth());
  console.log(birthday.getFullYear());
  const a = Math.floor((14 - birthday.getMonth()) / 12);
  const y = birthday.getFullYear() - a;
  const m = birthday.getMonth() + 12 * a - 2;
  const result =
    (birthday.getDate() +
      y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) +
      Math.floor((31 * m) / 12)) %
    7;
  console.log(result);
  return result;
}
