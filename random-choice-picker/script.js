const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

const createtags = (input) => {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());
  tagsEl.innerHTML = "";
  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerHTML = tag;
    tagsEl.appendChild(tagEl);
  });
};

const pickRandTag = (tags) => {
  return tags[Math.floor(Math.random() * tags.length)];
};

const highlightTag = (tag) => tag.classList.add("highlight");
const unHighlightTag = (tag) => tag.classList.remove("highlight");

const randSelect = () => {
  const tags = tagsEl.querySelectorAll(".tag");
  const times = 30;
  const internval = setInterval(() => {
    const randTag = pickRandTag(tags);
    highlightTag(randTag);
    setTimeout(() => {
      unHighlightTag(randTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(internval);
    setTimeout(() => {
      const randTag = pickRandTag(tags);
      highlightTag(randTag);
    }, 100);
  }, times * 100);
};

textarea.focus();
textarea.addEventListener("keyup", (e) => {
  createtags(e.target.value);
  if (e.key === "Enter") {
    setTimeout(() => (e.target.value = ""), 10);
    randSelect();
  }
});
