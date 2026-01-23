const form = document.getElementById("registerForm");

    // Listen for from submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email  = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

   // Basic validation
  if(!email || !password) {
    alert("Email and password are required");
    return;
  }

  try {
    // Send request to backend
    const res = await fetch("http://localhost:4000/api/v1/users/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });

      const data = await res.json();

      if(!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration sucessful! Please login.");

      window.location.href = "/frontend/login/login.html";


  } catch (error) {
      console.error("Register error:", error);
      alert("Server error. Please try again later.");
  }
});