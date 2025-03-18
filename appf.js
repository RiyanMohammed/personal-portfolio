const inputs = document.querySelectorAll(".input");
const form = document.querySelector("form");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value.trim() === "") {
    parent.classList.remove("focus");
  }
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.className = `notification ${type}`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function validateForm(event) {
  event.preventDefault(); // Prevent form submission
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  inputs.forEach((input) => {
    const parent = input.parentNode;
    const errorText = parent.querySelector(".error-text");

    if (!errorText) {
      errorText = document.createElement("span");
      errorText.classList.add("error-text");
      parent.appendChild(errorText);
    }

    if (input.value.trim() === "") {
      errorText.textContent = "This field is required";
      parent.classList.add("error");
      isValid = false;
    } else {
      errorText.textContent = "";
      parent.classList.remove("error");

      if (input.type === "email" && !emailPattern.test(input.value)) {
        errorText.textContent = "Enter a valid email";
        parent.classList.add("error");
        isValid = false;
      }
    }
  });

  if (isValid) {
    showNotification("Form submitted successfully!", "success");
    setTimeout(() => {
      form.submit();
    }, 1000);
  } else {
    showNotification("Please fix the errors before submitting.", "error");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

form.addEventListener("submit", validateForm);

// Add CSS for notification
const style = document.createElement("style");
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    opacity: 0.9;
    transition: opacity 0.5s ease-in-out;
  }
  .notification.success { background: green; }
  .notification.error { background: red; }
`;
document.head.appendChild(style);
