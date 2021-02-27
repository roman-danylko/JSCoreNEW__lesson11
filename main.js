const $ = (select) => document.querySelector(select);
const dd = new Date();

// ------------Start Date----------------
let date = dd.getDate();
let month = dd.getMonth() + 1;
if (month < 10) month = "0" + month;
let year = dd.getFullYear();

$(".date").textContent = `${date}.${month}.${year}`;
// ---------------End Date-----------------

// -------------Start Clock----------------
setInterval(() => {
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  $(".time").innerHTML = `${hours}:${minutes}:${seconds}`;
});
// ------------------End Clock------------------

// ----------------StopWatch------------------
let startWatchID;
let watch;
let ms = 0;
let seconds = "0" + 0;
let minutes = "0" + 0;
let hours = "0" + 0;
// Start StopWatch
$(".start").onclick = () => {
  event.target.disabled = true;
  $(".stop").disabled = false;
  startWatchID = setInterval(() => {
    ms += 10;

    if (ms > 999) {
      ms = 0;
      seconds++;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
    }
    if (seconds > 59) {
      seconds = "0" + 0;
      minutes++;
      if (minutes < 10) minutes = "0" + minutes;
    }
    if (minutes > 59) {
      minutes = "0" + 0;
      hours++;
      if (hours < 10) hours = "0" + hours;
    }

    if (ms < 10) {
      $(".stopwatch").innerHTML = `${hours}:${minutes}:${seconds}:00${ms}`;
    }

    $(".stopwatch").innerHTML = `${hours}:${minutes}:${seconds}:${ms}`;
  }, 10);
};

// Loop StopWatch
$(".loop").onclick = () => {
  $(".loop_wrapper").innerHTML += `<div>${$(".stopwatch").textContent}</div>`;
};

// Stop StopWatch
$(".stop").onclick = () => {
  event.target.disabled = true;
  $(".start").disabled = false;

  clearInterval(startWatchID);
  watch = $(".stopwatch").textContent;

  let num = watch.split(":");

  for (let i = 0; i < num.length; i++) {
    num[i] = parseInt(num[i]);
  }

  ms = num[3];
  seconds = "0" + num[2];
  minutes = "0" + num[1];
  hours = "0" + num[0];
};

// Reset StopWatch
$(".reset").onclick = () => {
  $(".stop").disabled = false;
  $(".start").disabled = false;

  ms = 0;
  seconds = "0" + 0;
  minutes = "0" + 0;
  hours = "0" + 0;

  $(".stopwatch").innerHTML = "00:00:00:000";
  $(".loop_wrapper").innerHTML = "";
};
// ----------------End StopWatch---------------

// -------------Start Timer-----------------
let timer = 25;
let ss = 0;
$(".minutes").textContent = timer;

// Plus Btn
$(".plus_btn").onclick = () => {
  timer++;
  if (timer > 0) {
    $(".minus_btn").disabled = false;
  }
  $(".minutes").textContent = timer;
};

// Minus Btn
$(".minus_btn").onclick = () => {
  timer--;
  if (timer == 0) {
    $(".minus_btn").disabled = true;
  }
  $(".minutes").textContent = timer;
};

// Start Timer
let startTimerID;
$(".start_timer").onclick = () => {
  event.target.disabled = true;
  $(".stop_timer").disabled = false;
  let newTime = new Date().setTime(dd.getTime() + timer * 60000 + ss * 1000);

  startTimerID = setInterval(() => {
    let time = new Date();
    let rizn = newTime - time.getTime();

    let seconds = Math.floor((rizn % (1000 * 60)) / 1000);
    let minutes = Math.floor((rizn % (1000 * 60 * 60)) / (1000 * 60));
    $(".timer").innerHTML = `${minutes}:${seconds}`;
  });
};

// StopTimer
let timerText;
$(".stop_timer").onclick = () => {
  event.target.disabled = true;
  $(".start_timer").disabled = false;
  clearTimeout(startTimerID);

  //   timerText = $(".timer").textContent;

  //   let num = timerText.split(":");

  //   for (let i = 0; i < num.length; i++) {
  //     num[i] = parseInt(num[i]);
  //   }

  //   timer = num[0];
  //   ss = num[1];
};

// ResetTimer
$(".reset_timer").onclick = () => {
  $(".timer").textContent = "00:00";
};

// --------------End Timer-----------------
