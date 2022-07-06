import Vector2 from "./Vector2";

class Painter {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    paintLineP2P(vector1: Vector2, vector2: Vector2) {
        this.ctx.beginPath();
        this.ctx.moveTo(vector1.x, vector1.y);
        this.ctx.lineTo(vector2.x, vector2.y);
        this.ctx.stroke();
    }
    paintLineByDirection(source: Vector2, direction: Vector2, length: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(source.x, source.y);
        this.ctx.lineTo(source.x + (direction.x * length), source.y + (direction.y * length));
        this.ctx.stroke();
    }
    fillBackground(width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, width, height);
    }
    paintCircle(circleCenter: Vector2, radius: number, color: string) {
        this.ctx.beginPath();
        this.ctx.arc(circleCenter.x, circleCenter.y, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.stroke();
        this.ctx.fill();
    }
    paintHollowCircle(circleCenter: Vector2, radius: number) {
        this.ctx.beginPath();
        this.ctx.arc(circleCenter.x, circleCenter.y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
    paintRect(position: Vector2, width: number, height: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(position.x - (width / 2), position.y - (height / 2), width, height);
        this.ctx.stroke();
    }
    paintHollowRect(position: Vector2, width: number, height: number) {
        this.ctx.fillStyle = 'white';
        this.ctx.rect(position.x - (width / 2), position.y - (height / 2), width, height);
        this.ctx.stroke();
    }

    paintTriangle(centerPos: Vector2, height: number, baseLength: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(centerPos.x + (height / 2), centerPos.y);
        this.ctx.lineTo(centerPos.x - (height / 2), centerPos.y + (baseLength / 2));
        this.ctx.lineTo(centerPos.x - (height / 2), centerPos.y - (baseLength / 2));
        this.ctx.fill();
    }

    paintText(position: Vector2, text: string, textSize: number) {
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.font = `${textSize}px serif`;
        this.ctx.fillText(text, position.x, position.y);
        this.ctx.stroke();
    }

    updateCanvas(width: number, height: number, backgroundColor: string) {
        this.ctx.clearRect(0, 0, width, height);
        this.fillBackground(width, height, backgroundColor);
    }
}

export default Painter;