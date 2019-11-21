class Midi {
  constructor() {
    console.log('Midi');
  }

  setup(app) {
    this.app = app;
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({sysex: false})
          .then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    } else {
      alert('No MIDI support in your browser.');
    }
  }
  // midi functions
  onMIDISuccess(midiAccess) {
    const midi = midiAccess;
    const inputs = midi.inputs.values();
    // loop through all inputs
    for (let input = inputs.next(); input && !input.done;
         input = inputs.next()) {
      // listen for midi messages
      input.value.onmidimessage = this.onMIDIMessage.bind(this);
      // this just lists our inputs in the console
      this.listInputs(input);
    }
    // listen for connect/disconnect message
    midi.onstatechange = this.onStateChange;
  }

  onMIDIMessage(event) {
    const data = event.data;
    // console.log(data);
    const cmd = data[0] >> 4;
    const channel = data[0] & 0xf;
    // channel agnostic message type. Thanks, Phil Burk.
    const _type = data[0] & 0xf0;
    const note = data[1];
    const velocity = data[2];
    const infos = [cmd, channel, _type, note, velocity];
    // console.log(data);
    this.app.onmessage(infos);
    // this.app.midiControl(infos);
    // console.log(this.cmd,this.channel,this._type,this.note,this.velocity);
  }

  onStateChange(event) {
    const port = event.port;
    const state = port.state;
    const name = port.name;
    const type = port.type;
    if (type == 'input') {
      console.log('name', name, 'port', port, 'state', state);
    }
  }

  listInputs(inputs) {
    const input = inputs.value;
    console.log(
        'Input port : [ type:\'' + input.type + '\' id: \'' + input.id +
        '\' manufacturer: \'' + input.manufacturer + '\' name: \'' +
        input.name + '\' version: \'' + input.version + '\']');
  }

  onMIDIFailure(e) {
    console.log(
        'No access to MIDI devices or your browser doesn\'t support WebMIDI API. Please use WebMIDIAPIShim ',
        e);
  }
}
