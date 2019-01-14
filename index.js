let moment = require('moment');
let momentDurationFormatSetup = require("moment-duration-format");

let lastTime = Date.now();
let rTime = 0;
let gamma = 1;
let time = 0;

document.addEventListener('DOMContentLoaded', () => {
  const sliderNode = document.querySelector('#speedSlider');
  
  const computeGamma = () => {
    const percentOfSpeedOfLight = sliderNode.value  
    let gamma = 1/Math.sqrt(1 - Math.pow(percentOfSpeedOfLight,2))
    return gamma
  }

  const relativeTimeNode = document.querySelector('#relativeTime');
  const stationaryTimeNode = document.querySelector('#stationaryTime');
  const descriptionParagraph = document.querySelector('#sliderDescription');
  
  const renderTimers = (rTime, time) => {
    relativeTimeNode.innerText = moment.duration(rTime).format('mm:ss');
    stationaryTimeNode.innerText = moment.duration(time).format('mm:ss'); 
    descriptionParagraph.innerText = sliderNode.value;
  };

  const tick = () => {
    const now = Date.now();
    const sinceLast = now - lastTime;
    gamma = computeGamma()
    time += sinceLast;
    rTime += (sinceLast / gamma);
    renderTimers( rTime, time);
    lastTime = now;
  };

  setInterval(tick, 100);
});

