// Mengambil data komentar dari server dan menampilkan
fetch('/comments')
  .then(response => response.json())
  .then(comments => {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = ''; // Menghapus isi sebelumnya

    comments.forEach((comment, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      // Menambahkan class 'right' atau 'left' untuk menentukan sisi komentar
      if (index % 2 === 0) {
        commentDiv.classList.add("left"); // Komentar kiri
      } else {
        commentDiv.classList.add("right"); // Komentar kanan
      }

      // Menambahkan konten komentar
      commentDiv.innerHTML = `
        <p class="name">${comment.name}</p>
        <p class="message">${comment.message}</p>
        <p class="date">${new Date(comment.created_at).toLocaleString()}</p>
      `;

      // Menambahkan ke dalam container commentsList
      commentsList.appendChild(commentDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching comments:', error);
  });