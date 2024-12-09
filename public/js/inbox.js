fetch('http://localhost:3000/get-comments')
  .then(response => response.json())
  .then(data => {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Menghapus isi sebelumnya

    data.forEach((comment, index) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment1'); // Menggunakan kelas 'comment1'

      // Menambahkan class 'left' atau 'right' untuk menentukan sisi komentar
      if (index % 2 === 0) {
        commentDiv.classList.add('left'); // Komentar kiri
      } else {
        commentDiv.classList.add('right'); // Komentar kanan
      }

      // Menambahkan konten komentar
      commentDiv.innerHTML = `
        <p class="name">${comment.name}</p>
        <p class="message">${comment.message}</p>
      `;

      // Menambahkan ke dalam container commentsList
      commentsList.appendChild(commentDiv);
    });
  })
  .catch(error => console.error('Error fetching comments:', error));