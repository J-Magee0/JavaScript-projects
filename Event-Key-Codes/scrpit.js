const insert = document.getElementById("insert");

window.addEventListener("keydown", (e) => {
  insert.innerHTML = `
  <div class="key"> 
    ${e.key === " " ? "Space" : e.key}
    <small>event.key</small>
  </div>
  <div class="key red"> 
    ${e.keyCode}
    <small>event.keyCode (old)</small>
  </div>
  <div class="key green"> 
    ${e.code}
    <small>event.code (new)</small>
  </div>`;
});
