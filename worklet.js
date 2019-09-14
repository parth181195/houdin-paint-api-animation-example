registerPaint('logo', class {

  paint(ctx, geom, props) {
    ctx.fillStyle = 'red';
    ctx.arc(
      geom.width / 2, geom.height / 2,
      Math.min(geom.width, geom.height) / 2,
      0,
      2 * Math.PI
    )
    ctx.fill()
  }
})