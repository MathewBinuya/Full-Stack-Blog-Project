const form = document.getElementById('useForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(!email || !password) {
    alert('Email and password are required');
    return;
  }

  try {
    const res = await fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: { 'Content-Type ': 'application/json'},
      body: JSON.stringify({email, password})
    
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || 'Failed to create user');
    }

    const data = await res.json();
    console.log('User created: ', data);
     
    form.reset(); // clear form after sucess
    

  } catch (error) {
    console.error(err);
    alert(err.message);
  }
}