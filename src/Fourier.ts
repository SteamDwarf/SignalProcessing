import Complex from "./Complex";

function getSinusoid(i: number, j: number, N: number, S: number) {
    let Re = S * Math.cos(2 * Math.PI * i * j / N);
    let Im = S * Math.sin(2 * Math.PI * i * j / N);

    return new Complex(Re, Im);
}

export function countDFT(filteredS: number[], Nd: number) {
    let amplitudes: number[] = new Array(Nd / 2).fill(0);
    let fi: number[] = new Array(amplitudes.length).fill(0);
    
    filteredS.forEach((s) => {
        amplitudes[0] = (amplitudes[0] + s) * (1 / Nd);
    });

    for (let i = 1; i < amplitudes.length; i++) {
        let complex = new Complex(0, 0);

        filteredS.forEach((s, j) => {
            complex = complex.add(getSinusoid(i, j, Nd, s));
        })

        complex = complex.mult(1 / Nd);
        amplitudes[i] = complex.getMagnitude();
        fi[i] = Math.atan2(complex.imag, complex.real);
    }

    return [amplitudes, fi];
}

export function countInverseDFT(signalsCount: number, amplitudes: number[], fi: number[]) {
    let t = 1 / signalsCount;
    let restoredSignals = [];

    for(let i = 0; i < signalsCount; i++) {
        let res = 0;

        for (let j = 1; j < amplitudes.length - 1; j++){
            res += 2 * amplitudes[j] * Math.cos(2 * j * Math.PI * i * t + fi[j]);
        }

        res += amplitudes[0] + amplitudes[amplitudes.length - 1] * Math.cos((amplitudes.length - 1) * Math.PI * i * t + fi[fi.length - 1]);
        restoredSignals.push(res);
    }

    return restoredSignals;
}