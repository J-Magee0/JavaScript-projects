const light = document.querySelector("#bulb");
const canvas = document.querySelector("#canvas");

light.addEventListener("click", function () {
  light.classList.toggle("is-on");
  canvas.classList.toggle("dark");
});
