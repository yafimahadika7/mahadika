// Menampilkan daftar komentar yang telah disubmit
document.addEventListener("DOMContentLoaded", function() {
    // Fungsi untuk memuat komentar dari server
    function loadComments() {
      fetch('/comments')  // Endpoint untuk mengambil daftar komentar
        .then(response => response.json())
        .then(data => {
          const commentsList = document.getElementById("commentsList");
          commentsList.innerHTML = ''; // Menghapus komentar lama
  
          data.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");
  
            // Menambahkan nama, pesan, dan tanggal komentar
            commentDiv.innerHTML = `
              <p class="name">${comment.name}</p>
              <p class="message">${comment.message}</p>
              <p class="date">${new Date(comment.created_at).toLocaleString()}</p>
            `;
  
            commentsList.appendChild(commentDiv);
          });
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
  
    // Memanggil fungsi loadComments saat halaman dimuat
    loadComments();
  
    // Menambahkan event listener untuk form submit
    document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Mencegah form dikirimkan secara default
  
      const name = document.getElementById("name").value;
      const message = document.querySelector("textarea[name='message']").value;
  
      if (name.length < 4 || message.trim() === "") {
        document.getElementById("errormessage").textContent = "Please fill out all fields correctly.";
        return;
      }
  
      fetch("/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, message: message })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          document.getElementById("sendmessage").style.display = "block"; // Menampilkan pesan sukses
          document.getElementById("errormessage").textContent = ""; // Menghapus pesan error
          document.getElementById("contactForm").reset(); // Mereset form
          loadComments(); // Memuat ulang daftar komentar
        } else {
          document.getElementById("errormessage").textContent = "Something went wrong. Please try again.";
        }
      })
      .catch(error => {
        document.getElementById("errormessage").textContent = "Error: " + error.message;
      });
    });
  });  