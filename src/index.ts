import Complex from "./Complex";
import {ChartType, drawGraphByYLength, drawSt} from "./Graph";
import Painter from "./Painter";
import SchemePainter from "./SchemePainter";
import { getA, getAlpha, getAlphas, getBlackmanCoefficients, getCoefficients, getD, getDelta, getDeltaF, getFc1p, getFilterCharacteristics, getFilteredS, getHCoefficients, getHemmingCoefficients, getM, getQuantumS, getRestoredS, getS, getSk, getTriangleCoefficients } from "./SignalProcessing";

const fcInput = document.querySelector('#fc-input') as HTMLInputElement;
const fzInput = document.querySelector('#fz-input') as HTMLInputElement;
const anInput = document.querySelector('#An-input') as HTMLInputElement;
const azInput = document.querySelector('#Az-input') as HTMLInputElement;

const frequenciesInput = document.querySelectorAll('[data-input="frequencies"]') as NodeListOf<HTMLInputElement>;
const filterCoefficientsList= document.querySelector('#filter-coefficients') as HTMLElement;
const triangleWindowList = document.querySelector('#triangle-window') as HTMLElement;
const hemmingWindowList = document.querySelector('#hemming-window') as HTMLElement;
const blackmanWindowList = document.querySelector('#blackman-window') as HTMLElement;

const sourceSignalBtn = document.querySelector('#source-signal_btn') as HTMLButtonElement;
const digitalSignalBtn = document.querySelector('#digital-signal_btn') as HTMLButtonElement;
const filteredSignalBtn = document.querySelector('#filtered-signal_btn') as HTMLButtonElement;
const impulseSignalBtn = document.querySelector('#impulse-signal_btn') as HTMLButtonElement;
const amplitudeSignalBtn = document.querySelector('#amplitude-signal_btn') as HTMLButtonElement;
const phaseSignalBtn = document.querySelector('#phase-signal_btn') as HTMLButtonElement;
const restoredSignalBtn = document.querySelector('#restored-signal_btn') as HTMLButtonElement;
const hemmingSignalBtn = document.querySelector('#hemming-signal_btn') as HTMLButtonElement;
const blackmanSignalBtn = document.querySelector('#blackman-signal_btn') as HTMLButtonElement;
const triangleSignalBtn = document.querySelector('#triangle-signal_btn') as HTMLButtonElement;
const countBtn = document.querySelector('#count_btn') as HTMLButtonElement;
const coefficientsBtn = document.querySelector('#coefficients-show_btn') as HTMLButtonElement;
const modal = document.querySelector('#modal') as HTMLElement;
const modalCloseBtn = document.querySelector('#close-btn') as HTMLElement;
const schemeBtn = document.querySelector('#scheme-show_btn') as HTMLButtonElement;
const coefficientsOutputBlock = document.querySelector('#coefficients-output') as HTMLElement;
const canvasHolder = document.querySelector('#canvas-holder') as HTMLElement;

const schemeCanvas = document.querySelector('#scheme-canvas') as HTMLCanvasElement;

const ctx = schemeCanvas.getContext('2d') as CanvasRenderingContext2D;
const canvasWidth = 3000;
const canvasHeight = 2000;
const schemePainter = new SchemePainter(canvasWidth, canvasHeight, ctx);

const fd = 128;
const m = 64;


let frequencies: number[] = [];
let delta: number = 0;
let deltaF: number = 0;
let fc1p: number = 0;
let A: number = 0;
let D: number = 0;
let M: number = 0;
let N: number = 0;
let alpha: number = 0;
let Td: number = 0;
let Nd: number = 0;
let coefficients: number[] = [];
let alphas: number[] = [];
let hCoefficients: number[] = [];
let Sk: number[] = [];
let hTriangles: number[] = [];
let hHemming: number[] = [];
let hBlackman: number[] = [];
let quantumS: number[] = [];
let filteredS: number[] = [];
let restoredS: {amplitudes: number[], fi: number[], restoredSignals: number[]} = {
    amplitudes: [], 
    fi: [], 
    restoredSignals: []
};
let filterCharacteristics: {amplitudes: number[], phases: number[], complex: Complex[]} = {
    amplitudes: [], 
    phases: [], 
    complex: []
};
let triangleFilterCharacteristics: {amplitudes: number[], phases: number[], complex: Complex[]} = {
    amplitudes: [], 
    phases: [], 
    complex: []
};
let hemmingFilterCharacteristics: {amplitudes: number[], phases: number[], complex: Complex[]} = {
    amplitudes: [], 
    phases: [], 
    complex: []
};
let blackmanFilterCharacteristics: {amplitudes: number[], phases: number[], complex: Complex[]} = {
    amplitudes: [], 
    phases: [], 
    complex: []
};

