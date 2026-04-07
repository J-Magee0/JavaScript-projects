const textElement = document.getElementById("text");

const text = "Hello, welcome to my site.";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 222); // speed here
  }
}

let isDeleting = false;

function typeLoop() {
  if (!isDeleting) {
    textElement.textContent = text.substring(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1000);
      return;
    }
  } else {
    textElement.textContent = text.substring(0, index--);
    if (index === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeLoop, isDeleting ? 80 : 160);
}

typeLoop();

// setTimeout(typeWriter, 1000);
typeWriter();
