import Chart from 'chart.js/auto';
import Complex from "./Complex";

export enum ChartType {
    LineChart = 'line', ColumnChart = 'bar'
}

let chartType = ChartType.LineChart;
const canvas = document.querySelector('#chart') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let chart = new Chart(ctx, {
    type: chartType,
    data: {
        labels: [0],
        datasets: [{
            data: [0],
            tension: 0,
            showLine: true,
            borderWidth: 1
        }]
    }
});



function drawGraph(xData: number[], yData: number[], title: string, chartType: ChartType) { 
    const data = {
        labels: xData,
        datasets: [{
            label: 'My First Dataset',
            data: yData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };   
    const config = {
        type: 'line',
        data: data,
    };
    chart.destroy();

    chart = new Chart(ctx, config);

}


export function splitPlane(beginPoint: number, endPoint: number, step: number) {
    let cords = [beginPoint];

    do {
        cords.push(cords[cords.length - 1] + step);
    }while(cords[cords.length - 1] < endPoint);

    return cords;
}


export function drawSt(SFunc: (t: number, frequencies: number[]) => number, frequencies: number[], title: string) {
    let xCords = splitPlane(0, 1, 0.01);
    let yCords = xCords.map((x) => {
        return SFunc(x, frequencies);
    });

    drawGraph(xCords, yCords, title, ChartType.LineChart);
}


export function drawGraphByYLength(yCords: number[], title: string, chartType: ChartType) {
    let xCords = splitPlane(0, yCords.length, 1);

    drawGraph(xCords, yCords, title, chartType);
}

export function drawFilterCharacteristics(amplitudes: number[], frequencies: number[], title: string, chartType: ChartType) {
    let radFrequencies = frequencies.map(frequency => frequency * 2 * Math.PI);

    drawGraph(radFrequencies, amplitudes, title, chartType)
}