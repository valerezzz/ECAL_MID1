class Grid {
  constructor() {
    this.grid = {cols: 5, rows: 4};
    this.cases = [];
    this.letter = ['A', 'B', 'C', 'D'];
    this.initGrid();
    this.initListener();
  }

  initListener() {
    document.addEventListener('click', this.onClick.bind(this));
    this.onEndHandler = this.onEnd.bind(this);
    document.addEventListener('transitionend', this.onEndHandler);
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(e) {
    const nodes = document.body.getElementsByTagName('div');
    const h = window.innerHeight / this.grid.rows;
    const w = window.innerWidth / this.grid.cols;
    Array.from(nodes).forEach((el) => {
      el.setAttribute('data-w', w);
      el.setAttribute('data-h', h);
      const x = el.getAttribute('data-tx');
      const y = el.getAttribute('data-ty');
      el.style.transform =
          'translateX(' + x * w + 'px) translateY(' + y * h + 'px)';
      el.style.width = w + 'px';
      el.style.height = h + 'px';
    });
  }

  onEnd(e) {
    if (e.propertyName == 'transform') {
      const fullscreen = e.target.getAttribute('data-state');
      if (fullscreen != 'true') {
        e.target.style.zIndex = 0;
      }
    }
  }

  onClick(e) {
    let target = e.target;
    if (e.target.className != 'grid') {
      target = e.target.parentNode;
    }
    const x = target.getAttribute('data-tx');
    const y = target.getAttribute('data-ty');
    const w = target.getAttribute('data-w');
    const h = target.getAttribute('data-h');
    const fullscreen = target.getAttribute('data-state');
    if (fullscreen != 'true') {
      target.style.zIndex = 10;
      target.setAttribute('data-state', true);
      target.style.transform = 'translateX(0px) translateY(0px)';
      target.style.width = window.innerWidth;
      target.style.height = window.innerHeight;
    } else {
      // target.style.zIndex = 0;
      target.setAttribute('data-state', false);
      target.style.transform =
          'translateX(' + x * w + 'px) translateY(' + y * h + 'px)';
      target.style.width = w + 'px';
      target.style.height = h + 'px';
    }
  }

  initGrid() {
    const h = window.innerHeight / this.grid.rows;
    const w = window.innerWidth / this.grid.cols;
    let i = 0;
    for (let y = 0; y < this.grid.rows; y++) {
      for (let x = 0; x < this.grid.cols; x++) {
        const div = document.createElement('div');
        div.className = 'grid';
        div.style.position = 'absolute';
        div.style.width = w;
        div.style.height = h;
        div.style.transform =
            'translateX(' + x * w + 'px) translateY(' + y * h + 'px)';
        // div.style.backgroundColor = 'rgb(' + Math.random() * 255 + ',' +
        //     Math.random() * 255 + ',' + Math.random() * 255 + ')';
        div.style.backgroundColor = 'rgb(255,255,255)';
        div.setAttribute('data-tx', x);
        div.setAttribute('data-ty', y);
        div.setAttribute('data-w', w);
        div.setAttribute('data-h', h);
        div.setAttribute('data-state', false);
        const lettre = this.letter.shift();
        this.letter.push(lettre);
        div.textContent = lettre;
        document.body.appendChild(div);
        this.cases.push(div);
      }
    }
  }
};
