import Complex from "./Complex";
import { countDFT, countInverseDFT } from "./Fourier";
import { splitPlane } from "./Graph";

export const aiEvenFunc = (i: number, fc1p: number, fd: number) => {
    return Math.sin(2 * Math.PI * i * (fc1p / fd)) / (Math.PI * i);
}
export const aiOddFunc = (i: number, fc1p: number, fd: number) => {
    return Math.sin(2 * Math.PI * (i - 0.5) * (fc1p / fd)) / (Math.PI * (i - 0.5));
}
export const a0EvenFunc = (fc1p: number, m: number) => {
    return 2 * (fc1p / m);
}

export function getDelta(An: number, Az: number) {
    let pow1 = 0.05 * An;
    let pow2 = 0.05 * Az * -1;

    let delta1 = (10**pow1 - 1) / (10**pow1 + 1);
    let delta2 = 10**pow2;

    return Math.min(delta1, delta2);
}
export function getDeltaF(fz: number, fc: number) {
    return fz - fc
}
export function getFc1p(fc: number, deltaF: number) {
    return fc + deltaF / 2;
}

export function getA(delta: number) {
    return -20 * Math.log10(delta);
}
export function getD(A: number) {
    if(A <= 21)
        return 0.9222;
    else
        return (A - 7.95) / 14.36;
}
export function getM(D: number, deltaF: number, fd: number) {
    return Math.ceil(fd * D / deltaF);
}
export function getAlpha(A: number) {
    if(A <= 21)
        return 0;
    else if(A > 21 && A < 50)
        return 0.5842 * (A - 21)**0.4 + 0.07886 * (A - 21);
    else
        return 0.1102 * (A - 8.7);
}

export function getCoefficients(M: number, fc1p: number, fd: number) {
    let coefficients: number[] = new Array(Math.round(M / 2) + 1).fill(0);
    let aiFunc = M % 2 === 0 ? aiEvenFunc : aiOddFunc;

    coefficients = coefficients.map((num, i) => {
        if(i === 0)
            return a0EvenFunc(fc1p, fd);
        else
            return aiFunc(i, fc1p, fd);
    });

    return coefficients;
}

function getFactorial(num: number) {
    let factorial = new Array(num).fill(0).reduce((mult, curNum, i) => {
        return mult * (i + 1);
    }, 1);

    return factorial;
}

function getIO(x: number) {
    let I = new Array(10).fill(0).reduce((sum, num, i) => {
        return sum + ((x / 2)**(i + 1) / getFactorial(i + 1))**2
    }, 1);

    return I;
}

export function getAlphas(M: number, alpha: number, coefficients: number[]) {
    let alphasI = new Array(Math.round(M / 2) + 1).fill(0);
    
    alphasI = alphasI.map((num, i) => {
        let beta = alpha * Math.sqrt(1 - (2 * i / M)**2);
        let w = getIO(beta) / getIO(alpha);
        return coefficients[i] * w;
    });

    return alphasI;
}
export function getHCoefficients(alphas: number[], M: number) {
    let hCoefficients: number[] = [];
    let halfM = Math.floor(M / 2);

    for(let i = 0; i < halfM; i++) {
        hCoefficients[i] = alphas[halfM - i];
    }

    hCoefficients[halfM] = alphas[0];

    for(let i = halfM + 1; i < M; i++) {
        hCoefficients[i] = hCoefficients[M - i];
    }

    return hCoefficients;
}
export function getTriangleCoefficients(coefficients: number[], N: number) {
    let w = new Array(coefficients.length).fill(0);
    let newH = [];

    w = w.map((num, i) => {
        if(i <= (N - 1) / 2)
            return (2 * i) / (N - 1);
        else
            return 2 - (2 * i) / (N - 1);
    });
    
    newH = coefficients.map((coefficient, i) => {
        return coefficient * w[i];
    });

    return newH;
}
export function getHemmingCoefficients(coefficients: number[], alpha: number, N: number) {
    let w = new Array(coefficients.length).fill(0);
    let alphaQuarter = alpha / 4;

    w = w.map((num, i) => {
        return ((alphaQuarter - (1 - alphaQuarter) * Math.cos(Math.PI * 2 * i / (N - 1))) * coefficients[i]);
    });

    return w;
}
export function getBlackmanCoefficients(coefficients: number[], N: number) {
    let w = new Array(coefficients.length).fill(0);

    w = w.map((num, i) => {
        return (0.42 - 0.5 * Math.cos(Math.PI * 2 * i / (N - 1)) + 0.08 * Math.cos(Math.PI * 4 * i / (N - 1))) * coefficients[i];
    });

    return w;
}

export function getS(t: number, frequencies: number[]) {
    let S = frequencies.reduce((sum, frequency, i) => {
        return sum + Math.cos(2 * Math.PI * frequency * t);
    }, 0);

    return S;
}
export function getSk(frequencies: number[], Nd: number, Td: number) {
    let Sk = new Array(Nd).fill(0);

    Sk = Sk.map((num, i) => {
        return getS(i * Td, frequencies);
    });

    return Sk;
}
export function getQuantumS(Nd: number, Sk: number[], delta: number) {
    let S = new Array(Nd).fill(0);

    S = S.map((num, i) => {
        return Math.floor(Sk[i] / delta) * delta;
    });

    return S;
}
export function getFilteredS(Nd: number, hCoefficients: number[], quantumS: number[]) {
    let S = new Array(Nd).fill(0).map((num, i) => {

        let newS = new Array(i + 1).fill(0).reduce((sum, num, j) => {
            if (i - j < hCoefficients.length)
                return sum + quantumS[j] * hCoefficients[i - j];
            else
                return 0;
        }, 0);  
        return newS;
    })
    return S;
}
export function getRestoredS(Nd: number, filteredS: number[],) {
    let t = 1 / filteredS.length;
    let [amplitudes, fi] = (countDFT(filteredS, Nd));
    let restoredSignals: number[] = countInverseDFT(filteredS.length, amplitudes, fi).reverse();

    return {amplitudes, fi, restoredSignals}
}


export function getFilterCharacteristics(hCoefficients: number[], M: number, fd: number, fc: number) {
    let characteristics: {
        complex: Complex[],
        amplitudes: number[],
        phases: number[]
    } = {complex: [], amplitudes: [], phases: []};
    let x = splitPlane(0, fc, 0.1);

    characteristics.complex = x.map((x, i) => {
        let complex = new Complex(0, 0);

        for(let n = 1; n <= M; n++) {
            complex = complex.add(new Complex(hCoefficients[n - 1] * Math.cos(n * x), hCoefficients[n - 1] * Math.sin(n * x)));  
        }

        characteristics.amplitudes.push(complex.getMagnitude());
        characteristics.phases.push(Math.atan2(complex.imag, complex.real));

        return complex;
    });

    return characteristics;
}
