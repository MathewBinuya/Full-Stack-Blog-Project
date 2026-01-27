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








// read post
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

    const postsData = await resGet.json();

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
      <h5>Name: ${post.name} (Age: ${post.age})</h5>
      <p class="desc-text">Description: ${post.description}</p>
      <textarea class="desc-input" style="display:none;">${post.description}</textarea>
      <button class="edit-btn" data-id="${post._id}">Edit</button>
      <button class="delete-btn" data-id="${post._id}">Delete</button>
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



// update posts
document.addEventListener("click", async (e) => {
  if(!e.target.classList.contains("edit-btn")) return;


  const button = e.target;
  const postItem = button.closest(".post-item");
  const postId = button.dataset.id;


  const text = postItem.querySelector(".desc-text");
  const input = postItem.querySelector(".desc-input");


  if(button.textContent === "Edit") {
    text.style.display = "none";
    input.style.display = "block";
    button.textContent = "Save";
    input.focus();
    return;
  }


  if(button.textContent === "Save") {
     const newDescription = input.value;

    try {

      const res = await fetch (`http://localhost:4000/api/v1/posts/update/${postId}`, 
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({description: newDescription}),
      }
      );

      if(!res.ok) throw new Error("Update failed");

      text.textContent = newDescription;
      text.style.display = "block";
      input.style.display = "none";
      button.textContent  = "Edit";

    } catch (error) {
      console.error("Creating text error", error);
      alert("Please try again later.");
    }
 }

});

// delete post 
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const postId = e.target.dataset.id;
  const postItem = e.target.closest(".post-item");
  if (!postItem) return;

  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(
      `http://localhost:4000/api/v1/posts/delete/${postId}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Delete failed");

    postItem.remove(); // instant UI update

  } catch (error) {
    console.error(error);
    alert("Failed to delete post");
  }
});








document.getElementById('logout').addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/frontend/index.html";
})





