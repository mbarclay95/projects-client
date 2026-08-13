import { AfterViewInit, Component, ElementRef, OnDestroy, input, output, viewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';

interface Rocket {
  x: number;
  y: number;
  vy: number;
  burstY: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
}

@Component({
  selector: 'app-draft-fireworks',
  templateUrl: './draft-fireworks.component.html',
  styleUrls: ['./draft-fireworks.component.scss'],
})
export class DraftFireworksComponent implements AfterViewInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  // Pressing a button labelled "Test fireworks" is a request for fireworks,
  // whatever the motion preference says.
  ignoreReducedMotion = input(false);

  finished = output<void>();

  private readonly colors = ['#ffc53d', '#ff7875', '#69c0ff', '#95de64', '#b37feb', '#ffffff'];
  private readonly launchWindowMs = 6000;
  private readonly launchIntervalMs = 100;
  private readonly gravity = 260;

  private ctx?: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private frameId?: number;
  private rockets: Rocket[] = [];
  private sparks: Spark[] = [];
  private startedAt = 0;
  private lastFrameAt = 0;
  private lastLaunchAt = 0;

  ngAfterViewInit(): void {
    if (!this.ignoreReducedMotion() && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.giveUp('the browser asks for reduced motion');
      return;
    }

    const ctx = this.canvasRef().nativeElement.getContext('2d');
    if (!ctx) {
      this.giveUp('the canvas has no 2d context');
      return;
    }

    this.ctx = ctx;
    this.resize();
    window.addEventListener('resize', this.resize);

    this.startedAt = performance.now();
    this.lastFrameAt = this.startedAt;
    this.frameId = requestAnimationFrame(this.frame);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resize);
    if (this.frameId !== undefined) {
      cancelAnimationFrame(this.frameId);
    }
  }

  /**
   * Out of the current change detection pass: the parent drops this component
   * on `finished`, and doing that while its own view is still being checked
   * is a write-after-read Angular complains about.
   */
  private giveUp(reason: string): void {
    if (!environment.production) {
      console.warn(`[fireworks] skipped: ${reason}`);
    }
    setTimeout(() => this.finished.emit());
  }

  private resize = (): void => {
    const canvas = this.canvasRef().nativeElement;
    const ratio = window.devicePixelRatio || 1;

    // The viewport fallback covers a host that measures zero — a transformed
    // ancestor turns the fixed overlay into a 0x0 box, and a canvas sized
    // from that draws nothing at all.
    this.width = canvas.clientWidth || window.innerWidth;
    this.height = canvas.clientHeight || window.innerHeight;
    canvas.width = this.width * ratio;
    canvas.height = this.height * ratio;
    this.ctx?.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  private frame = (now: number): void => {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }

    // Capped so a backgrounded tab resuming after seconds away doesn't
    // integrate one enormous step and teleport every spark off-screen.
    const seconds = Math.min((now - this.lastFrameAt) / 1000, 0.05);
    this.lastFrameAt = now;
    const elapsed = now - this.startedAt;

    if (elapsed < this.launchWindowMs && now - this.lastLaunchAt >= this.launchIntervalMs) {
      this.launch();
      this.lastLaunchAt = now;
    }

    // Fading with destination-out rather than a translucent fill leaves
    // trails behind the sparks without painting the page underneath.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = 'lighter';

    this.drawRockets(ctx, seconds);
    this.drawSparks(ctx, seconds);

    if (elapsed >= this.launchWindowMs && this.rockets.length === 0 && this.sparks.length === 0) {
      ctx.clearRect(0, 0, this.width, this.height);
      this.frameId = undefined;
      this.finished.emit();
      return;
    }

    this.frameId = requestAnimationFrame(this.frame);
  };

  private launch(): void {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.rockets.push({
      x: this.width * (0.1 + Math.random() * 0.8),
      y: this.height,
      vy: -(this.height * (0.75 + Math.random() * 0.25)),
      burstY: this.height * (0.15 + Math.random() * 0.35),
      color,
    });
  }

  private drawRockets(ctx: CanvasRenderingContext2D, seconds: number): void {
    this.rockets = this.rockets.filter((rocket) => {
      rocket.y += rocket.vy * seconds;
      if (rocket.y <= rocket.burstY) {
        this.burst(rocket);
        return false;
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = rocket.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rocket.x, rocket.y);
      ctx.lineTo(rocket.x, rocket.y + 10);
      ctx.stroke();
      return true;
    });
  }

  private burst(rocket: Rocket): void {
    const count = 50 + Math.floor(Math.random() * 30);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 190;
      this.sparks.push({
        x: rocket.x,
        y: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.45 + Math.random() * 0.5,
        size: 1.5 + Math.random() * 1.5,
        color: Math.random() < 0.15 ? '#ffffff' : rocket.color,
      });
    }
  }

  private drawSparks(ctx: CanvasRenderingContext2D, seconds: number): void {
    const drag = Math.pow(0.94, seconds * 60);

    this.sparks = this.sparks.filter((spark) => {
      spark.vx *= drag;
      spark.vy = spark.vy * drag + this.gravity * seconds;
      spark.x += spark.vx * seconds;
      spark.y += spark.vy * seconds;
      spark.life -= spark.decay * seconds;

      if (spark.life <= 0) {
        return false;
      }

      ctx.globalAlpha = spark.life;
      ctx.fillStyle = spark.color;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fill();
      return true;
    });
  }
}
