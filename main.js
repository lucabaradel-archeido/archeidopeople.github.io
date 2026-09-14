// Imposta la data dell'aggiornamento

function FindDstSwitchDate(year, month, day) {
  // Set the starting date
  var baseDate = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
    for (month_loop = month; month_loop < 18; month_loop++) {
      var tmpDate = new Date(Date.UTC(year + parseInt((month_loop+1)/12), (month_loop + 1)%12, 1, 0, 0, 0, 0));
      var tmpOffset = baseDate.getTimezoneOffset() - tmpDate.getTimezoneOffset()
      var prev_offset = tmpOffset
      if (tmpOffset != 0) {
        for (day_loop = 22; day_loop < 32; day_loop++) {
          var tmpDayte = new Date(Date.UTC(year + parseInt((month_loop+1)/12), (month_loop)%12, day_loop, 0, 0, 0, 0));
          var tmpDatOffset = tmpDayte.getTimezoneOffset() - tmpDate.getTimezoneOffset()
          if (prev_offset != tmpDatOffset && !(day+1 > day_loop && month == month_loop)){
            return [prev_offset == -60, tmpDayte]
          } 
          else{
            if(prev_offset != tmpDatOffset){
              baseDate = tmpDate
            }
          }
          prev_offset = tmpDatOffset
        }
      }
  }
}

let now_date = new Date()
let change_date = FindDstSwitchDate(now_date.getUTCFullYear(), now_date.getMonth(), now_date.getDate())

var updateDate = change_date[1].getTime();
var is_summer = change_date[0]
// Aggiorna il countdown ogni secondo
var countdownInterval = setInterval(function () {
  var now = new Date().getTime();
  var timeRemaining = updateDate - now;

  // Calcola i giorni, ore, minuti e secondi rimanenti
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Mostra il risultato nel div con id="countdown"
  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  // Se il countdown è finito, scrivi un messaggio
  if (is_summer) {
    clearInterval(countdownInterval);
    document.getElementById("time-label").innerHTML = "";
    document.getElementById("countdown").innerHTML =
      "Buona estate 🌇";
  }
}, 1000);

const trashPeople = [
  "Tix",
  "Cristina",
  "Meto",
  "Magra",
  "Elena",
  "Sara",
  "Raffaele P",
  "Baraz",
  "Michele",
];

const coffeePeople = [
  "Baraz",
  "Cristina",
  "Tix",
  "Meto",
  "Michele",
  "Magra",
  "Sara",
  "Raffaele P",
  "Elena",
];

// Function to get the current week number of the year
function getWeekNumber(date) {
  const currentDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = currentDate.getUTCDay() || 7;
  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
  return Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
}

// Function to select people for the shifts
function selectPeople() {
  // Get the current week number
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);

  let shiftIndex = null ? 0 : currentWeek % trashPeople.length;
  let trashShiftDelta = 2;
  let coffeeShiftDelta = 1;

  // Select one person for trash and another for coffee machine cleaning
  const trashPerson = trashPeople[(shiftIndex + trashShiftDelta) % trashPeople.length];
  const nextTrashPerson = trashPeople[(shiftIndex + trashShiftDelta + 1) % trashPeople.length];
  const nextNextTrashPerson = trashPeople[(shiftIndex + trashShiftDelta + 2) % trashPeople.length]
  const coffeePerson = coffeePeople[(shiftIndex + coffeeShiftDelta) % coffeePeople.length];
  const nextCoffeePerson = coffeePeople[(shiftIndex + coffeeShiftDelta + 1) % coffeePeople.length];
  const nextNextCoffeePerson = coffeePeople[(shiftIndex + coffeeShiftDelta + 2) % coffeePeople.length]

  // Display the results
  document.getElementById("trash").innerText = trashPerson;
  document.getElementById("coffee").innerText = coffeePerson;
  document.getElementById("next-trash").innerText = nextTrashPerson;
  document.getElementById("next-coffee").innerText = nextCoffeePerson;
  document.getElementById("next-next-trash").innerText = nextNextTrashPerson;
  document.getElementById("next-next-coffee").innerText = nextNextCoffeePerson;
}

// Run the function when the page loads
window.onload = selectPeople;
document.getElementById('current-year').innerHTML = `${(new Date().getUTCFullYear())}`
