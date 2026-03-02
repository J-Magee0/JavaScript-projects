const sounds = [
  "few-moments",
  "ack",
  "anderdingus",
  "anime-wow",
  "bone-crack",
  "brother-eww",
  "bruh",
  "censor",
  "sword-hit",
  "daddy-chill",
  "do-you-know-the-muffin-man",
  "downer",
  "dun-dun",
  "eat-me",
  "fahh",
  "gopgop",
  "heavenly-music",
  "hub",
  "huh-cat",
  "great-crime",
  "ahhh",
  "laugh-annoying",
  "hello-there",
  "this-guy-stinks",
  "pedro",
  "raaaar",
  "rehehehe",
  "do-it",
  "smoke-alarm",
  "muffin-man-scream",
  "muffin-man",
  "hell-no",
  "where-are-you-going",
];

const btns = document.getElementById("btns");

const stopSounds = () => {
  sounds.forEach((sound) => {
    const currentSound = document.getElementById(sound);
    currentSound.pause();
    currentSound.currentTime = 0;
  });
};

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.innerText = sound;
  btn.addEventListener("click", () => {
    stopSounds();
    document.getElementById(sound).play();
  });
  btns.appendChild(btn);
});
