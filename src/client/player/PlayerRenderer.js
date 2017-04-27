import { Canvas2dRenderer } from 'soundworks/client';

/**
 * A simple canvas renderer.
 * The class renders a dot moving over the screen and rebouncing on the edges.
 */
class PlayerRenderer extends Canvas2dRenderer {
  constructor(vx, vy, collisionCallback = function() {}) {
    super(0); // update rate = 0: synchronize updates to frame rate

    this.velocityX = vx; // px per seconds
    this.velocityY = vy; // px per seconds

    this.collisionCallback = collisionCallback;
  }

  /**
   * Initialize rederer state.
   * @param {Number} dt - time since last update in seconds.
   */
  init() {
    // set initial dot position
    if (!this.x || !this.y) {
      this.x = Math.random() * this.canvasWidth;
      this.y = Math.random() * this.canvasHeight;
    }
  }

  /**
   * Update rederer state.
   * @param {Number} dt - time since last update in seconds.
   */
  update(dt) {
    // rebounce at the edges
    if (this.x <= 0) {
      this.x = 0;
      this.velocityX *= -1;
      this.collisionCallback('left');
    } else if (this.x >= this.canvasWidth) {
      this.x = this.canvasWidth;
      this.velocityX *= -1;
      this.collisionCallback('right');
    }

    if (this.y <= 0) {
      this.y = 0;
      this.velocityY *= -1;
      this.collisionCallback('top');
    } else if (this.y >= this.canvasHeight) {
      this.y = this.canvasHeight;
      this.velocityY *= -1;
      this.collisionCallback('bottom');
    }

    // update position according to velocity
    this.x += (this.velocityX * dt);
    this.y += (this.velocityY * dt);
  }

  /**
   * Draw into canvas.
   * Method is called by animation frame loop in current frame rate.
   * @param {CanvasRenderingContext2D} ctx - canvas 2D rendering context
   */
  render(ctx) {
    // canvas operations
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

export default PlayerRenderer;
