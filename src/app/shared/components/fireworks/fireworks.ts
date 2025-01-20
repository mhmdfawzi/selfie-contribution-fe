import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-particle-canvas',
  standalone: true,
  template: ` <canvas #canvas></canvas> `,
  styles: [
    `
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000; /* Ensure it's on top */
        pointer-events: auto; /* Ensure canvas captures clicks */
      }

      .bg,
      .flipper {
        pointer-events: none; /* Prevent them from blocking the canvas */
      }
    `,
  ],
})
export class ParticleCanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() canvasWidth = window.innerWidth;
  @Input() canvasHeight = window.innerHeight;

  private c!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private gravity = 0.005;
  private friction = 0.99;

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    this.c = canvas.getContext('2d')!;

    this.animate();
    this.registerClickEvent(canvas);
  }

  private registerClickEvent(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const particlesCount = 400;
      const power = 4;
      const angleIncrement = (Math.PI * 2) / particlesCount;

      for (let i = 0; i < particlesCount; i++) {
        this.particles.push(
          new Particle(
            mouseX,
            mouseY,
            3,
            `hsl(${Math.random() * 360}, 50%, 50%)`,
            {
              x: Math.cos(angleIncrement * i) * Math.random() * power,
              y: Math.sin(angleIncrement * i) * Math.random() * power,
            },
            this.c,
            this.gravity,
            this.friction
          )
        );
      }
    });
  }

  private animate() {
    this.c.fillStyle = 'rgba(0, 0, 0, 0.08)';
    this.c.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let i = 0; i < this.particles.length; i++) {
      if (this.particles[i].alpha > 0) {
        this.particles[i].update();
      } else {
        this.particles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

class Particle {
  alpha = 1;

  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private color: string,
    private velocity: { x: number; y: number },
    private c: CanvasRenderingContext2D,
    private gravity: number,
    private friction: number
  ) {}

  draw() {
    this.c.save();
    this.c.globalAlpha = this.alpha;
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
    this.c.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.velocity.y += this.gravity;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.alpha -= 0.005;
  }
}
