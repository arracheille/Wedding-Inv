const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", function () {
  const openInvitation = document.getElementById("openInvitation");
  const music = document.getElementById("music");

  openInvitation.addEventListener("click", function (e) {
    e.preventDefault();
    music.play();
    localStorage.setItem("musicPlaying", "true");
    window.location.href = openInvitation.href;
  });
  window.addEventListener("beforeunload", function () {
    if (music) {
      music.pause();
      localStorage.setItem("musicTime", music.currentTime);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fixedMusicElement = document.getElementById("fixedMusicElement");
  let music = new Audio("../audio/Lana Del Rey - Young and Beautiful Symphonic Orchestra Cover.mp3");
  music.loop = true;

  if (localStorage.getItem("musicPlaying") === "true") {
    const musicTime = localStorage.getItem("musicTime");
    if (musicTime) {
      music.currentTime = parseFloat(musicTime);
    }
    music.play();
    fixedMusicElement.innerHTML = '<i class="fa-solid fa-compact-disc rotating"></i>';
  } else {
    fixedMusicElement.innerHTML = '<i class="fa-solid fa-circle-pause rotating"></i>';
  }

  fixedMusicElement.addEventListener("click", function () {
    const icon = fixedMusicElement.querySelector("i");
    if (music.paused) {
      music.play();
      icon.classList.remove("fa-circle-pause");
      icon.classList.add("fa-compact-disc", "rotating");
      localStorage.setItem("musicPlaying", "true");
    } else {
      music.pause();
      icon.classList.remove("fa-compact-disc", "rotating");
      icon.classList.add("fa-circle-pause");
      localStorage.setItem("musicPlaying", "false");
    }
    icon.classList.add("rotating");
  });

  window.addEventListener("beforeunload", function () {
    if (music) {
      localStorage.setItem("musicTime", music.currentTime);
    }
  });
});
