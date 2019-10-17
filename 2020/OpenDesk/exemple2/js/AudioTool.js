/**
 * AUDIO tool
 * Create a player or a MIC
 * Run getByteFrequencyData
 * or getByteTimeDomainData
 *
 * and output data as numbers
 */
class AudioTool {
  constructor(mp3) {
    this.soundURL = mp3 || null;
    this.audioContext = null;
    this.audio = null;
    this.isPlaying = false;
    // MIC stuff
    this.stream = null;
    this.analyserNode = null;
    this.data = [];
    this.dataWave = [];
    // fourrier transform result
    // A higher value will result in more details in the frequency domain but
    // fewer details in the time domain.
    this.size = 2048;
    this.setup();
  }

  isAudioContextSupported() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      return true;
    } else {
      return false;
    }
  }

  setup() {
    if (this.isAudioContextSupported()) {
      this.audioContext = new AudioContext();
      // Setup audio stuff
      this.update(this.soundURL);
    } else {
      alert('this browser doesn\'t support the Web Audio API. Come on...');
    }
  }

  update(url) {
    if (url != null) {
      if (this.audio == null) {
        this.audio = new Audio();
        this.audio.controls = true;
        this.audio.load();
        this.audio.src = url;
        document.body.appendChild(this.audio);
      }
      this.mic = null;
      this.broadcast();
    } else {
      try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
            {
              'audio': {
                'mandatory': {
                  'googEchoCancellation': 'false',
                  'googAutoGainControl': 'false',
                  'googNoiseSuppression': 'false',
                  'googHighpassFilter': 'false'
                },
                'optional': []
              },
            },
            this.onStream.bind(this), this.noStream.bind(this));
      } catch (e) {
        alert('getUserMedia threw exception :' + e);
      }
    }
  }

  broadcast() {
    if (this.source == null) {
      this.source = this.audioContext.createMediaElementSource(this.audio);
    }
    // SOUND ANALYSIS HAPPENS HERE
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  }

  onStream(stream) {
    this.stream = stream;
    this.mic = this.audioContext.createMediaStreamSource(stream);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.mic.connect(this.analyserNode);
    // two kind of analysis
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  }

  noStream() {
    alert('problem with mic');
  }

  toggle() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    };
    this.isPlaying = !this.isPlaying;
  }

  updateFrequency() {
    // 0-256
    this.analyserNode.getByteFrequencyData(this.data);
  }


  updateWave() {
    // 0-256
    this.analyserNode.getByteTimeDomainData(this.dataWave);
  }

  reset() {
    if (this.audio != null) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
    }
  }
};
