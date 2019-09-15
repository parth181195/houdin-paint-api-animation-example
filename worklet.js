registerPaint('logo', class {
  static get inputProperties() { return ['--animation-tick', '--tick', '--ticks']; }

  getLayers() {
    return [
      {
        end_at: this.maxtick * 0.25,
        start_at: this.maxtick * 0.0,
        start_x: this.getNewXcord(0),
        start_y: this.getNewYcord(this.height / 2),
        end_x: (this.height - 40) * Math.cos(-30 * (Math.PI / 180)) + this.getNewXcord(0),
        end_y: (this.height - 40) * Math.sin(-30 * (Math.PI / 180)) + this.getNewYcord(this.height / 2),
        colour: '#EA4535'
      },
      {
        end_at: this.maxtick * 0.50,
        start_at: this.maxtick * 0.25,
        start_x: this.getNewXcord(this.width),
        start_y: this.getNewYcord(this.height / 2),
        end_x: (this.height - 40) * Math.cos(150 * (Math.PI / 180)) + this.getNewXcord(this.width),
        end_y: (this.height - 40) * Math.sin(150 * (Math.PI / 180)) + this.getNewYcord(this.height / 2),
        colour: '#F9BC15'
      },
      {
        end_at: this.maxtick * 0.75,
        start_at: this.maxtick * 0.50,
        start_x: this.getNewXcord(0),
        start_y: this.getNewYcord(this.height / 2),
        end_x: (this.height - 40) * Math.cos(30 * (Math.PI / 180)) + this.getNewXcord(0),
        end_y: (this.height - 40) * Math.sin(30 * (Math.PI / 180)) + this.getNewYcord(this.height / 2),
        colour: '#557EBF'
      },
      {
        end_at: this.maxtick * 1.00,
        start_at: this.maxtick * 0.75,
        start_x: this.getNewXcord(this.width),
        start_y: this.getNewYcord(this.height / 2),
        end_x: (this.height - 40) * Math.cos(-150 * (Math.PI / 180)) + this.getNewXcord(this.width),
        end_y: (this.height - 40) * Math.sin(-150 * (Math.PI / 180)) + this.getNewYcord(this.height / 2),
        colour: '#0F9D58'
      },
    ];
  }
  getPaintAreaSize(geometry) {
    let size = {
      width: 0,
      height: 0,
    };
    let min = Math.min(geometry.width, geometry.height);
    size.width = min;
    size.height = min / 2;
    return size;
  }

  getNewXcord(x) {
    let newx = (x + ((this.geom.width - this.width) / 2));

    return newx;
  }
  getNewYcord(y) {
    let newY = (y + ((this.geom.height - this.height) / 2));

    return newY;
  }
  paint(ctx, geom, props, args) {
    this.geom = geom;
    this.width = this.getPaintAreaSize(geom).width;
    this.height = this.getPaintAreaSize(geom).height;
    const ticks = props.get('--ticks').toString().split(',')
    let tick = parseFloat(props.get('--animation-tick').toString());
    this.maxtick = parseFloat(props.get('--tick').toString());
    ctx.font = "20px Georgia";
    // ctx.fillText("Hello World!", 10, 50);
    if (tick < 0)
      tick = 0
    if (tick > this.maxtick)
      tick = this.maxtick + 1
    this.getLayers().forEach((layer, index) => {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineWidth = this.height / 3;
      ctx.strokeStyle = layer.colour;
      // if (index == 0) {
      //   console.log(`start: ${layer.start_at}, end: ${layer.end_at}, tick: ${tick / layer.end_at} `)
      // }

      if (tick > layer.start_at && tick < layer.end_at) {
        // console.log(`Ticker${index}=> start: ${layer.start_at}, end: ${layer.end_at}, Tick: ${tick}, per: ${(tick - layer.start_at) / (layer.end_at - layer.start_at)} `)
        let midpoint = this.midpoint(layer.start_x, layer.start_y, layer.end_x, layer.end_y, (tick - layer.start_at) / (layer.end_at - layer.start_at))
        ctx.moveTo(layer.start_x, layer.start_y);
        ctx.lineTo(midpoint[0], midpoint[1]);
        ctx.stroke();
      } else {
        // console.log(`start: ${layer.start_at}, end: ${layer.end_at}, show: ${tick > layer.end_at} `)
        if (tick > layer.end_at) {
          ctx.moveTo(layer.start_x, layer.start_y);
          ctx.lineTo(layer.end_x, layer.end_y);
          ctx.stroke();
          // if (index === 3) {
          //   ctx.fillStyle = 'black';
          // }
        }
      }
      // }
    })
  }
  midpoint(lat1, long1, lat2, long2, per) {
    return [lat1 + (lat2 - lat1) * per, long1 + (long2 - long1) * per];
  }


})




