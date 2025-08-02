const typing_ground = document.getElementById("textarea");
const btn = document.getElementById("btn");
const score = document.getElementById("score");
const show_sentence = document.getElementById("showSentence");

let startTime, endTime, totalTimeTaken;

const sentences = [
  "The quick brown fox jumps over the lazy dog 1",
  "The quick brown fox jumps over the lazy dog 2",
  "The quick brown fox jumps over the lazy dog 3",
];

const calculateTypingSpeed = (totalTimeTaken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords === "" ? 0 : totalWords.split(" ").length;

  if (actualWords !== 0) {
    let typing_speed = (actualWords / totalTimeTaken) * 60;
    typing_speed = Math.round(typing_speed);
    score.innerHTML = `Your typing speed is ${typing_speed} words per minute & you wrote ${actualWords} words & time taken is ${totalTimeTaken} secs`;
  } else {
    score.innerHTML = `Your typing speed is 0 words per minute & time taken is ${totalTimeTaken} secs`;
  }
};

const endTypingTest = () => {
  btn.innerText = "Start";

  let date = new Date();
  endTime = date.getTime();

  totalTimeTaken = (endTime - startTime) / 1000;
  // console.log(totalTimeTaken)

  calculateTypingSpeed(totalTimeTaken);

  show_sentence.innerHTML = "";
  typing_ground.value = "";
};

const startTyping = () => {
  let randomNumber = Math.floor(Math.random() * sentences.length);
  // console.log(randomNumber)
  show_sentence.innerHTML = sentences[randomNumber];

  let date = new Date();
  startTime = date.getTime();

  btn.innerText = "Done";
};

btn.addEventListener("click", () => {
  switch (btn.innerText.toLowerCase()) {
    case "start":
      typing_ground.removeAttribute("disabled");
      startTyping();
      break;

    case "done":
      typing_ground.setAttribute("disabled", "true");
      endTypingTest();
      break;
  }
});
