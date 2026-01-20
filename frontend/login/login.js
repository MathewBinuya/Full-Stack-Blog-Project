const form = document.getElementById('loginForm');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch("http://localhost:4000/api/v1/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
   });


   const data = await res.json();

   if(!res.ok) {
    alert(data.message);
    return;
   }

  localStorage.setItem("token", data.token);

  window.location.href = "/frontend/home-page/home.html";

  } catch (error) {
    console.error("Login error: ", error);
    alert("Please try again later.");

  }

});