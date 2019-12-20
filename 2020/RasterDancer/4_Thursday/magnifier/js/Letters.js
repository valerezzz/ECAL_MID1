class Letters {
  constructor(ctx) {
    console.log('Letters');
    this.ctx = ctx;
    this.dictionary = {};
  }

  set(letter) {
    let model;
    switch (letter) {
      case 'a':
        model = new Letter_a(this.ctx);
        break;
    }
    this.dictionary[letter] = model
    console.log(this.dictionary);
  }

  move(valx, valy) {
    for (const key in this.dictionary) {
      const letter = this.dictionary[key];
      letter.move(valx, valy);
    }
  }
  click() {
    for (const key in this.dictionary) {
      const letter = this.dictionary[key];
      letter.click();
    }
  }

  update() {
    for (const key in this.dictionary) {
      const letter = this.dictionary[key];
      letter.update();
    }
  }

  show() {
    for (const key in this.dictionary) {
      const letter = this.dictionary[key];
      letter.show();
    }
  }
};
