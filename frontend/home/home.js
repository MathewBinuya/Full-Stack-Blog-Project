const postForm = document.querySelector('#postForm');

postForm.addEventListener("submit", async (e) => {
e.preventDefault();

    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const age = document.querySelector('#age').value;

    if(!name || !description || !age) {
      alert("All field are required");
      return;
    }

  try {
  
    const resCreate = await fetch("http://localhost:4000/api/v1/posts/create", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name,
      age: Number(age),
      description,
      }),
    });

    const createData = await res.json();

    if(!resCreate.ok) {
      alert(createData.message);
      return;
    }
    
    alert("Sucessfully Created");


  } catch (error) {
    console.error("Creating text error", error);
    alert("Please try again later.");
  }
});



async function readPosts() {
  const container = document.querySelector('#uploaded-text');
  container.innerHTML = "<h4>Loading posts...</h4>";

  try {
    // read API
    const resGet = await fetch("http://localhost:4000/api/v1/posts/get");

    if(!resGet.ok) {
      container.innerHTML = "<p>Failed to load posts.</p>";
      return;
    } 

    const postsData = await res.json();

    if(postsData.length === 0) {
      container.innerHTML = "<h4>No posts yet.</h4>"
      return;
    }

    // clear container
    container.innerHTML = "";

    postsData.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add("post-item");
      postElement.innerHTML = `
      <hr>
      <h4>Name: ${post.name} (Age: ${post.age})</h4>
      <p>Description: ${post.description}</p>
      `;

      container.appendChild(postElement);
    });

  } catch (error) {
    console.error("Creating text error", error);
    alert("Please try again later.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
 readPosts();
});




document.getElementById('logout').addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/index.html";
})





