console.log(
  "Doesn't really matter if this is here or not, just a placeholder for the file."
);
// the consts
const startbtn = document.getElementById("start-button");
const startmenu = document.getElementById("startmenu");
const explorer = document.getElementById("explorer");
const explorerWindow = document.getElementById("explorer-app");
const explorerclose = document.getElementById("explorer-x");
const explorermin = document.getElementById("explorer-min");
const explorermax = document.getElementById("explorer-max");
const contextMenu = document.getElementById("custom-context-menu");
const explorerIcon = document.getElementById("explorer");
const explorerAgain = document.getElementById("explorer-sm");
const mplp = document.getElementById("My PC");
const ldf = document.getElementById("localdisk-folder");
const cDriveFolder1 = document.getElementById("C-drive-folder");
const cDriveFolder2 = document.querySelectorAll(".small-folder-preview");
const cDriveFolder3 = document.querySelectorAll(".small-folder-item");
const cDriveFolder4 = document.querySelectorAll(".small-folder-icon");
const cDriveFolder5 = document.querySelectorAll(".small-folder-label");
const mpdiv = document.getElementById("mypc-preview");
const loader = document.querySelector('.boot-loader');
loader.classList.toggle('inverted');
const explorerWindowDiv = document.querySelector('#explorer-app .window');
const taskbar = document.getElementById("taskbar");
const profile = document.getElementById("login-screen");
const profileSignIn = document.querySelector(".login-button");
const prfl = document.getElementById("prfl");


taskbar.style.display = "none";
profileSignIn.addEventListener("click", () => {
  console.log("Profile Sign In clicked!");
  
  taskbar.style.display = "flex";
  profile.style.display = "none";
  prfl.style.display = "none";
});

let isDragging = false;
let dragOffsetX, dragOffsetY;

explorerWindowDiv.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = explorerWindow.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  explorerWindow.style.position = 'absolute';
  explorerWindow.style.userSelect = 'none';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  explorerWindow.style.userSelect = '';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  explorerWindow.style.left = `${e.clientX - dragOffsetX}px`;
  explorerWindow.style.top = `${e.clientY - dragOffsetY}px`;
});

const bootscreen = document.getElementById("boot-screen");
bootscreen.style.display = 'block';

setTimeout(() => {
  bootscreen.style.display = 'none';
}, 10000);

ldf.addEventListener("click", () => {
  console.log("Local Disk (C:) clicked!");
  const isHidden = window.getComputedStyle(cDriveFolder1).display === "none";
  const newDisplay = isHidden ? "grid" : "none";
  cDriveFolder1.style.display = newDisplay;
  cDriveFolder2.forEach((el) => (el.style.display = newDisplay));
  cDriveFolder3.forEach((el) => (el.style.display = newDisplay));
  cDriveFolder4.forEach((el) => (el.style.display = newDisplay));
  cDriveFolder5.forEach((el) => (el.style.display = newDisplay));
  mpdiv.style.display = isHidden ? "none" : "block";
});

mplp.addEventListener("click", () => {
  console.log("My PC clicked!");
  if (mpdiv.style.display === "none" || mpdiv.style.display === "") {
    mpdiv.style.display = "block";
  } else {
    mpdiv.style.display = "none";
  }
});
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.display = "block";
  console.log("Context menu opened at", e.clientX, e.clientY);
});

explorerAgain.addEventListener("click", () => {
  console.log("Explorer icon clicked!");
  if (
    explorerWindow.style.display === "none" ||
    explorerWindow.style.display === ""
  ) {
    explorerWindow.style.display = "block";
  } else {
    explorerWindow.style.display = "none";
  }
});

document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

explorermax.addEventListener("click", () => {
  console.log("Explorer maximize button clicked!");
  if (
    explorerWindow.style.height === "calc(100% - 40px)" &&
    explorerWindow.style.width === "100%"
  ) {
    explorerWindow.style.height = "calc(40% - 40px)";
    explorerWindow.style.width = "calc(40% - 40px)";
  } else {
    explorerWindow.style.height = "calc(100% - 40px)";
    explorerWindow.style.width = "calc(100%)";
  }
});
explorerclose.addEventListener("click", () => {
  console.log("Explorer close button clicked!");
  explorerWindow.style.display = "none";
});

explorer.addEventListener("click", () => {
  console.log("Explorer clicked!");
  if (
    explorerWindow.style.display === "none" ||
    explorerWindow.style.display === ""
  ) {
    explorerWindow.style.display = "block";
  } else {
    explorerWindow.style.display = "none";
  }
});

startbtn.addEventListener("click", () => {
  console.log("Start button clicked!");
  if (startmenu.style.display === "none" || startmenu.style.display === "") {
    startmenu.style.display = "block";
  } else {
    startmenu.style.display = "none";
  }
});

function updateTime() {
  const timeEl = document.getElementById('taskbar-time');
  const dateEl = document.getElementById('taskbar-date');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const date = now.toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  
  timeEl.textContent = `${hours}:${minutes}`;
  dateEl.textContent = date;
}

setInterval(updateTime, 1000);
updateTime();
