//        AUDIO       //
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = new Audio();
audioElement.src = './cedric.mp3';
let audioSrc = audioCtx.createMediaElementSource(audioElement);
let wi = window.innerWidth;
let h = window.innerHeight;
let xincr = 0, yincr = 0;

const rows = 12, cols = 16, amount = rows * cols,
  fData = new Uint8Array(amount),
  analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);
let audioVisual;

//      UI      //
const trigger = document.querySelector("button");

function startTheShow() {
  audioCtx.resume().then(() => {
    if (audioElement.paused) {
    playTrack();
    trigger.innerHTML = '';
    } else {
      pauseTrack();
      setTimeout(() => {
        trigger.innerHTML = 'play';
      }, 500)
    }
  });

}

function playTrack() {
  audioElement.play();
}
function pauseTrack() {
  audioElement.pause();
}
function toStart() {
  audioElement.currentTime = 0;
  trigger.innerHTML = 'play';
}
trigger.addEventListener("click", startTheShow.bind(this));
audioElement.addEventListener("ended", toStart.bind(this));

//      VISUALS      //
function setup(){
  createCanvas(wi, h);
  background(255,255,255);
}
function draw(){
  analyser.getByteFrequencyData(fData);
  for (let i = 0; i < amount; i++) {
    if ( i % cols === 0 && i !== 0){
      xincr = 0;
      yincr += h/rows
    }
    if ( yincr > h ){
      yincr = 0
    }
    const col = Math.min(fData[i], 255);
    colorMode(HSB, 255);
    fill(col, 255, 255);
    noStroke();
    rect(xincr, yincr, wi/cols, h/rows);
    xincr += wi/cols;
  }
}
function windowResized() {
  wi = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(wi, h)
}
