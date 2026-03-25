const btns = document.querySelectorAll(".ripple");

function getClickPosition(e, el) {
  const x = e.clientX;
  const y = e.clientY;
  const btnTop = Element.offsetTop;
  const btnLeft = Element.offsetLeft;

  return { xInside: x - btnLeft, yInside: y - btnTop };
}

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const { xInside, yInside } = getClickPosition(e, this);
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});
