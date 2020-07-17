//        AUDIO       //
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = new Audio();
audioElement.src = './janet.mp3';
let audioSrc = audioCtx.createMediaElementSource(audioElement);
let wi = window.innerWidth;
let h = window.innerHeight;

const amount = 100,
  fData = new Uint8Array(amount),
  analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
// analyser.fftSize = 256;
audioSrc.connect(audioCtx.destination);
let audioVisual;

//      UI      //
const trigger = document.querySelector("button");
function startTheShow() {
  if (audioElement.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
}
function playTrack() {
  audioElement.play();
  trigger.innerHTML = "pause";
}
function pauseTrack() {
  audioElement.pause();
  trigger.innerHTML = "play";
}
function toStart() {
  trigger.innerHTML = "play";
  audioElement.currentTime = 0;
}


trigger.addEventListener("click", startTheShow.bind(this));
audioElement.addEventListener("ended", toStart.bind(this));

function setup(){
  createCanvas(wi, h);
  background(0,0,0);
}

function draw(){
  analyser.getByteFrequencyData(fData);
  const bgcol = Math.min(fData[0], 255);
  fill(0,0,bgcol);
  rect(0, 0, wi, h);
  for (let i = 0; i < amount; i++) {
    const col = Math.min(fData[i], 255);
    colorMode(HSB, 255);
    fill(col, 255, 255);
    // stroke(255);
    ellipse(wi/amount*i, h - (fData[i]+30), 60, 60);
  }
}

function windowResized() {
  wi = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(wi, h)
}
