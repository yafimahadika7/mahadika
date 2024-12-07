  // Ambil elemen modal
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  // Tambahkan event listener ke semua gambar
  document.querySelectorAll(".certificate-item a img").forEach((img) => {
    img.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt || "";
    });
  });

  // Event untuk menutup modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Tutup modal saat klik di luar gambar
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Tambahkan event listener ke semua gambar
  document.querySelectorAll(".portfolio-item a img").forEach((img) => {
    img.addEventListener("click", (event) => {
      event.preventDefault();
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt || "";
    });
  });

  // Event untuk menutup modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Tutup modal saat klik di luar gambar
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };