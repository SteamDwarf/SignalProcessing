import Painter from "./Painter";
import Vector2 from "./Vector2";

class SchemePainter {
    private painter: Painter;
    private width: number;
    private height: number;

    constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
        this.height = height;
        this.width = width;
        this.painter = new Painter(ctx);
    }

    paintScheme(coefficients: number[]) {
        let summatorRadius = 15;
        let amplifiersHeight = 20;
        let amplifiersBaseLength = 20;
        let delayerLength = 20;
        let delayerAmplDist = 25;
        let blockSize = delayerLength + delayerAmplDist; + amplifiersHeight + 20;
        let inPoint = new Vector2(30, 30);
        let outPoint = this.countOutPount(inPoint, coefficients.length, blockSize, summatorRadius);
        let summatorPos = outPoint.sub(new Vector2(30, 0));
        let sourcePos: Vector2 = inPoint.moveX(15);

        this.painter.updateCanvas(this.width, this.height, '#fff');
        this.paintInOut(inPoint, outPoint);
        this.paintSummator(summatorPos, summatorRadius);
        this.paintAmplifier(inPoint.add(new Vector2(30, 0)), amplifiersHeight, amplifiersBaseLength, 'b0');

        coefficients.forEach((coefficient, i) => {
            if(i !== 0)
                sourcePos = this.paintAmplifierBlock(sourcePos, amplifiersHeight, amplifiersBaseLength, i, summatorPos, delayerLength, delayerAmplDist);
        })
    }

    private paintAmplifier(centerPosition: Vector2, height: number, baseLength: number, name: string) {
        this.painter.paintTriangle(centerPosition, height, baseLength, 'rgb(83, 59, 179)');
        this.painter.paintText(new Vector2(centerPosition.x, centerPosition.y - 15), name, 12);
    }

    private paintAmplifierBlock(blockSourcePos: Vector2, amplifiersHeight: number, amplifiersBaseLength: number, amplifierNum: number, summatorPos: Vector2, delayerLength: number, delayerAmplDist: number) {
        let yOffset = 40;
        let cornPos = blockSourcePos.add(new Vector2(15, yOffset));
        let delayer = cornPos.moveX(delayerLength / 2);
        let amplifierPos = delayer.moveX(delayerLength / 2 + 15 + amplifiersHeight / 2);
        let newSourcePos = delayer.moveX(delayerLength / 2 + delayerAmplDist / 4);

        this.painter.paintLineP2P(blockSourcePos, blockSourcePos.moveY(yOffset));
        this.painter.paintLineP2P(blockSourcePos.moveY(yOffset), cornPos);
        this.painter.paintHollowRect(delayer, delayerLength, delayerLength);
        this.painter.paintText(delayer, 'Z⁻¹', 12);
        this.painter.paintLineP2P(delayer.moveX(delayerLength / 2), delayer.moveX(delayerAmplDist));
        this.paintAmplifier(amplifierPos, amplifiersHeight, amplifiersBaseLength, `b${amplifierNum}`);
        this.painter.paintLineP2P(amplifierPos.moveX(amplifiersHeight / 2), amplifierPos.moveX(30));
        this.painter.paintLineP2P(amplifierPos.moveX(30), new Vector2(amplifierPos.x + 30, summatorPos.y));

        return newSourcePos;
    }

    private paintInOut(inPoint: Vector2, outPoint: Vector2) {
        this.painter.paintLineP2P(inPoint, outPoint);
        this.painter.paintText(inPoint.sub(new Vector2(0, 15)), 'X(nT)', 12);
        this.painter.paintText(outPoint.sub(new Vector2(0, 15)), 'y(nT)', 12);
    }

    private paintSummator(centerPos: Vector2, summatorRadius: number) {
        this.painter.paintCircle(centerPos, summatorRadius, '#fff');
        this.painter.paintText(centerPos, '+', 25);
    }

    private countOutPount(startPos: Vector2, coefficientsCount: number, blockSize: number, summatorRadius: number) {
        let outPos = new Vector2(0, startPos.y);
        let lineLength = summatorRadius * 4 + 40 + blockSize;

        lineLength = new Array(coefficientsCount - 1).fill(0).reduce((sum) => {
            return sum + blockSize;
        }, lineLength);

        outPos = outPos.moveX(lineLength);

        return outPos;
    }

}

export default SchemePainter;