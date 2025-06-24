import AudioPlayer from "./audio-player.js";

document.addEventListener("DOMContentLoaded", function () {
  const player = new AudioPlayer({
    soundEnabled: true, // 노래넣을 거면 true, 안넣을거면 false
    autoPlay: true, // 자동재생할거면 true, 안할거면 false // 카카오에서만 됨
    soundFileUrl: './bgm.mp3',
    audioElementId: 'bgm',
    buttonElementId: 'playButton'
  });
  
  //BGM
  const playButton = document.getElementById("playButton");
  
  // 초기 상태는 play.png
  playButton.src = "img/play.png";
  playButton.addEventListener("click", function () {
    // 현재 오디오가 재생 중인지 여부를 확인
    if (player.audio.paused) {
      // 오디오가 멈춰있으면 재생
      player.play();
      playButton.src = "img/stop.png"; // 버튼 이미지를 stop.png로 변경
      console.log(playButton)
    } else {
      // 오디오가 재생 중이면 정지
      player.pause();
      player.audio.currentTime = 0; // 재생 위치를 처음으로 설정
      playButton.src = "img/play.png"; // 버튼 이미지를 play.png로 변경
      console.log(playButton)
    }
  });
});