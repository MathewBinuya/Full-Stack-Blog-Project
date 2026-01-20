document.getElementById('logout').addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/index.html";
})