function createListItem(text: string) {
    let listItem = document.createElement('li');

    listItem.classList.add('coefficients_list_item');
    listItem.textContent = text;

    return listItem;
}

function showCoefficients(coefficients: number[], listBlock: HTMLElement) {
    listBlock.innerHTML = '';
    coefficients.forEach(coeff => {
        listBlock.append(createListItem(coeff.toString()));
    });
}

function showModal() {
    modal.classList.remove('hide');
}

function count() {
    frequencies = Array.from(frequenciesInput).map(input => parseInt(input.value));
    delta = getDelta(parseInt(anInput.value), parseInt(azInput.value));
    deltaF = getDeltaF(parseInt(fzInput.value), parseInt(fcInput.value));
    fc1p =  getFc1p(parseInt(fcInput.value), deltaF);
    A = getA(delta);
    D = getD(A);
    M = getM(D, deltaF, fd);
    N = M + 1;
    alpha = getAlpha(A);
    Td = 1 / m;
    Nd = Math.round(1 / Td);
    coefficients = getCoefficients(M, fc1p, m);
    alphas = getAlphas(M, alpha, coefficients);
    hCoefficients = getHCoefficients(alphas, M);
    Sk = getSk(frequencies, Nd, Td);
    hTriangles = getTriangleCoefficients(hCoefficients, N), M;
    hHemming = getHemmingCoefficients(hCoefficients, alpha, N), M;
    hBlackman = getBlackmanCoefficients(hCoefficients, N), M;
    delta = (Math.max(...Sk) - Math.min(...Sk)) / (m - 1);

    quantumS = getQuantumS(Nd, Sk, delta);
    filteredS = getFilteredS(Nd, hCoefficients, quantumS);
    restoredS = getRestoredS(Nd, filteredS);
    filterCharacteristics = getFilterCharacteristics(hCoefficients, M, fd, parseInt(fcInput.value));
    triangleFilterCharacteristics = getFilterCharacteristics(hTriangles, M, fd, parseInt(fcInput.value));
    hemmingFilterCharacteristics = getFilterCharacteristics(hHemming, M, fd, parseInt(fcInput.value));
    blackmanFilterCharacteristics = getFilterCharacteristics(hBlackman, M, fd, parseInt(fcInput.value));

    drawSt(getS, frequencies, 'Исходный сигнал');

    showCoefficients(hCoefficients, filterCoefficientsList);
    showCoefficients(hTriangles, triangleWindowList);
    showCoefficients(hHemming, hemmingWindowList);
    showCoefficients(hBlackman, blackmanWindowList);

    schemePainter.paintScheme(hCoefficients);
}

schemeCanvas.width = canvasWidth;
schemeCanvas.height = canvasHeight;


sourceSignalBtn.addEventListener('click', () => drawSt(getS, frequencies, 'Исходный сигнал'));
digitalSignalBtn.addEventListener('click', () => drawGraphByYLength(quantumS, 'Цифровой сигнал', ChartType.ColumnChart));
filteredSignalBtn.addEventListener('click', () => drawGraphByYLength(filteredS, 'Отфильтрованный сигнал', ChartType.ColumnChart));
impulseSignalBtn.addEventListener('click', () => drawGraphByYLength(hCoefficients, 'Импульсная характеристика', ChartType.LineChart))
amplitudeSignalBtn.addEventListener('click', () => drawGraphByYLength(filterCharacteristics.amplitudes, 'АЧХ', ChartType.LineChart));
phaseSignalBtn.addEventListener('click', () => drawGraphByYLength(filterCharacteristics.phases, 'ФЧХ', ChartType.LineChart));
restoredSignalBtn.addEventListener('click', () => drawGraphByYLength(restoredS.restoredSignals, 'Востановленный сигнал', ChartType.LineChart));
triangleSignalBtn.addEventListener('click', () => drawGraphByYLength(triangleFilterCharacteristics.amplitudes, 'Треугольное окно', ChartType.LineChart));
hemmingSignalBtn.addEventListener('click', () => drawGraphByYLength(hemmingFilterCharacteristics.amplitudes, 'Окно Хемминга', ChartType.LineChart));
blackmanSignalBtn.addEventListener('click', () => drawGraphByYLength(blackmanFilterCharacteristics.amplitudes, 'Окно Блэкмена', ChartType.LineChart));

count();

countBtn.addEventListener('click', () => {
    count();
});

modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hide');
});

schemeBtn.addEventListener('click', () => {
    showModal();
    canvasHolder.classList.remove('hide');
    coefficientsOutputBlock.classList.add('hide');
});

coefficientsBtn.addEventListener('click', () => {
    showModal();
    coefficientsOutputBlock.classList.remove('hide');
    canvasHolder.classList.add('hide');
});


