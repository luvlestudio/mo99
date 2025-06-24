class AudioPlayer {
  constructor(options = {}) {
    const {
      soundEnabled = false,
      autoPlay = false,
      soundFileUrl = '',
      audioElementId = 'bgm',
      buttonElementId = 'playButton'
    } = options;

    this.soundEnabled = soundEnabled;
    this.autoPlay = autoPlay;
    this.soundFileUrl = soundFileUrl;
    this.audioElementId = audioElementId;
    this.buttonElementId = buttonElementId;
    
    this.audio = null;
    this.audioContext = null;
    
    this.init();
  }

  init() {
    const buttonElement = document.getElementById(this.buttonElementId);
    buttonElement.src = 'img/play.png';
    buttonElement.addEventListener("click", function () {
      // 현재 오디오가 재생 중인지 여부를 확인
      if (this.audio.paused) {
        // 오디오가 멈춰있으면 재생
        this.play();
        buttonElement.src = "img/stop.png"; // 버튼 이미지를 stop.png로 변경
      } else {
        // 오디오가 재생 중이면 정지
        this.pause();
        this.audio.currentTime = 0; // 재생 위치를 처음으로 설정
        buttonElement.src = "img/play.png"; // 버튼 이미지를 play.png로 변경
      }
    });

    if (!this.soundEnabled) {
      const audioElement = document.getElementById(this.audioElementId);
      if (audioElement) audioElement.style.display = 'none';
      if (buttonElement) buttonElementId.style.display = 'none';
      return;
    }

    // AudioContext 초기화
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    // 오디오 엘리먼트 생성
    this.audio = new Audio();
    this.audio.src = this.soundFileUrl;
    this.audio.loop = true;

    // 자동 재생 설정
    if (this.autoPlay) {
      this.setupAutoPlay();
    } else {
      this.setupManualPlay();
    }
  }

  setupAutoPlay() {
    // 음소거 상태로 재생 시작
    this.audio.muted = true;
    this.audio.play();

    // 사용자 상호작용 시 음소거 해제
    const unmuteAudio = () => {
      this.audio.muted = false;
      document.removeEventListener('touchstart', unmuteAudio);
      document.removeEventListener('mousemove', unmuteAudio);
      if (!this.audio.muted && !this.audio.paused) {
        const buttonElement = document.getElementById(this.buttonElementId);
        buttonElement.src = 'img/stop.png';
      }
    };

    document.addEventListener('touchstart', unmuteAudio, { passive: true });
    document.addEventListener('mousemove', unmuteAudio, { passive: true });
  }

  setupManualPlay() {
    const audioElement = document.getElementById(this.audioElementId);
    if (!audioElement) return;

    const playButton = document.createElement('button');
    playButton.onclick = () => this.audio.play();
    
    audioElement.appendChild(playButton);
  }

  play() {
    if (this.audio) this.audio.play();
  }

  pause() {
    if (this.audio) this.audio.pause();
  }

  toggleMute() {
    if (this.audio) this.audio.muted = !this.audio.muted;
  }
}

export default AudioPlayer;