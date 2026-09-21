const video = document.getElementById("video");
const coin = document.getElementById("coin");

video.addEventListener("click", () => {
  // Play video
  video.play();

  // Random coin flip
  let flipResult = Math.random() < 0.5 ? "heads" : "tails";

  // Reset coin before animation
  coin.style.transform = "rotateY(0deg)";

  // Animate coin spin
  setTimeout(() => {
    if (flipResult === "heads") {
      coin.style.transform = "rotateY(1800deg)"; // multiple spins ending on heads
    } else {
      coin.style.transform = "rotateY(1980deg)"; // multiple spins ending on tails
    }
  }, 100);
});
