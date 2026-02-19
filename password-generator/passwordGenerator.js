const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*-+=?";

const generateBtn = document.getElementById("generate-btn");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-btn");

function generate() {
  let char = "";

  if (document.getElementById("lowercase-option").checked) {
    char += lowercase;
  }
  if (document.getElementById("uppercase-option").checked) {
    char += uppercase;
  }
  if (document.getElementById("numbers-option").checked) {
    char += numbers;
  }
  if (document.getElementById("special-option").checked) {
    char += symbols;
  }

  if (char != "") {
    const legnth = Number(document.getElementById("password-length").value);
    let password = "";

    for (let i = 0; i < legnth; i++) {
      const index = Math.floor(Math.random() * char.length);
      password += char[index];
    }

    result.value = password;
  }
}

function copyPassword() {
  const copyText = result;

  copyText.select();
  copyText.setSelectionRange(0, copyText.value.legnth);

  navigator.clipboard.writeText(copyText.value);

  alert("Password Copied: " + copyText.value);
}

copyBtn.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generate);
