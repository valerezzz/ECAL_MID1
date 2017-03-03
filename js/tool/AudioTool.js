var AudioTool = function(mp3) {
  this.soundURL = mp3 || null;
  this.audioContext = null;
  this.audio = null;
  this.isPlaying = false;
  // MIC stuff
  this.analyserNode = null;
  this.data = null;
  this.dataW = null;
  this.size = 2048;
  this.counter = 0;
  this.setup();
};

AudioTool.prototype = {

  isAudioContextSupported : function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext) {
      return true;
    } else {
      return false;
    }
  },

  setup : function() {
    if (this.isAudioContextSupported()) {
      this.audioContext = new AudioContext();
      // Setup audio stuff
      if (this.soundURL != null) {
        // setup audio file
        this.audio = new Audio();
        this.audio.src = this.soundURL;
        this.audio.controls = true;
        this.mic = null;
        document.body.appendChild(this.audio);

        this.broadcast();
      } else {
        // set up mic
        // Attempt to get audio input
        try {
          // monkeypatch getUserMedia
          navigator.getUserMedia = navigator.getUserMedia ||
                                   navigator.webkitGetUserMedia ||
                                   navigator.mozGetUserMedia;

          // ask for an audio input
          navigator.getUserMedia({
            "audio" : {
              "mandatory" : {
                "googEchoCancellation" : "false",
                "googAutoGainControl" : "false",
                "googNoiseSuppression" : "false",
                "googHighpassFilter" : "false"
              },
              "optional" : []
            },
          },
                                 this.onStream.bind(this),
                                 this.noStream.bind(this));
        } catch (e) {
          alert('getUserMedia threw exception :' + e);
        }
      }

    } else {
      alert("this browser doesn't support the Web Audio API. Come on...");
    }
  },

  broadcast : function() {
    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.source.connect(this.analyserNode);
    this.analyserNode.connect(this.audioContext.destination);
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  },

  onStream : function(stream) {
    this.mic = this.audioContext.createMediaStreamSource(stream);
    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = this.size;
    this.mic.connect(this.analyserNode);
    this.data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.dataWave = new Uint8Array(this.analyserNode.frequencyBinCount);
  },

  noStream : function() { alert("problem with mic"); },

  toggle : function() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play()
    };
    this.isPlaying = !this.isPlaying;
  },

  updateFrequency : function() {
    this.analyserNode.getByteFrequencyData(this.data);
  },

  updateWave : function() {
    this.analyserNode.getByteTimeDomainData(this.dataWave);
  }
}
