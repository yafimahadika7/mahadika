document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form dikirimkan secara default

    // Ambil nilai input dari form
    const name = document.getElementById("name").value;
    const message = document.querySelector("textarea[name='message']").value;

    // Validasi input
    if (name.length < 4 || message.trim() === "") {
      document.getElementById("errormessage").textContent = "Please fill out all fields correctly.";
      return;
    }

    // Kirim data ke server menggunakan fetch (AJAX)
    fetch("/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById("sendmessage").style.display = "block"; // Menampilkan pesan sukses
        document.getElementById("errormessage").textContent = ""; // Menghapus pesan error
        document.getElementById("contactForm").reset(); // Mereset form
      } else {
        document.getElementById("errormessage").textContent = "Something went wrong. Please try again.";
      }
    })
    .catch(error => {
      document.getElementById("errormessage").textContent = "Error: " + error.message;
    });
  });