class Complex {
    private _real: number;
    private _imag: number;

    constructor(real: number, imag: number) {
        this._real = real;
        this._imag = imag;
    }

    public get real() {
        return this._real;
    }
    public get imag() {
        return this._imag;
    }

    public getCounjugate() {
        return new Complex(this._real, this._imag * -1);
    }

    public getMagnitude() {
        return Math.sqrt(this._real**2 + this._imag**2);
    }

    public add(num: Complex) {
        return new Complex(this._real + num.real, this._imag + num.imag);
    }

    public sub(num: Complex) {
        return new Complex(this._real - num.real, this._imag - num.imag);
    }

    public multComplex(num: Complex) {
        let newReal = this._real * num.real - this._imag * num.imag;
        let newImag = this._real * num.imag + this._imag * num.real;

        return new Complex(newReal, newImag);
    }

    public mult(num: number) {
        return new Complex(this._real * num, this._imag * num);
    }

    public divComplex(num: Complex) {
        let newReal = (this._real * num.real + this._imag * num.imag) / (num.real**2 + num.imag**2);
        let newImag = (this._imag * num.real - this._real * num.imag) / (num.real**2 + num.imag**2);

        return new Complex(newReal, newImag);
    }

    public div(num: number) {
        let newReal = this._real / num;
        let newImag = this._imag / num;

        return new Complex(newReal, newImag);
    }

    public pow(powNum: number) {
        let powedReal = this._real;
        let powedImag = this._imag;

        for(let i = 1; i < powNum; i++) {
            powedReal *= this._real;
            powedImag *= this._imag;
        }
        
        return new Complex(powedReal, powedImag);
    }
}

export default Complex;