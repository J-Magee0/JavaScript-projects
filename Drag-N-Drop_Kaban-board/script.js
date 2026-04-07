/* ============================================================
   KANBAN BOARD — script.js
   Features:
   - Add tasks to the selected column via the input form
   - Move tasks between columns using Begin / Done buttons
   - Remove button on completed tasks
   - Drag-and-drop tasks between columns
   - Persists tasks to localStorage so they survive a page refresh
   ============================================================ */

// ── Column order used for button logic ──────────────────────
const COLUMNS = ["todo", "inProgress", "done"];

// ── DOM references ───────────────────────────────────────────
const input = document.getElementById("input");
const progress = document.getElementById("progress");
const addBtn = document.getElementById("addBtn");
const columns = {
  todo: document.getElementById("todo"),
  inProgress: document.getElementById("inProgress"),
  done: document.getElementById("done"),
};

// ── Drag state ───────────────────────────────────────────────
let draggedCard = null; // the .card_content element being dragged

/* CREATE A TASK CARD ELEMENT */
function createTaskCard(text, status) {
  const colIndex = COLUMNS.indexOf(status);

  // Outer wrapper — the draggable unit
  const content = document.createElement("div");
  content.classList.add("card_content");
  content.setAttribute("draggable", "true");
  content.setAttribute("aria-grabbed", "false");
  content.dataset.status = status;

  // Inner tab row
  const tab = document.createElement("div");
  tab.classList.add("card_tab");

  // Task label
  const label = document.createElement("span");
  label.classList.add("tabText");
  label.textContent = text;

  // Button container — only show buttons that make sense for the column
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn_container");

  // "Begin" button — only in To Do column
  if (colIndex < 1) {
    const beginBtn = document.createElement("button");
    beginBtn.classList.add("begin");
    beginBtn.dataset.action = "begin";
    beginBtn.setAttribute("aria-label", "Move to In Progress");
    beginBtn.textContent = "Begin";
    btnContainer.appendChild(beginBtn);
  }

  // "Done" button — in To Do and In Progress columns
  if (colIndex < 2) {
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("advance", "done");
    doneBtn.dataset.action = "done";
    doneBtn.setAttribute("aria-label", "Move to Done");
    doneBtn.textContent = "Done";
    btnContainer.appendChild(doneBtn);
  }

   // "Remove" button — only in the Done column
  if (status === "done") {
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.dataset.action = "remove";
    removeBtn.setAttribute("aria-label", "Remove task");
    removeBtn.textContent = "✕";
    btnContainer.appendChild(removeBtn);
  }

  tab.appendChild(label);
  tab.appendChild(btnContainer);
  content.appendChild(tab);

  // Attach drag and button listeners to this card
  attachCardListeners(content);

  return content;
}

/* ATTACH LISTENERS TO A CARD */
function attachCardListeners(card) {
  // ── Drag events on the card itself ──
  card.addEventListener("dragstart", onDragStart);
  card.addEventListener("dragend", onDragEnd);

  // ── Button clicks (event delegation on the card) ──
  card.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.dataset.action; // "begin" or "done"
    const curStatus = card.dataset.status;
    const curIndex = COLUMNS.indexOf(curStatus);


    // Handle remove — animate out then delete
    if (action === "remove") {
      removeCard(card);
      return;
    }

    let nextStatus;
    if (action === "begin") nextStatus = COLUMNS[curIndex + 1]; // one step forward
    if (action === "done") nextStatus = "done"; // jump to done

    if (nextStatus && nextStatus !== curStatus) {
      moveCard(card, nextStatus);
    }
  });
}

/*  MOVE A CARD TO A NEW COLUMN */
function moveCard(card, newStatus) {
  const targetColumn = columns[newStatus];
  if (!targetColumn) return;

  // Remove old card and replace with a freshly built one for the new column
  // (so buttons update correctly)
  const taskText = card.querySelector(".tabText").textContent;
  card.remove();

  const newCard = createTaskCard(taskText, newStatus);
  targetColumn.appendChild(newCard);

  saveTasks();
}

/* REMOVE A CARD FROM THE DONE COLUMN   */
function removeCard(card) {
  // Animate out before removing from the DOM
  card.classList.add("removing");
  card.addEventListener("animationend", () => {
    card.remove();
    saveTasks();
  }, { once: true });
}

/* ADD TASK FROM THE INPUT FORM */
function addTask() {
  const text = input.value.trim();
  const status = progress.value;

  if (!text) {
    input.focus();
    input.style.borderBottomColor = "tomato";
    setTimeout(() => (input.style.borderBottomColor = ""), 800);
    return;
  }

  const card = createTaskCard(text, status);
  columns[status].appendChild(card);

  input.value = "";
  input.focus();
  saveTasks();
}

// Add button click
addBtn.addEventListener("click", addTask);

// Allow pressing Enter in the text input to add a task
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

/* DRAG-AND-DROP */

// ── Drag starts on a .card_content ──
function onDragStart(e) {
  draggedCard = e.currentTarget;
  draggedCard.setAttribute("aria-grabbed", "true");

  // Store the task text so we can recreate the card in the new column
  e.dataTransfer.setData(
    "text/plain",
    draggedCard.querySelector(".tabText").textContent,
  );
  e.dataTransfer.effectAllowed = "move";

  // Slight delay so the ghost image renders before we style the original
  setTimeout(() => draggedCard.classList.add("dragging"), 0);
}

function onDragEnd() {
  if (draggedCard) {
    draggedCard.classList.remove("dragging");
    draggedCard.setAttribute("aria-grabbed", "false");
    draggedCard = null;
  }

  // Remove all drop-zone highlights
  Object.values(columns).forEach((col) => col.classList.remove("drag-over"));
}

// ── Drop zones on each .card column ──
Object.values(columns).forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // required to allow dropping
    e.dataTransfer.dropEffect = "move";
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", (e) => {
    // Only remove highlight when leaving the column entirely (not a child)
    if (!column.contains(e.relatedTarget)) {
      column.classList.remove("drag-over");
    }
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.classList.remove("drag-over");

    const newStatus = column.id; // "todo" | "inProgress" | "done"

    if (draggedCard && draggedCard.dataset.status !== newStatus) {
      moveCard(draggedCard, newStatus);
      draggedCard = null; // moveCard removes the old element; clear the ref
    }
  });
});

/*  PERSIST TASKS WITH LOCALSTORAGE */
function saveTasks() {
  const data = {};

  COLUMNS.forEach((col) => {
    const cards = columns[col].querySelectorAll(".card_content");
    data[col] = Array.from(cards).map(
      (c) => c.querySelector(".tabText").textContent,
    );
  });

  localStorage.setItem("kanban_tasks", JSON.stringify(data));
}

function loadTasks() {
  const raw = localStorage.getItem("kanban_tasks");
  if (!raw) return;

  try {
    const data = JSON.parse(raw);

    COLUMNS.forEach((col) => {
      // Remove the placeholder example task before loading saved ones
      columns[col].querySelectorAll(".card_content").forEach((c) => c.remove());

      (data[col] || []).forEach((text) => {
        const card = createTaskCard(text, col);
        columns[col].appendChild(card);
      });
    });
  } catch (err) {
    console.warn("Could not load saved tasks:", err);
  }
}

loadTasks();
