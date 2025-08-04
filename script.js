const typing_ground = document.getElementById("textarea");
const btn = document.getElementById("btn");
const score = document.getElementById("score");
const show_sentence = document.getElementById("showSentence");
const timerElement = document.getElementById("timer");

let startTime, endTime, totalTimeTaken, sentence_to_write;

// const sentences = [
//   "The quick brown fox jumps over the lazy dog 1",
//   "The quick brown fox jumps over the lazy dog 2",
//   "The quick brown fox jumps over the lazy dog 3",
// ];

const errorChecking = (words) => {
  let num = 0;
  sentence_to_write = show_sentence.innerHTML;
  sentence_to_write = sentence_to_write.trim().split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i].toLowerCase() === sentence_to_write[i].toLowerCase()) {
      num++;
    }
  }
  return num;
};

const calculateTypingSpeed = (totalTimeTaken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords === "" ? 0 : totalWords.split(" ");

  actualWords = errorChecking(actualWords);

  if (actualWords !== 0) {
    let typing_speed = (actualWords / totalTimeTaken) * 60;
    typing_speed = Math.round(typing_speed);
    score.innerHTML = `Your typing speed is ${typing_speed} words per minute & you wrote ${actualWords} correct words out of ${sentence_to_write.length} & time taken is ${totalTimeTaken} secs`;
  } else {
    score.innerHTML = `Your typing speed is 0 words per minute & time taken is ${totalTimeTaken} secs`;
  }
};

let timerInterval,
  timeLeft = 30;

const endTypingTest = () => {
  clearInterval(timerInterval);
  btn.innerText = "Start";

  let date = new Date();
  endTime = date.getTime();

  totalTimeTaken = (endTime - startTime) / 1000;
  // console.log(totalTimeTaken)

  calculateTypingSpeed(Math.floor(totalTimeTaken));

  show_sentence.innerHTML = "";
  typing_ground.value = "";
};

const startTyping = async () => {
  show_sentence.innerHTML = "Loading...";

  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: { "X-Api-Key": "iMEr8dFmJrIp7LZJb3Gvag==tdVTctho9HuKKOJM" },
    });
    const data = await response.json();
    // console.log(data[0].quote)
    const sentence = data[0].quote;
    // let randomNumber = Math.floor(Math.random() * sentences.length);
    // console.log(randomNumber)
    show_sentence.innerHTML = sentence;

    typing_ground.value = "";
    typing_ground.focus();

    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done";

    timeLeft = 30;
    timerElement.textContent = timeLeft;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        typing_ground.setAttribute("disabled", "true");
        endTypingTest();
      }
    }, 1000);
  } catch (error) {
    show_sentence.innerHTML = "Failed to load quote. Please try again.";
    console.error("Error fetching quote:", error);
  }
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
