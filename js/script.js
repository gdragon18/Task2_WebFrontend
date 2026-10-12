/* ========== LOGIN PAGE ========== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");
  const rememberBox = document.getElementById("remember");

  // Restore email if "Remember me" was ticked previously
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberBox.checked = true;
  }

  // Show / Hide password
  toggleBtn.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Hide" : "Show";
  });

  // Validate and submit
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const passwordValid = passwordInput.value.length >= 6;

    emailInput.classList.toggle("is-invalid", !emailValid);
    passwordInput.classList.toggle("is-invalid", !passwordValid);

    if (!emailValid || !passwordValid) {
      return;
    }

    if (rememberBox.checked) {
      localStorage.setItem("rememberedEmail", emailInput.value.trim());
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    alert("Login successful!");
    window.location.href = "home.html";
  });
}

/* ========== HOME PAGE: COURSE MODAL ========== */
const courses = {
  html: {
    name: "HTML",
    desc: "HTML is the standard markup language for web pages. It defines the structure of a page using headings, paragraphs, images, and links."
  },
  css: {
    name: "CSS",
    desc: "CSS is used to style web pages. It controls colors, fonts, spacing, and layouts to make websites look attractive."
  },
  bootstrap: {
    name: "Bootstrap",
    desc: "Bootstrap is a front-end framework. It provides ready-made components and a responsive grid system to build websites quickly."
  },
  js: {
    name: "JavaScript",
    desc: "JavaScript makes web pages interactive. You can handle button clicks, validate forms, and update content dynamically."
  }
};

const courseModalEl = document.getElementById("courseModal");

if (courseModalEl) {
  const courseModal = new bootstrap.Modal(courseModalEl);

  document.querySelectorAll(".course-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const course = courses[button.dataset.course];
      document.getElementById("modalCourseName").textContent = course.name;
      document.getElementById("modalCourseDesc").textContent = course.desc;
      courseModal.show();
    });
  });
}