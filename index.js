/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Complex.ts":
/*!************************!*\
  !*** ./src/Complex.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Complex = /*#__PURE__*/function () {
  function Complex(real, imag) {
    _classCallCheck(this, Complex);

    this._real = real;
    this._imag = imag;
  }

  _createClass(Complex, [{
    key: "real",
    get: function get() {
      return this._real;
    }
  }, {
    key: "imag",
    get: function get() {
      return this._imag;
    }
  }, {
    key: "getCounjugate",
    value: function getCounjugate() {
      return new Complex(this._real, this._imag * -1);
    }
  }, {
    key: "getMagnitude",
    value: function getMagnitude() {
      return Math.sqrt(Math.pow(this._real, 2) + Math.pow(this._imag, 2));
    }
  }, {
    key: "add",
    value: function add(num) {
      return new Complex(this._real + num.real, this._imag + num.imag);
    }
  }, {
    key: "sub",
    value: function sub(num) {
      return new Complex(this._real - num.real, this._imag - num.imag);
    }
  }, {
    key: "multComplex",
    value: function multComplex(num) {
      var newReal = this._real * num.real - this._imag * num.imag;
      var newImag = this._real * num.imag + this._imag * num.real;
      return new Complex(newReal, newImag);
    }
  }, {
    key: "mult",
    value: function mult(num) {
      return new Complex(this._real * num, this._imag * num);
    }
  }, {
    key: "divComplex",
    value: function divComplex(num) {
      var newReal = (this._real * num.real + this._imag * num.imag) / (Math.pow(num.real, 2) + Math.pow(num.imag, 2));
      var newImag = (this._imag * num.real - this._real * num.imag) / (Math.pow(num.real, 2) + Math.pow(num.imag, 2));
      return new Complex(newReal, newImag);
    }
  }, {
    key: "div",
    value: function div(num) {
      var newReal = this._real / num;
      var newImag = this._imag / num;
      return new Complex(newReal, newImag);
    }
  }, {
    key: "pow",
    value: function pow(powNum) {
      var powedReal = this._real;
      var powedImag = this._imag;

      for (var i = 1; i < powNum; i++) {
        powedReal *= this._real;
        powedImag *= this._imag;
      }

      return new Complex(powedReal, powedImag);
    }
  }]);

  return Complex;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Complex);

/***/ }),

/***/ "./src/Fourier.ts":
/*!************************!*\
  !*** ./src/Fourier.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countDFT": () => (/* binding */ countDFT),
/* harmony export */   "countInverseDFT": () => (/* binding */ countInverseDFT)
/* harmony export */ });
/* harmony import */ var _Complex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Complex */ "./src/Complex.ts");


function getSinusoid(i, j, N, S) {
  var Re = S * Math.cos(2 * Math.PI * i * j / N);
  var Im = S * Math.sin(2 * Math.PI * i * j / N);
  return new _Complex__WEBPACK_IMPORTED_MODULE_0__["default"](Re, Im);
}

function countDFT(filteredS, Nd) {
  var amplitudes = new Array(Nd / 2).fill(0);
  var fi = new Array(amplitudes.length).fill(0);
  filteredS.forEach(function (s) {
    amplitudes[0] = (amplitudes[0] + s) * (1 / Nd);
  });

  var _loop = function _loop(i) {
    var complex = new _Complex__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    filteredS.forEach(function (s, j) {
      complex = complex.add(getSinusoid(i, j, Nd, s));
    });
    complex = complex.mult(1 / Nd);
    amplitudes[i] = complex.getMagnitude();
    fi[i] = Math.atan2(complex.imag, complex.real);
  };

  for (var i = 1; i < amplitudes.length; i++) {
    _loop(i);
  }

  return [amplitudes, fi];
}
function countInverseDFT(signalsCount, amplitudes, fi) {
  var t = 1 / signalsCount;
  var restoredSignals = [];

  for (var i = 0; i < signalsCount; i++) {
    var res = 0;

    for (var j = 1; j < amplitudes.length - 1; j++) {
      res += 2 * amplitudes[j] * Math.cos(2 * j * Math.PI * i * t + fi[j]);
    }

    res += amplitudes[0] + amplitudes[amplitudes.length - 1] * Math.cos((amplitudes.length - 1) * Math.PI * i * t + fi[fi.length - 1]);
    restoredSignals.push(res);
  }

  return restoredSignals;
}

/***/ }),

/***/ "./src/Graph.ts":
/*!**********************!*\
  !*** ./src/Graph.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChartType": () => (/* binding */ ChartType),
/* harmony export */   "drawFilterCharacteristics": () => (/* binding */ drawFilterCharacteristics),
/* harmony export */   "drawGraphByYLength": () => (/* binding */ drawGraphByYLength),
/* harmony export */   "drawSt": () => (/* binding */ drawSt),
/* harmony export */   "splitPlane": () => (/* binding */ splitPlane)
/* harmony export */ });
var ChartType;

(function (ChartType) {
  ChartType[ChartType["LineChart"] = 0] = "LineChart";
  ChartType[ChartType["ColumnChart"] = 1] = "ColumnChart";
})(ChartType || (ChartType = {}));

function drawGraph(xData, yData, title, chartType) {
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = new google.visualization.DataTable();
    var chart;
    var options = {
      curveType: 'function',
      title: title,
      legend: 'none',
      focusTarget: 'category'
    };
    if (chartType === ChartType.ColumnChart) chart = new google.visualization.ColumnChart(document.querySelector('#chart'));else chart = new google.visualization.LineChart(document.querySelector('#chart'));
    data.addColumn('number', 'x');
    data.addColumn('number', 'y');
    data.addRows(xData.length);

    for (var i = 0; i < xData.length; i++) {
      data.setCell(i, 0, xData[i]);
      data.setCell(i, 1, yData[i]);
    }

    data.sort(0);
    chart.draw(data, options);
  }
}

function splitPlane(beginPoint, endPoint, step) {
  var cords = [beginPoint];

  do {
    cords.push(cords[cords.length - 1] + step);
  } while (cords[cords.length - 1] < endPoint);

  return cords;
}
function drawSt(SFunc, frequencies, title) {
  var xCords = splitPlane(0, 1, 0.01);
  var yCords = xCords.map(function (x) {
    return SFunc(x, frequencies);
  });
  drawGraph(xCords, yCords, title, ChartType.LineChart);
}
function drawGraphByYLength(yCords, title, chartType) {
  var xCords = splitPlane(0, yCords.length, 1);
  drawGraph(xCords, yCords, title, chartType);
}
function drawFilterCharacteristics(amplitudes, frequencies, title, chartType) {
  var radFrequencies = frequencies.map(function (frequency) {
    return frequency * 2 * Math.PI;
  });
  drawGraph(radFrequencies, amplitudes, title, chartType);
}

/***/ }),

/***/ "./src/Painter.ts":
/*!************************!*\
  !*** ./src/Painter.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Painter = /*#__PURE__*/function () {
  function Painter(ctx) {
    _classCallCheck(this, Painter);

    this.ctx = ctx;
  }

  _createClass(Painter, [{
    key: "paintLineP2P",
    value: function paintLineP2P(vector1, vector2) {
      this.ctx.beginPath();
      this.ctx.moveTo(vector1.x, vector1.y);
      this.ctx.lineTo(vector2.x, vector2.y);
      this.ctx.stroke();
    }
  }, {
    key: "paintLineByDirection",
    value: function paintLineByDirection(source, direction, length) {
      this.ctx.beginPath();
      this.ctx.moveTo(source.x, source.y);
      this.ctx.lineTo(source.x + direction.x * length, source.y + direction.y * length);
      this.ctx.stroke();
    }
  }, {
    key: "fillBackground",
    value: function fillBackground(width, height, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, width, height);
    }
  }, {
    key: "paintCircle",
    value: function paintCircle(circleCenter, radius, color) {
      this.ctx.beginPath();
      this.ctx.arc(circleCenter.x, circleCenter.y, radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = color;
      this.ctx.stroke();
      this.ctx.fill();
    }
  }, {
    key: "paintHollowCircle",
    value: function paintHollowCircle(circleCenter, radius) {
      this.ctx.beginPath();
      this.ctx.arc(circleCenter.x, circleCenter.y, radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
  }, {
    key: "paintRect",
    value: function paintRect(position, width, height, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(position.x - width / 2, position.y - height / 2, width, height);
      this.ctx.stroke();
    }
  }, {
    key: "paintHollowRect",
    value: function paintHollowRect(position, width, height) {
      this.ctx.fillStyle = 'white';
      this.ctx.rect(position.x - width / 2, position.y - height / 2, width, height);
      this.ctx.stroke();
    }
  }, {
    key: "paintTriangle",
    value: function paintTriangle(centerPos, height, baseLength, color) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.moveTo(centerPos.x + height / 2, centerPos.y);
      this.ctx.lineTo(centerPos.x - height / 2, centerPos.y + baseLength / 2);
      this.ctx.lineTo(centerPos.x - height / 2, centerPos.y - baseLength / 2);
      this.ctx.fill();
    }
  }, {
    key: "paintText",
    value: function paintText(position, text, textSize) {
      this.ctx.fillStyle = 'black';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = "".concat(textSize, "px serif");
      this.ctx.fillText(text, position.x, position.y);
      this.ctx.stroke();
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas(width, height, backgroundColor) {
      this.ctx.clearRect(0, 0, width, height);
      this.fillBackground(width, height, backgroundColor);
    }
  }]);

  return Painter;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Painter);

/***/ }),

/***/ "./src/SchemePainter.ts":
/*!******************************!*\
  !*** ./src/SchemePainter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Painter */ "./src/Painter.ts");
/* harmony import */ var _Vector2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector2 */ "./src/Vector2.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var SchemePainter = /*#__PURE__*/function () {
  function SchemePainter(width, height, ctx) {
    _classCallCheck(this, SchemePainter);

    this.height = height;
    this.width = width;
    this.painter = new _Painter__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
  }

  _createClass(SchemePainter, [{
    key: "paintScheme",
    value: function paintScheme(coefficients) {
      var _this = this;

      var summatorRadius = 15;
      var amplifiersHeight = 20;
      var amplifiersBaseLength = 20;
      var delayerLength = 20;
      var delayerAmplDist = 25;
      var blockSize = delayerLength + delayerAmplDist;
      +amplifiersHeight + 20;
      var inPoint = new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](30, 30);
      var outPoint = this.countOutPount(inPoint, coefficients.length, blockSize, summatorRadius);
      var summatorPos = outPoint.sub(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](30, 0));
      var sourcePos = inPoint.moveX(15);
      this.painter.updateCanvas(this.width, this.height, '#fff');
      this.paintInOut(inPoint, outPoint);
      this.paintSummator(summatorPos, summatorRadius);
      this.paintAmplifier(inPoint.add(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](30, 0)), amplifiersHeight, amplifiersBaseLength, 'b0');
      coefficients.forEach(function (coefficient, i) {
        if (i !== 0) sourcePos = _this.paintAmplifierBlock(sourcePos, amplifiersHeight, amplifiersBaseLength, i, summatorPos, delayerLength, delayerAmplDist);
      });
    }
  }, {
    key: "paintAmplifier",
    value: function paintAmplifier(centerPosition, height, baseLength, name) {
      this.painter.paintTriangle(centerPosition, height, baseLength, 'rgb(83, 59, 179)');
      this.painter.paintText(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](centerPosition.x, centerPosition.y - 15), name, 12);
    }
  }, {
    key: "paintAmplifierBlock",
    value: function paintAmplifierBlock(blockSourcePos, amplifiersHeight, amplifiersBaseLength, amplifierNum, summatorPos, delayerLength, delayerAmplDist) {
      var yOffset = 40;
      var cornPos = blockSourcePos.add(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](15, yOffset));
      var delayer = cornPos.moveX(delayerLength / 2);
      var amplifierPos = delayer.moveX(delayerLength / 2 + 15 + amplifiersHeight / 2);
      var newSourcePos = delayer.moveX(delayerLength / 2 + delayerAmplDist / 4);
      this.painter.paintLineP2P(blockSourcePos, blockSourcePos.moveY(yOffset));
      this.painter.paintLineP2P(blockSourcePos.moveY(yOffset), cornPos);
      this.painter.paintHollowRect(delayer, delayerLength, delayerLength);
      this.painter.paintText(delayer, 'Z⁻¹', 12);
      this.painter.paintLineP2P(delayer.moveX(delayerLength / 2), delayer.moveX(delayerAmplDist));
      this.paintAmplifier(amplifierPos, amplifiersHeight, amplifiersBaseLength, "b".concat(amplifierNum));
      this.painter.paintLineP2P(amplifierPos.moveX(amplifiersHeight / 2), amplifierPos.moveX(30));
      this.painter.paintLineP2P(amplifierPos.moveX(30), new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](amplifierPos.x + 30, summatorPos.y));
      return newSourcePos;
    }
  }, {
    key: "paintInOut",
    value: function paintInOut(inPoint, outPoint) {
      this.painter.paintLineP2P(inPoint, outPoint);
      this.painter.paintText(inPoint.sub(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 15)), 'X(nT)', 12);
      this.painter.paintText(outPoint.sub(new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](0, 15)), 'y(nT)', 12);
    }
  }, {
    key: "paintSummator",
    value: function paintSummator(centerPos, summatorRadius) {
      this.painter.paintCircle(centerPos, summatorRadius, '#fff');
      this.painter.paintText(centerPos, '+', 25);
    }
  }, {
    key: "countOutPount",
    value: function countOutPount(startPos, coefficientsCount, blockSize, summatorRadius) {
      var outPos = new _Vector2__WEBPACK_IMPORTED_MODULE_1__["default"](0, startPos.y);
      var lineLength = summatorRadius * 4 + 40 + blockSize;
      lineLength = new Array(coefficientsCount - 1).fill(0).reduce(function (sum) {
        return sum + blockSize;
      }, lineLength);
      outPos = outPos.moveX(lineLength);
      return outPos;
    }
  }]);

  return SchemePainter;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SchemePainter);

/***/ }),

/***/ "./src/SignalProcessing.ts":
/*!*********************************!*\
  !*** ./src/SignalProcessing.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a0EvenFunc": () => (/* binding */ a0EvenFunc),
/* harmony export */   "aiEvenFunc": () => (/* binding */ aiEvenFunc),
/* harmony export */   "aiOddFunc": () => (/* binding */ aiOddFunc),
/* harmony export */   "getA": () => (/* binding */ getA),
/* harmony export */   "getAlpha": () => (/* binding */ getAlpha),
/* harmony export */   "getAlphas": () => (/* binding */ getAlphas),
/* harmony export */   "getBlackmanCoefficients": () => (/* binding */ getBlackmanCoefficients),
/* harmony export */   "getCoefficients": () => (/* binding */ getCoefficients),
/* harmony export */   "getD": () => (/* binding */ getD),
/* harmony export */   "getDelta": () => (/* binding */ getDelta),
/* harmony export */   "getDeltaF": () => (/* binding */ getDeltaF),
/* harmony export */   "getFc1p": () => (/* binding */ getFc1p),
/* harmony export */   "getFilterCharacteristics": () => (/* binding */ getFilterCharacteristics),
/* harmony export */   "getFilteredS": () => (/* binding */ getFilteredS),
/* harmony export */   "getHCoefficients": () => (/* binding */ getHCoefficients),
/* harmony export */   "getHemmingCoefficients": () => (/* binding */ getHemmingCoefficients),
/* harmony export */   "getM": () => (/* binding */ getM),
/* harmony export */   "getQuantumS": () => (/* binding */ getQuantumS),
/* harmony export */   "getRestoredS": () => (/* binding */ getRestoredS),
/* harmony export */   "getS": () => (/* binding */ getS),
/* harmony export */   "getSk": () => (/* binding */ getSk),
/* harmony export */   "getTriangleCoefficients": () => (/* binding */ getTriangleCoefficients)
/* harmony export */ });
/* harmony import */ var _Complex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Complex */ "./src/Complex.ts");
/* harmony import */ var _Fourier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Fourier */ "./src/Fourier.ts");
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Graph */ "./src/Graph.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var aiEvenFunc = function aiEvenFunc(i, fc1p, fd) {
  return Math.sin(2 * Math.PI * i * (fc1p / fd)) / (Math.PI * i);
};
var aiOddFunc = function aiOddFunc(i, fc1p, fd) {
  return Math.sin(2 * Math.PI * (i - 0.5) * (fc1p / fd)) / (Math.PI * (i - 0.5));
};
var a0EvenFunc = function a0EvenFunc(fc1p, m) {
  return 2 * (fc1p / m);
};
function getDelta(An, Az) {
  var pow1 = 0.05 * An;
  var pow2 = 0.05 * Az * -1;
  var delta1 = (Math.pow(10, pow1) - 1) / (Math.pow(10, pow1) + 1);
  var delta2 = Math.pow(10, pow2);
  return Math.min(delta1, delta2);
}
function getDeltaF(fz, fc) {
  return fz - fc;
}
function getFc1p(fc, deltaF) {
  return fc + deltaF / 2;
}
function getA(delta) {
  return -20 * Math.log10(delta);
}
function getD(A) {
  if (A <= 21) return 0.9222;else return (A - 7.95) / 14.36;
}
function getM(D, deltaF, fd) {
  return Math.ceil(fd * D / deltaF);
}
function getAlpha(A) {
  if (A <= 21) return 0;else if (A > 21 && A < 50) return 0.5842 * Math.pow(A - 21, 0.4) + 0.07886 * (A - 21);else return 0.1102 * (A - 8.7);
}
function getCoefficients(M, fc1p, fd) {
  var coefficients = new Array(Math.round(M / 2) + 1).fill(0);
  var aiFunc = M % 2 === 0 ? aiEvenFunc : aiOddFunc;
  coefficients = coefficients.map(function (num, i) {
    if (i === 0) return a0EvenFunc(fc1p, fd);else return aiFunc(i, fc1p, fd);
  });
  return coefficients;
}

function getFactorial(num) {
  var factorial = new Array(num).fill(0).reduce(function (mult, curNum, i) {
    return mult * (i + 1);
  }, 1);
  return factorial;
}

function getIO(x) {
  var I = new Array(10).fill(0).reduce(function (sum, num, i) {
    return sum + Math.pow(Math.pow(x / 2, i + 1) / getFactorial(i + 1), 2);
  }, 1);
  return I;
}

function getAlphas(M, alpha, coefficients) {
  var alphasI = new Array(Math.round(M / 2) + 1).fill(0);
  alphasI = alphasI.map(function (num, i) {
    var beta = alpha * Math.sqrt(1 - Math.pow(2 * i / M, 2));
    var w = getIO(beta) / getIO(alpha);
    return coefficients[i] * w;
  });
  return alphasI;
}
function getHCoefficients(alphas, M) {
  var hCoefficients = [];
  var halfM = Math.floor(M / 2);

  for (var i = 0; i < halfM; i++) {
    hCoefficients[i] = alphas[halfM - i];
  }

  hCoefficients[halfM] = alphas[0];

  for (var _i = halfM + 1; _i < M; _i++) {
    hCoefficients[_i] = hCoefficients[M - _i];
  }

  return hCoefficients;
}
function getTriangleCoefficients(coefficients, N) {
  var w = new Array(coefficients.length).fill(0);
  var newH = [];
  w = w.map(function (num, i) {
    if (i <= (N - 1) / 2) return 2 * i / (N - 1);else return 2 - 2 * i / (N - 1);
  });
  newH = coefficients.map(function (coefficient, i) {
    return coefficient * w[i];
  });
  return newH;
}
function getHemmingCoefficients(coefficients, alpha, N) {
  var w = new Array(coefficients.length).fill(0);
  var alphaQuarter = alpha / 4;
  w = w.map(function (num, i) {
    return (alphaQuarter - (1 - alphaQuarter) * Math.cos(Math.PI * 2 * i / (N - 1))) * coefficients[i];
  });
  return w;
}
function getBlackmanCoefficients(coefficients, N) {
  var w = new Array(coefficients.length).fill(0);
  w = w.map(function (num, i) {
    return (0.42 - 0.5 * Math.cos(Math.PI * 2 * i / (N - 1)) + 0.08 * Math.cos(Math.PI * 4 * i / (N - 1))) * coefficients[i];
  });
  return w;
}
function getS(t, frequencies) {
  var S = frequencies.reduce(function (sum, frequency, i) {
    return sum + Math.cos(2 * Math.PI * frequency * t);
  }, 0);
  return S;
}
function getSk(frequencies, Nd, Td) {
  var Sk = new Array(Nd).fill(0);
  Sk = Sk.map(function (num, i) {
    return getS(i * Td, frequencies);
  });
  return Sk;
}
function getQuantumS(Nd, Sk, delta) {
  var S = new Array(Nd).fill(0);
  S = S.map(function (num, i) {
    return Math.floor(Sk[i] / delta) * delta;
  });
  return S;
}
function getFilteredS(Nd, hCoefficients, quantumS) {
  var S = new Array(Nd).fill(0).map(function (num, i) {
    var newS = new Array(i + 1).fill(0).reduce(function (sum, num, j) {
      if (i - j < hCoefficients.length) return sum + quantumS[j] * hCoefficients[i - j];else return 0;
    }, 0);
    return newS;
  });
  return S;
}
function getRestoredS(Nd, filteredS) {
  var t = 1 / filteredS.length;

  var _countDFT = (0,_Fourier__WEBPACK_IMPORTED_MODULE_1__.countDFT)(filteredS, Nd),
      _countDFT2 = _slicedToArray(_countDFT, 2),
      amplitudes = _countDFT2[0],
      fi = _countDFT2[1];

  var restoredSignals = (0,_Fourier__WEBPACK_IMPORTED_MODULE_1__.countInverseDFT)(filteredS.length, amplitudes, fi).reverse();
  return {
    amplitudes: amplitudes,
    fi: fi,
    restoredSignals: restoredSignals
  };
}
function getFilterCharacteristics(hCoefficients, M, fd, fc) {
  var characteristics = {
    complex: [],
    amplitudes: [],
    phases: []
  };
  var x = (0,_Graph__WEBPACK_IMPORTED_MODULE_2__.splitPlane)(0, fc, 0.1);
  characteristics.complex = x.map(function (x, i) {
    var complex = new _Complex__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);

    for (var n = 1; n <= M; n++) {
      complex = complex.add(new _Complex__WEBPACK_IMPORTED_MODULE_0__["default"](hCoefficients[n - 1] * Math.cos(n * x), hCoefficients[n - 1] * Math.sin(n * x)));
    }

    characteristics.amplitudes.push(complex.getMagnitude());
    characteristics.phases.push(Math.atan2(complex.imag, complex.real));
    return complex;
  });
  return characteristics;
}

/***/ }),

/***/ "./src/Vector2.ts":
/*!************************!*\
  !*** ./src/Vector2.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Vector2 = /*#__PURE__*/function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    this._x = x;
    this._y = y;
  }

  _createClass(Vector2, [{
    key: "x",
    get: function get() {
      return this._x;
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    } //Возвращает новое местоположение, полученное под воздействием векторной силы

  }, {
    key: "add",
    value: function add(addedVector) {
      var newVector = new Vector2(this._x + addedVector.x, this._y + addedVector.y);
      return newVector;
    } //Возвращает вектор расстояния/направления между двумя местоположениями

  }, {
    key: "sub",
    value: function sub(deductibleVector) {
      var newVector = new Vector2(this._x - deductibleVector.x, this._y - deductibleVector.y);
      return newVector;
    }
  }, {
    key: "mult",
    value: function mult(scale) {
      var newVector = new Vector2(this._x * scale, this._y * scale);
      return newVector;
    }
  }, {
    key: "div",
    value: function div(divider) {
      return new Vector2(this._x / divider, this._y / divider);
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2));
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var magnitude = this.magnitude();
      var normalizeVector = new Vector2(this._x / magnitude, this._y / magnitude);
      return normalizeVector;
    }
  }, {
    key: "setMagnitude",
    value: function setMagnitude(magnitude) {
      return this.normalize().mult(magnitude);
    }
  }, {
    key: "limit",
    value: function limit(limitNum) {
      if (this.magnitude() > limitNum && limitNum !== -1) {
        return this.setMagnitude(limitNum);
      }

      return this;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return this.mult(-1);
    }
  }, {
    key: "moveX",
    value: function moveX(xAdd) {
      return new Vector2(this._x + xAdd, this._y);
    }
  }, {
    key: "moveY",
    value: function moveY(yAdd) {
      return new Vector2(this._x, this._y + yAdd);
    }
  }, {
    key: "lessThen",
    value: function lessThen(vector) {
      if (this._x < vector.x && this._y < vector.y) {
        return true;
      }

      return false;
    }
  }, {
    key: "direction",
    value: function direction(vector) {
      return vector.sub(this).normalize();
    }
  }, {
    key: "distance",
    value: function distance(vector) {
      return vector.sub(this).magnitude();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(x: ".concat(this._x, "; y: ").concat(this._y, ")");
    }
  }], [{
    key: "random",
    value: function random() {
      return new Vector2(Math.random(), Math.random());
    }
  }, {
    key: "zero",
    value: function zero() {
      return new Vector2(0, 0);
    }
  }]);

  return Vector2;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vector2);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Graph */ "./src/Graph.ts");
/* harmony import */ var _SchemePainter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SchemePainter */ "./src/SchemePainter.ts");
/* harmony import */ var _SignalProcessing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SignalProcessing */ "./src/SignalProcessing.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var fcInput = document.querySelector('#fc-input');
var fzInput = document.querySelector('#fz-input');
var anInput = document.querySelector('#An-input');
var azInput = document.querySelector('#Az-input');
var frequenciesInput = document.querySelectorAll('[data-input="frequencies"]');
var filterCoefficientsList = document.querySelector('#filter-coefficients');
var triangleWindowList = document.querySelector('#triangle-window');
var hemmingWindowList = document.querySelector('#hemming-window');
var blackmanWindowList = document.querySelector('#blackman-window');
var sourceSignalBtn = document.querySelector('#source-signal_btn');
var digitalSignalBtn = document.querySelector('#digital-signal_btn');
var filteredSignalBtn = document.querySelector('#filtered-signal_btn');
var impulseSignalBtn = document.querySelector('#impulse-signal_btn');
var amplitudeSignalBtn = document.querySelector('#amplitude-signal_btn');
var phaseSignalBtn = document.querySelector('#phase-signal_btn');
var restoredSignalBtn = document.querySelector('#restored-signal_btn');
var hemmingSignalBtn = document.querySelector('#hemming-signal_btn');
var blackmanSignalBtn = document.querySelector('#blackman-signal_btn');
var triangleSignalBtn = document.querySelector('#triangle-signal_btn');
var countBtn = document.querySelector('#count_btn');
var coefficientsBtn = document.querySelector('#coefficients-show_btn');
var modal = document.querySelector('#modal');
var modalCloseBtn = document.querySelector('#close-btn');
var schemeBtn = document.querySelector('#scheme-show_btn');
var coefficientsOutputBlock = document.querySelector('#coefficients-output');
var canvasHolder = document.querySelector('#canvas-holder');
var schemeCanvas = document.querySelector('#scheme-canvas');
var ctx = schemeCanvas.getContext('2d');
var canvasWidth = 3000;
var canvasHeight = 2000;
var schemePainter = new _SchemePainter__WEBPACK_IMPORTED_MODULE_1__["default"](canvasWidth, canvasHeight, ctx);
var fd = 128;
var m = 64;
var frequencies = [];
var delta = 0;
var deltaF = 0;
var fc1p = 0;
var A = 0;
var D = 0;
var M = 0;
var N = 0;
var alpha = 0;
var Td = 0;
var Nd = 0;
var coefficients = [];
var alphas = [];
var hCoefficients = [];
var Sk = [];
var hTriangles = [];
var hHemming = [];
var hBlackman = [];
var quantumS = [];
var filteredS = [];
var restoredS = {
  amplitudes: [],
  fi: [],
  restoredSignals: []
};
var filterCharacteristics = {
  amplitudes: [],
  phases: [],
  complex: []
};
var triangleFilterCharacteristics = {
  amplitudes: [],
  phases: [],
  complex: []
};
var hemmingFilterCharacteristics = {
  amplitudes: [],
  phases: [],
  complex: []
};
var blackmanFilterCharacteristics = {
  amplitudes: [],
  phases: [],
  complex: []
};

function createListItem(text) {
  var listItem = document.createElement('li');
  listItem.classList.add('coefficients_list_item');
  listItem.textContent = text;
  return listItem;
}

function showCoefficients(coefficients, listBlock) {
  listBlock.innerHTML = '';
  coefficients.forEach(function (coeff) {
    listBlock.append(createListItem(coeff.toString()));
  });
}

function showModal() {
  modal.classList.remove('hide');
}

function count() {
  frequencies = Array.from(frequenciesInput).map(function (input) {
    return parseInt(input.value);
  });
  delta = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getDelta)(parseInt(anInput.value), parseInt(azInput.value));
  deltaF = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getDeltaF)(parseInt(fzInput.value), parseInt(fcInput.value));
  fc1p = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFc1p)(parseInt(fcInput.value), deltaF);
  A = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getA)(delta);
  D = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getD)(A);
  M = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getM)(D, deltaF, fd);
  N = M + 1;
  alpha = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getAlpha)(A);
  Td = 1 / m;
  Nd = Math.round(1 / Td);
  coefficients = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getCoefficients)(M, fc1p, m);
  alphas = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getAlphas)(M, alpha, coefficients);
  hCoefficients = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getHCoefficients)(alphas, M);
  Sk = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getSk)(frequencies, Nd, Td);
  hTriangles = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getTriangleCoefficients)(hCoefficients, N), M;
  hHemming = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getHemmingCoefficients)(hCoefficients, alpha, N), M;
  hBlackman = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getBlackmanCoefficients)(hCoefficients, N), M;
  delta = (Math.max.apply(Math, _toConsumableArray(Sk)) - Math.min.apply(Math, _toConsumableArray(Sk))) / (m - 1);
  quantumS = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getQuantumS)(Nd, Sk, delta);
  filteredS = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFilteredS)(Nd, hCoefficients, quantumS);
  restoredS = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getRestoredS)(Nd, filteredS);
  filterCharacteristics = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFilterCharacteristics)(hCoefficients, M, fd, parseInt(fcInput.value));
  triangleFilterCharacteristics = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFilterCharacteristics)(hTriangles, M, fd, parseInt(fcInput.value));
  hemmingFilterCharacteristics = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFilterCharacteristics)(hHemming, M, fd, parseInt(fcInput.value));
  blackmanFilterCharacteristics = (0,_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getFilterCharacteristics)(hBlackman, M, fd, parseInt(fcInput.value));
  (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawSt)(_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getS, frequencies, 'Исходный сигнал');
  showCoefficients(hCoefficients, filterCoefficientsList);
  showCoefficients(hTriangles, triangleWindowList);
  showCoefficients(hHemming, hemmingWindowList);
  showCoefficients(hBlackman, blackmanWindowList);
  schemePainter.paintScheme(hCoefficients);
}

schemeCanvas.width = canvasWidth;
schemeCanvas.height = canvasHeight;
sourceSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawSt)(_SignalProcessing__WEBPACK_IMPORTED_MODULE_2__.getS, frequencies, 'Исходный сигнал');
});
digitalSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(quantumS, 'Цифровой сигнал', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.ColumnChart);
});
filteredSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(filteredS, 'Отфильтрованный сигнал', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.ColumnChart);
});
impulseSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(hCoefficients, 'Импульсная характеристика', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
amplitudeSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(filterCharacteristics.amplitudes, 'АЧХ', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
phaseSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(filterCharacteristics.phases, 'ФЧХ', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
restoredSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(restoredS.restoredSignals, 'Востановленный сигнал', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
triangleSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(triangleFilterCharacteristics.amplitudes, 'Треугольное окно', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
hemmingSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(hemmingFilterCharacteristics.amplitudes, 'Окно Хемминга', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
blackmanSignalBtn.addEventListener('click', function () {
  return (0,_Graph__WEBPACK_IMPORTED_MODULE_0__.drawGraphByYLength)(blackmanFilterCharacteristics.amplitudes, 'Окно Блэкмена', _Graph__WEBPACK_IMPORTED_MODULE_0__.ChartType.LineChart);
});
count();
countBtn.addEventListener('click', function () {
  count();
});
modalCloseBtn.addEventListener('click', function () {
  modal.classList.add('hide');
});
schemeBtn.addEventListener('click', function () {
  showModal();
  canvasHolder.classList.remove('hide');
  coefficientsOutputBlock.classList.add('hide');
});
coefficientsBtn.addEventListener('click', function () {
  showModal();
  coefficientsOutputBlock.classList.remove('hide');
  canvasHolder.classList.add('hide');
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQXVCUyxNQUF2QixDQUE4QixNQUE5QjtBQUNBM0IsRUFBQUEsdUJBQXVCLENBQUNrQixTQUF4QixDQUFrQ2hRLEdBQWxDLENBQXNDLE1BQXRDO0FBQ0gsQ0FKRDtBQU1BME8sZUFBZSxDQUFDdUMsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDLFlBQU07QUFDNUNULEVBQUFBLFNBQVM7QUFDVDFCLEVBQUFBLHVCQUF1QixDQUFDa0IsU0FBeEIsQ0FBa0NTLE1BQWxDLENBQXlDLE1BQXpDO0FBQ0ExQixFQUFBQSxZQUFZLENBQUNpQixTQUFiLENBQXVCaFEsR0FBdkIsQ0FBMkIsTUFBM0I7QUFDSCxDQUpELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaWduYWwtc3BlY3RyLy4vc3JjL0NvbXBsZXgudHMiLCJ3ZWJwYWNrOi8vc2lnbmFsLXNwZWN0ci8uL3NyYy9Gb3VyaWVyLnRzIiwid2VicGFjazovL3NpZ25hbC1zcGVjdHIvLi9zcmMvR3JhcGgudHMiLCJ3ZWJwYWNrOi8vc2lnbmFsLXNwZWN0ci8uL3NyYy9QYWludGVyLnRzIiwid2VicGFjazovL3NpZ25hbC1zcGVjdHIvLi9zcmMvU2NoZW1lUGFpbnRlci50cyIsIndlYnBhY2s6Ly9zaWduYWwtc3BlY3RyLy4vc3JjL1NpZ25hbFByb2Nlc3NpbmcudHMiLCJ3ZWJwYWNrOi8vc2lnbmFsLXNwZWN0ci8uL3NyYy9WZWN0b3IyLnRzIiwid2VicGFjazovL3NpZ25hbC1zcGVjdHIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2lnbmFsLXNwZWN0ci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc2lnbmFsLXNwZWN0ci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3NpZ25hbC1zcGVjdHIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zaWduYWwtc3BlY3RyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbXBsZXgge1xyXG4gICAgcHJpdmF0ZSBfcmVhbDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaW1hZzogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlYWw6IG51bWJlciwgaW1hZzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhbCA9IHJlYWw7XHJcbiAgICAgICAgdGhpcy5faW1hZyA9IGltYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByZWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpbWFnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb3VuanVnYXRlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcGxleCh0aGlzLl9yZWFsLCB0aGlzLl9pbWFnICogLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNYWduaXR1ZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLl9yZWFsKioyICsgdGhpcy5faW1hZyoqMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChudW06IENvbXBsZXgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbXBsZXgodGhpcy5fcmVhbCArIG51bS5yZWFsLCB0aGlzLl9pbWFnICsgbnVtLmltYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdWIobnVtOiBDb21wbGV4KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wbGV4KHRoaXMuX3JlYWwgLSBudW0ucmVhbCwgdGhpcy5faW1hZyAtIG51bS5pbWFnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXVsdENvbXBsZXgobnVtOiBDb21wbGV4KSB7XHJcbiAgICAgICAgbGV0IG5ld1JlYWwgPSB0aGlzLl9yZWFsICogbnVtLnJlYWwgLSB0aGlzLl9pbWFnICogbnVtLmltYWc7XHJcbiAgICAgICAgbGV0IG5ld0ltYWcgPSB0aGlzLl9yZWFsICogbnVtLmltYWcgKyB0aGlzLl9pbWFnICogbnVtLnJlYWw7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcGxleChuZXdSZWFsLCBuZXdJbWFnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXVsdChudW06IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcGxleCh0aGlzLl9yZWFsICogbnVtLCB0aGlzLl9pbWFnICogbnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGl2Q29tcGxleChudW06IENvbXBsZXgpIHtcclxuICAgICAgICBsZXQgbmV3UmVhbCA9ICh0aGlzLl9yZWFsICogbnVtLnJlYWwgKyB0aGlzLl9pbWFnICogbnVtLmltYWcpIC8gKG51bS5yZWFsKioyICsgbnVtLmltYWcqKjIpO1xyXG4gICAgICAgIGxldCBuZXdJbWFnID0gKHRoaXMuX2ltYWcgKiBudW0ucmVhbCAtIHRoaXMuX3JlYWwgKiBudW0uaW1hZykgLyAobnVtLnJlYWwqKjIgKyBudW0uaW1hZyoqMik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ29tcGxleChuZXdSZWFsLCBuZXdJbWFnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGl2KG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5ld1JlYWwgPSB0aGlzLl9yZWFsIC8gbnVtO1xyXG4gICAgICAgIGxldCBuZXdJbWFnID0gdGhpcy5faW1hZyAvIG51bTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wbGV4KG5ld1JlYWwsIG5ld0ltYWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3cocG93TnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcG93ZWRSZWFsID0gdGhpcy5fcmVhbDtcclxuICAgICAgICBsZXQgcG93ZWRJbWFnID0gdGhpcy5faW1hZztcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHBvd051bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBvd2VkUmVhbCAqPSB0aGlzLl9yZWFsO1xyXG4gICAgICAgICAgICBwb3dlZEltYWcgKj0gdGhpcy5faW1hZztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb21wbGV4KHBvd2VkUmVhbCwgcG93ZWRJbWFnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcGxleDsiLCJpbXBvcnQgQ29tcGxleCBmcm9tIFwiLi9Db21wbGV4XCI7XHJcblxyXG5mdW5jdGlvbiBnZXRTaW51c29pZChpOiBudW1iZXIsIGo6IG51bWJlciwgTjogbnVtYmVyLCBTOiBudW1iZXIpIHtcclxuICAgIGxldCBSZSA9IFMgKiBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgKiBqIC8gTik7XHJcbiAgICBsZXQgSW0gPSBTICogTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpICogaiAvIE4pO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ29tcGxleChSZSwgSW0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY291bnRERlQoZmlsdGVyZWRTOiBudW1iZXJbXSwgTmQ6IG51bWJlcikge1xyXG4gICAgbGV0IGFtcGxpdHVkZXM6IG51bWJlcltdID0gbmV3IEFycmF5KE5kIC8gMikuZmlsbCgwKTtcclxuICAgIGxldCBmaTogbnVtYmVyW10gPSBuZXcgQXJyYXkoYW1wbGl0dWRlcy5sZW5ndGgpLmZpbGwoMCk7XHJcbiAgICBcclxuICAgIGZpbHRlcmVkUy5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgYW1wbGl0dWRlc1swXSA9IChhbXBsaXR1ZGVzWzBdICsgcykgKiAoMSAvIE5kKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYW1wbGl0dWRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjb21wbGV4ID0gbmV3IENvbXBsZXgoMCwgMCk7XHJcblxyXG4gICAgICAgIGZpbHRlcmVkUy5mb3JFYWNoKChzLCBqKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBsZXggPSBjb21wbGV4LmFkZChnZXRTaW51c29pZChpLCBqLCBOZCwgcykpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbXBsZXggPSBjb21wbGV4Lm11bHQoMSAvIE5kKTtcclxuICAgICAgICBhbXBsaXR1ZGVzW2ldID0gY29tcGxleC5nZXRNYWduaXR1ZGUoKTtcclxuICAgICAgICBmaVtpXSA9IE1hdGguYXRhbjIoY29tcGxleC5pbWFnLCBjb21wbGV4LnJlYWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBbYW1wbGl0dWRlcywgZmldO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY291bnRJbnZlcnNlREZUKHNpZ25hbHNDb3VudDogbnVtYmVyLCBhbXBsaXR1ZGVzOiBudW1iZXJbXSwgZmk6IG51bWJlcltdKSB7XHJcbiAgICBsZXQgdCA9IDEgLyBzaWduYWxzQ291bnQ7XHJcbiAgICBsZXQgcmVzdG9yZWRTaWduYWxzID0gW107XHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNpZ25hbHNDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IDA7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgYW1wbGl0dWRlcy5sZW5ndGggLSAxOyBqKyspe1xyXG4gICAgICAgICAgICByZXMgKz0gMiAqIGFtcGxpdHVkZXNbal0gKiBNYXRoLmNvcygyICogaiAqIE1hdGguUEkgKiBpICogdCArIGZpW2pdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcyArPSBhbXBsaXR1ZGVzWzBdICsgYW1wbGl0dWRlc1thbXBsaXR1ZGVzLmxlbmd0aCAtIDFdICogTWF0aC5jb3MoKGFtcGxpdHVkZXMubGVuZ3RoIC0gMSkgKiBNYXRoLlBJICogaSAqIHQgKyBmaVtmaS5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgcmVzdG9yZWRTaWduYWxzLnB1c2gocmVzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdG9yZWRTaWduYWxzO1xyXG59IiwiaW1wb3J0IENvbXBsZXggZnJvbSBcIi4vQ29tcGxleFwiO1xyXG5cclxuZXhwb3J0IGVudW0gQ2hhcnRUeXBlIHtcclxuICAgIExpbmVDaGFydCwgQ29sdW1uQ2hhcnRcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhd0dyYXBoKHhEYXRhOiBudW1iZXJbXSwgeURhdGE6IG51bWJlcltdLCB0aXRsZTogc3RyaW5nLCBjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgZ29vZ2xlLmNoYXJ0cy5sb2FkKCdjdXJyZW50JywgeydwYWNrYWdlcyc6Wydjb3JlY2hhcnQnXX0pO1xyXG4gICAgZ29vZ2xlLmNoYXJ0cy5zZXRPbkxvYWRDYWxsYmFjayhkcmF3Q2hhcnQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRyYXdDaGFydCgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xyXG4gICAgICAgIGxldCBjaGFydDtcclxuICAgICAgICBsZXQgb3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgICAgICBjdXJ2ZVR5cGU6ICdmdW5jdGlvbicsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgbGVnZW5kOiAnbm9uZScsXHJcbiAgICAgICAgICAgIGZvY3VzVGFyZ2V0OiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICB9OyBcclxuICAgICAgICBcclxuICAgICAgICBpZihjaGFydFR5cGUgPT09IENoYXJ0VHlwZS5Db2x1bW5DaGFydClcclxuICAgICAgICAgICAgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uQ29sdW1uQ2hhcnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoYXJ0JykgYXMgRWxlbWVudCk7XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgY2hhcnQgPSBuZXcgZ29vZ2xlLnZpc3VhbGl6YXRpb24uTGluZUNoYXJ0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGFydCcpIGFzIEVsZW1lbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAneCcpO1xyXG4gICAgICAgIGRhdGEuYWRkQ29sdW1uKCdudW1iZXInLCAneScpO1xyXG4gICAgICAgIGRhdGEuYWRkUm93cyh4RGF0YS5sZW5ndGgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHhEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhdGEuc2V0Q2VsbChpLCAwLCB4RGF0YVtpXSk7XHJcbiAgICAgICAgICAgIGRhdGEuc2V0Q2VsbChpLCAxLCB5RGF0YVtpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhLnNvcnQoMCk7XHJcbiAgICAgICAgY2hhcnQuZHJhdyhkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0UGxhbmUoYmVnaW5Qb2ludDogbnVtYmVyLCBlbmRQb2ludDogbnVtYmVyLCBzdGVwOiBudW1iZXIpIHtcclxuICAgIGxldCBjb3JkcyA9IFtiZWdpblBvaW50XTtcclxuXHJcbiAgICBkbyB7XHJcbiAgICAgICAgY29yZHMucHVzaChjb3Jkc1tjb3Jkcy5sZW5ndGggLSAxXSArIHN0ZXApO1xyXG4gICAgfXdoaWxlKGNvcmRzW2NvcmRzLmxlbmd0aCAtIDFdIDwgZW5kUG9pbnQpO1xyXG5cclxuICAgIHJldHVybiBjb3JkcztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkcmF3U3QoU0Z1bmM6ICh0OiBudW1iZXIsIGZyZXF1ZW5jaWVzOiBudW1iZXJbXSkgPT4gbnVtYmVyLCBmcmVxdWVuY2llczogbnVtYmVyW10sIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIGxldCB4Q29yZHMgPSBzcGxpdFBsYW5lKDAsIDEsIDAuMDEpO1xyXG4gICAgbGV0IHlDb3JkcyA9IHhDb3Jkcy5tYXAoKHgpID0+IHtcclxuICAgICAgICByZXR1cm4gU0Z1bmMoeCwgZnJlcXVlbmNpZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJhd0dyYXBoKHhDb3JkcywgeUNvcmRzLCB0aXRsZSwgQ2hhcnRUeXBlLkxpbmVDaGFydCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0dyYXBoQnlZTGVuZ3RoKHlDb3JkczogbnVtYmVyW10sIHRpdGxlOiBzdHJpbmcsIGNoYXJ0VHlwZTogQ2hhcnRUeXBlKSB7XHJcbiAgICBsZXQgeENvcmRzID0gc3BsaXRQbGFuZSgwLCB5Q29yZHMubGVuZ3RoLCAxKTtcclxuXHJcbiAgICBkcmF3R3JhcGgoeENvcmRzLCB5Q29yZHMsIHRpdGxlLCBjaGFydFR5cGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZHJhd0ZpbHRlckNoYXJhY3RlcmlzdGljcyhhbXBsaXR1ZGVzOiBudW1iZXJbXSwgZnJlcXVlbmNpZXM6IG51bWJlcltdLCB0aXRsZTogc3RyaW5nLCBjaGFydFR5cGU6IENoYXJ0VHlwZSkge1xyXG4gICAgbGV0IHJhZEZyZXF1ZW5jaWVzID0gZnJlcXVlbmNpZXMubWFwKGZyZXF1ZW5jeSA9PiBmcmVxdWVuY3kgKiAyICogTWF0aC5QSSk7XHJcblxyXG4gICAgZHJhd0dyYXBoKHJhZEZyZXF1ZW5jaWVzLCBhbXBsaXR1ZGVzLCB0aXRsZSwgY2hhcnRUeXBlKVxyXG59IiwiaW1wb3J0IFZlY3RvcjIgZnJvbSBcIi4vVmVjdG9yMlwiO1xyXG5cclxuY2xhc3MgUGFpbnRlciB7XHJcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICB9XHJcblxyXG4gICAgcGFpbnRMaW5lUDJQKHZlY3RvcjE6IFZlY3RvcjIsIHZlY3RvcjI6IFZlY3RvcjIpIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8odmVjdG9yMS54LCB2ZWN0b3IxLnkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh2ZWN0b3IyLngsIHZlY3RvcjIueSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICBwYWludExpbmVCeURpcmVjdGlvbihzb3VyY2U6IFZlY3RvcjIsIGRpcmVjdGlvbjogVmVjdG9yMiwgbGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oc291cmNlLngsIHNvdXJjZS55KTtcclxuICAgICAgICB0aGlzLmN0eC5saW5lVG8oc291cmNlLnggKyAoZGlyZWN0aW9uLnggKiBsZW5ndGgpLCBzb3VyY2UueSArIChkaXJlY3Rpb24ueSAqIGxlbmd0aCkpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG4gICAgZmlsbEJhY2tncm91bmQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIHBhaW50Q2lyY2xlKGNpcmNsZUNlbnRlcjogVmVjdG9yMiwgcmFkaXVzOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICB0aGlzLmN0eC5hcmMoY2lyY2xlQ2VudGVyLngsIGNpcmNsZUNlbnRlci55LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XHJcbiAgICB9XHJcbiAgICBwYWludEhvbGxvd0NpcmNsZShjaXJjbGVDZW50ZXI6IFZlY3RvcjIsIHJhZGl1czogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgdGhpcy5jdHguYXJjKGNpcmNsZUNlbnRlci54LCBjaXJjbGVDZW50ZXIueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICB9XHJcbiAgICBwYWludFJlY3QocG9zaXRpb246IFZlY3RvcjIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QocG9zaXRpb24ueCAtICh3aWR0aCAvIDIpLCBwb3NpdGlvbi55IC0gKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuICAgIHBhaW50SG9sbG93UmVjdChwb3NpdGlvbjogVmVjdG9yMiwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgIHRoaXMuY3R4LnJlY3QocG9zaXRpb24ueCAtICh3aWR0aCAvIDIpLCBwb3NpdGlvbi55IC0gKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYWludFRyaWFuZ2xlKGNlbnRlclBvczogVmVjdG9yMiwgaGVpZ2h0OiBudW1iZXIsIGJhc2VMZW5ndGg6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhjZW50ZXJQb3MueCArIChoZWlnaHQgLyAyKSwgY2VudGVyUG9zLnkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyhjZW50ZXJQb3MueCAtIChoZWlnaHQgLyAyKSwgY2VudGVyUG9zLnkgKyAoYmFzZUxlbmd0aCAvIDIpKTtcclxuICAgICAgICB0aGlzLmN0eC5saW5lVG8oY2VudGVyUG9zLnggLSAoaGVpZ2h0IC8gMiksIGNlbnRlclBvcy55IC0gKGJhc2VMZW5ndGggLyAyKSk7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhaW50VGV4dChwb3NpdGlvbjogVmVjdG9yMiwgdGV4dDogc3RyaW5nLCB0ZXh0U2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gYCR7dGV4dFNpemV9cHggc2VyaWZgO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNhbnZhcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgYmFja2dyb3VuZENvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5maWxsQmFja2dyb3VuZCh3aWR0aCwgaGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWludGVyOyIsImltcG9ydCBQYWludGVyIGZyb20gXCIuL1BhaW50ZXJcIjtcclxuaW1wb3J0IFZlY3RvcjIgZnJvbSBcIi4vVmVjdG9yMlwiO1xyXG5cclxuY2xhc3MgU2NoZW1lUGFpbnRlciB7XHJcbiAgICBwcml2YXRlIHBhaW50ZXI6IFBhaW50ZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLnBhaW50ZXIgPSBuZXcgUGFpbnRlcihjdHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhaW50U2NoZW1lKGNvZWZmaWNpZW50czogbnVtYmVyW10pIHtcclxuICAgICAgICBsZXQgc3VtbWF0b3JSYWRpdXMgPSAxNTtcclxuICAgICAgICBsZXQgYW1wbGlmaWVyc0hlaWdodCA9IDIwO1xyXG4gICAgICAgIGxldCBhbXBsaWZpZXJzQmFzZUxlbmd0aCA9IDIwO1xyXG4gICAgICAgIGxldCBkZWxheWVyTGVuZ3RoID0gMjA7XHJcbiAgICAgICAgbGV0IGRlbGF5ZXJBbXBsRGlzdCA9IDI1O1xyXG4gICAgICAgIGxldCBibG9ja1NpemUgPSBkZWxheWVyTGVuZ3RoICsgZGVsYXllckFtcGxEaXN0OyArIGFtcGxpZmllcnNIZWlnaHQgKyAyMDtcclxuICAgICAgICBsZXQgaW5Qb2ludCA9IG5ldyBWZWN0b3IyKDMwLCAzMCk7XHJcbiAgICAgICAgbGV0IG91dFBvaW50ID0gdGhpcy5jb3VudE91dFBvdW50KGluUG9pbnQsIGNvZWZmaWNpZW50cy5sZW5ndGgsIGJsb2NrU2l6ZSwgc3VtbWF0b3JSYWRpdXMpO1xyXG4gICAgICAgIGxldCBzdW1tYXRvclBvcyA9IG91dFBvaW50LnN1YihuZXcgVmVjdG9yMigzMCwgMCkpO1xyXG4gICAgICAgIGxldCBzb3VyY2VQb3M6IFZlY3RvcjIgPSBpblBvaW50Lm1vdmVYKDE1KTtcclxuXHJcbiAgICAgICAgdGhpcy5wYWludGVyLnVwZGF0ZUNhbnZhcyh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgJyNmZmYnKTtcclxuICAgICAgICB0aGlzLnBhaW50SW5PdXQoaW5Qb2ludCwgb3V0UG9pbnQpO1xyXG4gICAgICAgIHRoaXMucGFpbnRTdW1tYXRvcihzdW1tYXRvclBvcywgc3VtbWF0b3JSYWRpdXMpO1xyXG4gICAgICAgIHRoaXMucGFpbnRBbXBsaWZpZXIoaW5Qb2ludC5hZGQobmV3IFZlY3RvcjIoMzAsIDApKSwgYW1wbGlmaWVyc0hlaWdodCwgYW1wbGlmaWVyc0Jhc2VMZW5ndGgsICdiMCcpO1xyXG5cclxuICAgICAgICBjb2VmZmljaWVudHMuZm9yRWFjaCgoY29lZmZpY2llbnQsIGkpID0+IHtcclxuICAgICAgICAgICAgaWYoaSAhPT0gMClcclxuICAgICAgICAgICAgICAgIHNvdXJjZVBvcyA9IHRoaXMucGFpbnRBbXBsaWZpZXJCbG9jayhzb3VyY2VQb3MsIGFtcGxpZmllcnNIZWlnaHQsIGFtcGxpZmllcnNCYXNlTGVuZ3RoLCBpLCBzdW1tYXRvclBvcywgZGVsYXllckxlbmd0aCwgZGVsYXllckFtcGxEaXN0KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFpbnRBbXBsaWZpZXIoY2VudGVyUG9zaXRpb246IFZlY3RvcjIsIGhlaWdodDogbnVtYmVyLCBiYXNlTGVuZ3RoOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5wYWludFRyaWFuZ2xlKGNlbnRlclBvc2l0aW9uLCBoZWlnaHQsIGJhc2VMZW5ndGgsICdyZ2IoODMsIDU5LCAxNzkpJyk7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50VGV4dChuZXcgVmVjdG9yMihjZW50ZXJQb3NpdGlvbi54LCBjZW50ZXJQb3NpdGlvbi55IC0gMTUpLCBuYW1lLCAxMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWludEFtcGxpZmllckJsb2NrKGJsb2NrU291cmNlUG9zOiBWZWN0b3IyLCBhbXBsaWZpZXJzSGVpZ2h0OiBudW1iZXIsIGFtcGxpZmllcnNCYXNlTGVuZ3RoOiBudW1iZXIsIGFtcGxpZmllck51bTogbnVtYmVyLCBzdW1tYXRvclBvczogVmVjdG9yMiwgZGVsYXllckxlbmd0aDogbnVtYmVyLCBkZWxheWVyQW1wbERpc3Q6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gNDA7XHJcbiAgICAgICAgbGV0IGNvcm5Qb3MgPSBibG9ja1NvdXJjZVBvcy5hZGQobmV3IFZlY3RvcjIoMTUsIHlPZmZzZXQpKTtcclxuICAgICAgICBsZXQgZGVsYXllciA9IGNvcm5Qb3MubW92ZVgoZGVsYXllckxlbmd0aCAvIDIpO1xyXG4gICAgICAgIGxldCBhbXBsaWZpZXJQb3MgPSBkZWxheWVyLm1vdmVYKGRlbGF5ZXJMZW5ndGggLyAyICsgMTUgKyBhbXBsaWZpZXJzSGVpZ2h0IC8gMik7XHJcbiAgICAgICAgbGV0IG5ld1NvdXJjZVBvcyA9IGRlbGF5ZXIubW92ZVgoZGVsYXllckxlbmd0aCAvIDIgKyBkZWxheWVyQW1wbERpc3QgLyA0KTtcclxuXHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50TGluZVAyUChibG9ja1NvdXJjZVBvcywgYmxvY2tTb3VyY2VQb3MubW92ZVkoeU9mZnNldCkpO1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5wYWludExpbmVQMlAoYmxvY2tTb3VyY2VQb3MubW92ZVkoeU9mZnNldCksIGNvcm5Qb3MpO1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5wYWludEhvbGxvd1JlY3QoZGVsYXllciwgZGVsYXllckxlbmd0aCwgZGVsYXllckxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50VGV4dChkZWxheWVyLCAnWuKBu8K5JywgMTIpO1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5wYWludExpbmVQMlAoZGVsYXllci5tb3ZlWChkZWxheWVyTGVuZ3RoIC8gMiksIGRlbGF5ZXIubW92ZVgoZGVsYXllckFtcGxEaXN0KSk7XHJcbiAgICAgICAgdGhpcy5wYWludEFtcGxpZmllcihhbXBsaWZpZXJQb3MsIGFtcGxpZmllcnNIZWlnaHQsIGFtcGxpZmllcnNCYXNlTGVuZ3RoLCBgYiR7YW1wbGlmaWVyTnVtfWApO1xyXG4gICAgICAgIHRoaXMucGFpbnRlci5wYWludExpbmVQMlAoYW1wbGlmaWVyUG9zLm1vdmVYKGFtcGxpZmllcnNIZWlnaHQgLyAyKSwgYW1wbGlmaWVyUG9zLm1vdmVYKDMwKSk7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50TGluZVAyUChhbXBsaWZpZXJQb3MubW92ZVgoMzApLCBuZXcgVmVjdG9yMihhbXBsaWZpZXJQb3MueCArIDMwLCBzdW1tYXRvclBvcy55KSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdTb3VyY2VQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYWludEluT3V0KGluUG9pbnQ6IFZlY3RvcjIsIG91dFBvaW50OiBWZWN0b3IyKSB7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50TGluZVAyUChpblBvaW50LCBvdXRQb2ludCk7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50VGV4dChpblBvaW50LnN1YihuZXcgVmVjdG9yMigwLCAxNSkpLCAnWChuVCknLCAxMik7XHJcbiAgICAgICAgdGhpcy5wYWludGVyLnBhaW50VGV4dChvdXRQb2ludC5zdWIobmV3IFZlY3RvcjIoMCwgMTUpKSwgJ3koblQpJywgMTIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFpbnRTdW1tYXRvcihjZW50ZXJQb3M6IFZlY3RvcjIsIHN1bW1hdG9yUmFkaXVzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBhaW50ZXIucGFpbnRDaXJjbGUoY2VudGVyUG9zLCBzdW1tYXRvclJhZGl1cywgJyNmZmYnKTtcclxuICAgICAgICB0aGlzLnBhaW50ZXIucGFpbnRUZXh0KGNlbnRlclBvcywgJysnLCAyNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3VudE91dFBvdW50KHN0YXJ0UG9zOiBWZWN0b3IyLCBjb2VmZmljaWVudHNDb3VudDogbnVtYmVyLCBibG9ja1NpemU6IG51bWJlciwgc3VtbWF0b3JSYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBvdXRQb3MgPSBuZXcgVmVjdG9yMigwLCBzdGFydFBvcy55KTtcclxuICAgICAgICBsZXQgbGluZUxlbmd0aCA9IHN1bW1hdG9yUmFkaXVzICogNCArIDQwICsgYmxvY2tTaXplO1xyXG5cclxuICAgICAgICBsaW5lTGVuZ3RoID0gbmV3IEFycmF5KGNvZWZmaWNpZW50c0NvdW50IC0gMSkuZmlsbCgwKS5yZWR1Y2UoKHN1bSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VtICsgYmxvY2tTaXplO1xyXG4gICAgICAgIH0sIGxpbmVMZW5ndGgpO1xyXG5cclxuICAgICAgICBvdXRQb3MgPSBvdXRQb3MubW92ZVgobGluZUxlbmd0aCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvdXRQb3M7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTY2hlbWVQYWludGVyOyIsImltcG9ydCBDb21wbGV4IGZyb20gXCIuL0NvbXBsZXhcIjtcclxuaW1wb3J0IHsgY291bnRERlQsIGNvdW50SW52ZXJzZURGVCB9IGZyb20gXCIuL0ZvdXJpZXJcIjtcclxuaW1wb3J0IHsgc3BsaXRQbGFuZSB9IGZyb20gXCIuL0dyYXBoXCI7XHJcblxyXG5leHBvcnQgY29uc3QgYWlFdmVuRnVuYyA9IChpOiBudW1iZXIsIGZjMXA6IG51bWJlciwgZmQ6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGguc2luKDIgKiBNYXRoLlBJICogaSAqIChmYzFwIC8gZmQpKSAvIChNYXRoLlBJICogaSk7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGFpT2RkRnVuYyA9IChpOiBudW1iZXIsIGZjMXA6IG51bWJlciwgZmQ6IG51bWJlcikgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGguc2luKDIgKiBNYXRoLlBJICogKGkgLSAwLjUpICogKGZjMXAgLyBmZCkpIC8gKE1hdGguUEkgKiAoaSAtIDAuNSkpO1xyXG59XHJcbmV4cG9ydCBjb25zdCBhMEV2ZW5GdW5jID0gKGZjMXA6IG51bWJlciwgbTogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gMiAqIChmYzFwIC8gbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWx0YShBbjogbnVtYmVyLCBBejogbnVtYmVyKSB7XHJcbiAgICBsZXQgcG93MSA9IDAuMDUgKiBBbjtcclxuICAgIGxldCBwb3cyID0gMC4wNSAqIEF6ICogLTE7XHJcblxyXG4gICAgbGV0IGRlbHRhMSA9ICgxMCoqcG93MSAtIDEpIC8gKDEwKipwb3cxICsgMSk7XHJcbiAgICBsZXQgZGVsdGEyID0gMTAqKnBvdzI7XHJcblxyXG4gICAgcmV0dXJuIE1hdGgubWluKGRlbHRhMSwgZGVsdGEyKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVsdGFGKGZ6OiBudW1iZXIsIGZjOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBmeiAtIGZjXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZjMXAoZmM6IG51bWJlciwgZGVsdGFGOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBmYyArIGRlbHRhRiAvIDI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBKGRlbHRhOiBudW1iZXIpIHtcclxuICAgIHJldHVybiAtMjAgKiBNYXRoLmxvZzEwKGRlbHRhKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RChBOiBudW1iZXIpIHtcclxuICAgIGlmKEEgPD0gMjEpXHJcbiAgICAgICAgcmV0dXJuIDAuOTIyMjtcclxuICAgIGVsc2VcclxuICAgICAgICByZXR1cm4gKEEgLSA3Ljk1KSAvIDE0LjM2O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRNKEQ6IG51bWJlciwgZGVsdGFGOiBudW1iZXIsIGZkOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmNlaWwoZmQgKiBEIC8gZGVsdGFGKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxwaGEoQTogbnVtYmVyKSB7XHJcbiAgICBpZihBIDw9IDIxKVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgZWxzZSBpZihBID4gMjEgJiYgQSA8IDUwKVxyXG4gICAgICAgIHJldHVybiAwLjU4NDIgKiAoQSAtIDIxKSoqMC40ICsgMC4wNzg4NiAqIChBIC0gMjEpO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiAwLjExMDIgKiAoQSAtIDguNyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb2VmZmljaWVudHMoTTogbnVtYmVyLCBmYzFwOiBudW1iZXIsIGZkOiBudW1iZXIpIHtcclxuICAgIGxldCBjb2VmZmljaWVudHM6IG51bWJlcltdID0gbmV3IEFycmF5KE1hdGgucm91bmQoTSAvIDIpICsgMSkuZmlsbCgwKTtcclxuICAgIGxldCBhaUZ1bmMgPSBNICUgMiA9PT0gMCA/IGFpRXZlbkZ1bmMgOiBhaU9kZEZ1bmM7XHJcblxyXG4gICAgY29lZmZpY2llbnRzID0gY29lZmZpY2llbnRzLm1hcCgobnVtLCBpKSA9PiB7XHJcbiAgICAgICAgaWYoaSA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIGEwRXZlbkZ1bmMoZmMxcCwgZmQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGFpRnVuYyhpLCBmYzFwLCBmZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29lZmZpY2llbnRzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRGYWN0b3JpYWwobnVtOiBudW1iZXIpIHtcclxuICAgIGxldCBmYWN0b3JpYWwgPSBuZXcgQXJyYXkobnVtKS5maWxsKDApLnJlZHVjZSgobXVsdCwgY3VyTnVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG11bHQgKiAoaSArIDEpO1xyXG4gICAgfSwgMSk7XHJcblxyXG4gICAgcmV0dXJuIGZhY3RvcmlhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SU8oeDogbnVtYmVyKSB7XHJcbiAgICBsZXQgSSA9IG5ldyBBcnJheSgxMCkuZmlsbCgwKS5yZWR1Y2UoKHN1bSwgbnVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHN1bSArICgoeCAvIDIpKiooaSArIDEpIC8gZ2V0RmFjdG9yaWFsKGkgKyAxKSkqKjJcclxuICAgIH0sIDEpO1xyXG5cclxuICAgIHJldHVybiBJO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxwaGFzKE06IG51bWJlciwgYWxwaGE6IG51bWJlciwgY29lZmZpY2llbnRzOiBudW1iZXJbXSkge1xyXG4gICAgbGV0IGFscGhhc0kgPSBuZXcgQXJyYXkoTWF0aC5yb3VuZChNIC8gMikgKyAxKS5maWxsKDApO1xyXG4gICAgXHJcbiAgICBhbHBoYXNJID0gYWxwaGFzSS5tYXAoKG51bSwgaSkgPT4ge1xyXG4gICAgICAgIGxldCBiZXRhID0gYWxwaGEgKiBNYXRoLnNxcnQoMSAtICgyICogaSAvIE0pKioyKTtcclxuICAgICAgICBsZXQgdyA9IGdldElPKGJldGEpIC8gZ2V0SU8oYWxwaGEpO1xyXG4gICAgICAgIHJldHVybiBjb2VmZmljaWVudHNbaV0gKiB3O1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGFscGhhc0k7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhDb2VmZmljaWVudHMoYWxwaGFzOiBudW1iZXJbXSwgTTogbnVtYmVyKSB7XHJcbiAgICBsZXQgaENvZWZmaWNpZW50czogbnVtYmVyW10gPSBbXTtcclxuICAgIGxldCBoYWxmTSA9IE1hdGguZmxvb3IoTSAvIDIpO1xyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBoYWxmTTsgaSsrKSB7XHJcbiAgICAgICAgaENvZWZmaWNpZW50c1tpXSA9IGFscGhhc1toYWxmTSAtIGldO1xyXG4gICAgfVxyXG5cclxuICAgIGhDb2VmZmljaWVudHNbaGFsZk1dID0gYWxwaGFzWzBdO1xyXG5cclxuICAgIGZvcihsZXQgaSA9IGhhbGZNICsgMTsgaSA8IE07IGkrKykge1xyXG4gICAgICAgIGhDb2VmZmljaWVudHNbaV0gPSBoQ29lZmZpY2llbnRzW00gLSBpXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaENvZWZmaWNpZW50cztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJpYW5nbGVDb2VmZmljaWVudHMoY29lZmZpY2llbnRzOiBudW1iZXJbXSwgTjogbnVtYmVyKSB7XHJcbiAgICBsZXQgdyA9IG5ldyBBcnJheShjb2VmZmljaWVudHMubGVuZ3RoKS5maWxsKDApO1xyXG4gICAgbGV0IG5ld0ggPSBbXTtcclxuXHJcbiAgICB3ID0gdy5tYXAoKG51bSwgaSkgPT4ge1xyXG4gICAgICAgIGlmKGkgPD0gKE4gLSAxKSAvIDIpXHJcbiAgICAgICAgICAgIHJldHVybiAoMiAqIGkpIC8gKE4gLSAxKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiAyIC0gKDIgKiBpKSAvIChOIC0gMSk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbmV3SCA9IGNvZWZmaWNpZW50cy5tYXAoKGNvZWZmaWNpZW50LCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvZWZmaWNpZW50ICogd1tpXTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXdIO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIZW1taW5nQ29lZmZpY2llbnRzKGNvZWZmaWNpZW50czogbnVtYmVyW10sIGFscGhhOiBudW1iZXIsIE46IG51bWJlcikge1xyXG4gICAgbGV0IHcgPSBuZXcgQXJyYXkoY29lZmZpY2llbnRzLmxlbmd0aCkuZmlsbCgwKTtcclxuICAgIGxldCBhbHBoYVF1YXJ0ZXIgPSBhbHBoYSAvIDQ7XHJcblxyXG4gICAgdyA9IHcubWFwKChudW0sIGkpID0+IHtcclxuICAgICAgICByZXR1cm4gKChhbHBoYVF1YXJ0ZXIgLSAoMSAtIGFscGhhUXVhcnRlcikgKiBNYXRoLmNvcyhNYXRoLlBJICogMiAqIGkgLyAoTiAtIDEpKSkgKiBjb2VmZmljaWVudHNbaV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHc7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJsYWNrbWFuQ29lZmZpY2llbnRzKGNvZWZmaWNpZW50czogbnVtYmVyW10sIE46IG51bWJlcikge1xyXG4gICAgbGV0IHcgPSBuZXcgQXJyYXkoY29lZmZpY2llbnRzLmxlbmd0aCkuZmlsbCgwKTtcclxuXHJcbiAgICB3ID0gdy5tYXAoKG51bSwgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoMC40MiAtIDAuNSAqIE1hdGguY29zKE1hdGguUEkgKiAyICogaSAvIChOIC0gMSkpICsgMC4wOCAqIE1hdGguY29zKE1hdGguUEkgKiA0ICogaSAvIChOIC0gMSkpKSAqIGNvZWZmaWNpZW50c1tpXTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB3O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Uyh0OiBudW1iZXIsIGZyZXF1ZW5jaWVzOiBudW1iZXJbXSkge1xyXG4gICAgbGV0IFMgPSBmcmVxdWVuY2llcy5yZWR1Y2UoKHN1bSwgZnJlcXVlbmN5LCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHN1bSArIE1hdGguY29zKDIgKiBNYXRoLlBJICogZnJlcXVlbmN5ICogdCk7XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICByZXR1cm4gUztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2soZnJlcXVlbmNpZXM6IG51bWJlcltdLCBOZDogbnVtYmVyLCBUZDogbnVtYmVyKSB7XHJcbiAgICBsZXQgU2sgPSBuZXcgQXJyYXkoTmQpLmZpbGwoMCk7XHJcblxyXG4gICAgU2sgPSBTay5tYXAoKG51bSwgaSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBnZXRTKGkgKiBUZCwgZnJlcXVlbmNpZXMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFNrO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRRdWFudHVtUyhOZDogbnVtYmVyLCBTazogbnVtYmVyW10sIGRlbHRhOiBudW1iZXIpIHtcclxuICAgIGxldCBTID0gbmV3IEFycmF5KE5kKS5maWxsKDApO1xyXG5cclxuICAgIFMgPSBTLm1hcCgobnVtLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoU2tbaV0gLyBkZWx0YSkgKiBkZWx0YTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBTO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJlZFMoTmQ6IG51bWJlciwgaENvZWZmaWNpZW50czogbnVtYmVyW10sIHF1YW50dW1TOiBudW1iZXJbXSkge1xyXG4gICAgbGV0IFMgPSBuZXcgQXJyYXkoTmQpLmZpbGwoMCkubWFwKChudW0sIGkpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IG5ld1MgPSBuZXcgQXJyYXkoaSArIDEpLmZpbGwoMCkucmVkdWNlKChzdW0sIG51bSwgaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSAtIGogPCBoQ29lZmZpY2llbnRzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdW0gKyBxdWFudHVtU1tqXSAqIGhDb2VmZmljaWVudHNbaSAtIGpdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9LCAwKTsgIFxyXG4gICAgICAgIHJldHVybiBuZXdTO1xyXG4gICAgfSlcclxuICAgIHJldHVybiBTO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXN0b3JlZFMoTmQ6IG51bWJlciwgZmlsdGVyZWRTOiBudW1iZXJbXSwpIHtcclxuICAgIGxldCB0ID0gMSAvIGZpbHRlcmVkUy5sZW5ndGg7XHJcbiAgICBsZXQgW2FtcGxpdHVkZXMsIGZpXSA9IChjb3VudERGVChmaWx0ZXJlZFMsIE5kKSk7XHJcbiAgICBsZXQgcmVzdG9yZWRTaWduYWxzOiBudW1iZXJbXSA9IGNvdW50SW52ZXJzZURGVChmaWx0ZXJlZFMubGVuZ3RoLCBhbXBsaXR1ZGVzLCBmaSkucmV2ZXJzZSgpO1xyXG5cclxuICAgIHJldHVybiB7YW1wbGl0dWRlcywgZmksIHJlc3RvcmVkU2lnbmFsc31cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MoaENvZWZmaWNpZW50czogbnVtYmVyW10sIE06IG51bWJlciwgZmQ6IG51bWJlciwgZmM6IG51bWJlcikge1xyXG4gICAgbGV0IGNoYXJhY3RlcmlzdGljczoge1xyXG4gICAgICAgIGNvbXBsZXg6IENvbXBsZXhbXSxcclxuICAgICAgICBhbXBsaXR1ZGVzOiBudW1iZXJbXSxcclxuICAgICAgICBwaGFzZXM6IG51bWJlcltdXHJcbiAgICB9ID0ge2NvbXBsZXg6IFtdLCBhbXBsaXR1ZGVzOiBbXSwgcGhhc2VzOiBbXX07XHJcbiAgICBsZXQgeCA9IHNwbGl0UGxhbmUoMCwgZmMsIDAuMSk7XHJcblxyXG4gICAgY2hhcmFjdGVyaXN0aWNzLmNvbXBsZXggPSB4Lm1hcCgoeCwgaSkgPT4ge1xyXG4gICAgICAgIGxldCBjb21wbGV4ID0gbmV3IENvbXBsZXgoMCwgMCk7XHJcblxyXG4gICAgICAgIGZvcihsZXQgbiA9IDE7IG4gPD0gTTsgbisrKSB7XHJcbiAgICAgICAgICAgIGNvbXBsZXggPSBjb21wbGV4LmFkZChuZXcgQ29tcGxleChoQ29lZmZpY2llbnRzW24gLSAxXSAqIE1hdGguY29zKG4gKiB4KSwgaENvZWZmaWNpZW50c1tuIC0gMV0gKiBNYXRoLnNpbihuICogeCkpKTsgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhcmFjdGVyaXN0aWNzLmFtcGxpdHVkZXMucHVzaChjb21wbGV4LmdldE1hZ25pdHVkZSgpKTtcclxuICAgICAgICBjaGFyYWN0ZXJpc3RpY3MucGhhc2VzLnB1c2goTWF0aC5hdGFuMihjb21wbGV4LmltYWcsIGNvbXBsZXgucmVhbCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29tcGxleDtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjaGFyYWN0ZXJpc3RpY3M7XHJcbn1cclxuIiwiY2xhc3MgVmVjdG9yMiB7XHJcbiAgICBwcml2YXRlIF94OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF95OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl94ID0geDtcclxuICAgICAgICB0aGlzLl95ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl94O1xyXG4gICAgfVxyXG4gICAgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5feTtcclxuICAgIH1cclxuXHJcbiAgICAvL9CS0L7Qt9Cy0YDQsNGJ0LDQtdGCINC90L7QstC+0LUg0LzQtdGB0YLQvtC/0L7Qu9C+0LbQtdC90LjQtSwg0L/QvtC70YPRh9C10L3QvdC+0LUg0L/QvtC0INCy0L7Qt9C00LXQudGB0YLQstC40LXQvCDQstC10LrRgtC+0YDQvdC+0Lkg0YHQuNC70YtcclxuICAgIGFkZChhZGRlZFZlY3RvcjogVmVjdG9yMik6IFZlY3RvcjIge1xyXG4gICAgICAgIGNvbnN0IG5ld1ZlY3RvciA9IG5ldyBWZWN0b3IyKHRoaXMuX3ggKyBhZGRlZFZlY3Rvci54LCB0aGlzLl95ICsgYWRkZWRWZWN0b3IueSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvL9CS0L7Qt9Cy0YDQsNGJ0LDQtdGCINCy0LXQutGC0L7RgCDRgNCw0YHRgdGC0L7Rj9C90LjRjy/QvdCw0L/RgNCw0LLQu9C10L3QuNGPINC80LXQttC00YMg0LTQstGD0LzRjyDQvNC10YHRgtC+0L/QvtC70L7QttC10L3QuNGP0LzQuFxyXG4gICAgc3ViKGRlZHVjdGlibGVWZWN0b3I6IFZlY3RvcjIpOiBWZWN0b3IyIHtcclxuICAgICAgICBjb25zdCBuZXdWZWN0b3IgPSBuZXcgVmVjdG9yMih0aGlzLl94IC0gZGVkdWN0aWJsZVZlY3Rvci54LCB0aGlzLl95IC0gZGVkdWN0aWJsZVZlY3Rvci55KTtcclxuICAgICAgICByZXR1cm4gbmV3VmVjdG9yO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtdWx0KHNjYWxlOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICBjb25zdCBuZXdWZWN0b3IgPSBuZXcgVmVjdG9yMih0aGlzLl94ICogc2NhbGUsIHRoaXMuX3kgKiBzY2FsZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBkaXYoZGl2aWRlcjogbnVtYmVyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMuX3ggLyBkaXZpZGVyLCB0aGlzLl95IC8gZGl2aWRlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1hZ25pdHVkZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5feCwgMikgKyBNYXRoLnBvdyh0aGlzLl95LCAyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsaXplKCk6IFZlY3RvcjIge1xyXG4gICAgICAgIGNvbnN0IG1hZ25pdHVkZSA9IHRoaXMubWFnbml0dWRlKCk7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplVmVjdG9yID0gbmV3IFZlY3RvcjIodGhpcy5feCAvIG1hZ25pdHVkZSwgdGhpcy5feSAvIG1hZ25pdHVkZSk7XHJcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNYWduaXR1ZGUobWFnbml0dWRlOiBudW1iZXIpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUoKS5tdWx0KG1hZ25pdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGltaXQobGltaXROdW06IG51bWJlcik6IFZlY3RvcjIge1xyXG4gICAgICAgIGlmKHRoaXMubWFnbml0dWRlKCkgPiBsaW1pdE51bSAmJiBsaW1pdE51bSAhPT0gLTEpIHtcclxuICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRNYWduaXR1ZGUobGltaXROdW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV2ZXJzZSgpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0KC0xKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlWCh4QWRkOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIodGhpcy5feCArIHhBZGQsIHRoaXMuX3kpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVZKHlBZGQ6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yMih0aGlzLl94LCB0aGlzLl95ICsgeUFkZCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGVzc1RoZW4odmVjdG9yOiBWZWN0b3IyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5feCA8IHZlY3Rvci54ICYmIHRoaXMuX3kgPCB2ZWN0b3IueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXJlY3Rpb24odmVjdG9yOiBWZWN0b3IyKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIHZlY3Rvci5zdWIodGhpcykubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzdGFuY2UodmVjdG9yOiBWZWN0b3IyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdmVjdG9yLnN1Yih0aGlzKS5tYWduaXR1ZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG4gICAgc3RhdGljIHJhbmRvbSgpOiBWZWN0b3IyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoTWF0aC5yYW5kb20oKSwgTWF0aC5yYW5kb20oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHplcm8oKTogVmVjdG9yMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGAoeDogJHt0aGlzLl94fTsgeTogJHt0aGlzLl95fSlgO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWZWN0b3IyOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IENvbXBsZXggZnJvbSBcIi4vQ29tcGxleFwiO1xyXG5pbXBvcnQge0NoYXJ0VHlwZSwgZHJhd0dyYXBoQnlZTGVuZ3RoLCBkcmF3U3R9IGZyb20gXCIuL0dyYXBoXCI7XHJcbmltcG9ydCBQYWludGVyIGZyb20gXCIuL1BhaW50ZXJcIjtcclxuaW1wb3J0IFNjaGVtZVBhaW50ZXIgZnJvbSBcIi4vU2NoZW1lUGFpbnRlclwiO1xyXG5pbXBvcnQgeyBnZXRBLCBnZXRBbHBoYSwgZ2V0QWxwaGFzLCBnZXRCbGFja21hbkNvZWZmaWNpZW50cywgZ2V0Q29lZmZpY2llbnRzLCBnZXRELCBnZXREZWx0YSwgZ2V0RGVsdGFGLCBnZXRGYzFwLCBnZXRGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MsIGdldEZpbHRlcmVkUywgZ2V0SENvZWZmaWNpZW50cywgZ2V0SGVtbWluZ0NvZWZmaWNpZW50cywgZ2V0TSwgZ2V0UXVhbnR1bVMsIGdldFJlc3RvcmVkUywgZ2V0UywgZ2V0U2ssIGdldFRyaWFuZ2xlQ29lZmZpY2llbnRzIH0gZnJvbSBcIi4vU2lnbmFsUHJvY2Vzc2luZ1wiO1xyXG5cclxuY29uc3QgZmNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmYy1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmNvbnN0IGZ6SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZnotaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5jb25zdCBhbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI0FuLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuY29uc3QgYXpJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNBei1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5jb25zdCBmcmVxdWVuY2llc0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJmcmVxdWVuY2llc1wiXScpIGFzIE5vZGVMaXN0T2Y8SFRNTElucHV0RWxlbWVudD47XHJcbmNvbnN0IGZpbHRlckNvZWZmaWNpZW50c0xpc3Q9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXItY29lZmZpY2llbnRzJykgYXMgSFRNTEVsZW1lbnQ7XHJcbmNvbnN0IHRyaWFuZ2xlV2luZG93TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmlhbmdsZS13aW5kb3cnKSBhcyBIVE1MRWxlbWVudDtcclxuY29uc3QgaGVtbWluZ1dpbmRvd0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVtbWluZy13aW5kb3cnKSBhcyBIVE1MRWxlbWVudDtcclxuY29uc3QgYmxhY2ttYW5XaW5kb3dMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JsYWNrbWFuLXdpbmRvdycpIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuY29uc3Qgc291cmNlU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NvdXJjZS1zaWduYWxfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IGRpZ2l0YWxTaWduYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlnaXRhbC1zaWduYWxfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IGZpbHRlcmVkU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlcmVkLXNpZ25hbF9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3QgaW1wdWxzZVNpZ25hbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbXB1bHNlLXNpZ25hbF9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3QgYW1wbGl0dWRlU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FtcGxpdHVkZS1zaWduYWxfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IHBoYXNlU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BoYXNlLXNpZ25hbF9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3QgcmVzdG9yZWRTaWduYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdG9yZWQtc2lnbmFsX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBoZW1taW5nU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlbW1pbmctc2lnbmFsX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBibGFja21hblNpZ25hbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNibGFja21hbi1zaWduYWxfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IHRyaWFuZ2xlU2lnbmFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RyaWFuZ2xlLXNpZ25hbF9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3QgY291bnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY291bnRfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbmNvbnN0IGNvZWZmaWNpZW50c0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2VmZmljaWVudHMtc2hvd19idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWwnKSBhcyBIVE1MRWxlbWVudDtcclxuY29uc3QgbW9kYWxDbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1idG4nKSBhcyBIVE1MRWxlbWVudDtcclxuY29uc3Qgc2NoZW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjaGVtZS1zaG93X2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5jb25zdCBjb2VmZmljaWVudHNPdXRwdXRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb2VmZmljaWVudHMtb3V0cHV0JykgYXMgSFRNTEVsZW1lbnQ7XHJcbmNvbnN0IGNhbnZhc0hvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW52YXMtaG9sZGVyJykgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5jb25zdCBzY2hlbWVDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NoZW1lLWNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5cclxuY29uc3QgY3R4ID0gc2NoZW1lQ2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5jb25zdCBjYW52YXNXaWR0aCA9IDMwMDA7XHJcbmNvbnN0IGNhbnZhc0hlaWdodCA9IDIwMDA7XHJcbmNvbnN0IHNjaGVtZVBhaW50ZXIgPSBuZXcgU2NoZW1lUGFpbnRlcihjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0LCBjdHgpO1xyXG5cclxuY29uc3QgZmQgPSAxMjg7XHJcbmNvbnN0IG0gPSA2NDtcclxuXHJcblxyXG5sZXQgZnJlcXVlbmNpZXM6IG51bWJlcltdID0gW107XHJcbmxldCBkZWx0YTogbnVtYmVyID0gMDtcclxubGV0IGRlbHRhRjogbnVtYmVyID0gMDtcclxubGV0IGZjMXA6IG51bWJlciA9IDA7XHJcbmxldCBBOiBudW1iZXIgPSAwO1xyXG5sZXQgRDogbnVtYmVyID0gMDtcclxubGV0IE06IG51bWJlciA9IDA7XHJcbmxldCBOOiBudW1iZXIgPSAwO1xyXG5sZXQgYWxwaGE6IG51bWJlciA9IDA7XHJcbmxldCBUZDogbnVtYmVyID0gMDtcclxubGV0IE5kOiBudW1iZXIgPSAwO1xyXG5sZXQgY29lZmZpY2llbnRzOiBudW1iZXJbXSA9IFtdO1xyXG5sZXQgYWxwaGFzOiBudW1iZXJbXSA9IFtdO1xyXG5sZXQgaENvZWZmaWNpZW50czogbnVtYmVyW10gPSBbXTtcclxubGV0IFNrOiBudW1iZXJbXSA9IFtdO1xyXG5sZXQgaFRyaWFuZ2xlczogbnVtYmVyW10gPSBbXTtcclxubGV0IGhIZW1taW5nOiBudW1iZXJbXSA9IFtdO1xyXG5sZXQgaEJsYWNrbWFuOiBudW1iZXJbXSA9IFtdO1xyXG5sZXQgcXVhbnR1bVM6IG51bWJlcltdID0gW107XHJcbmxldCBmaWx0ZXJlZFM6IG51bWJlcltdID0gW107XHJcbmxldCByZXN0b3JlZFM6IHthbXBsaXR1ZGVzOiBudW1iZXJbXSwgZmk6IG51bWJlcltdLCByZXN0b3JlZFNpZ25hbHM6IG51bWJlcltdfSA9IHtcclxuICAgIGFtcGxpdHVkZXM6IFtdLCBcclxuICAgIGZpOiBbXSwgXHJcbiAgICByZXN0b3JlZFNpZ25hbHM6IFtdXHJcbn07XHJcbmxldCBmaWx0ZXJDaGFyYWN0ZXJpc3RpY3M6IHthbXBsaXR1ZGVzOiBudW1iZXJbXSwgcGhhc2VzOiBudW1iZXJbXSwgY29tcGxleDogQ29tcGxleFtdfSA9IHtcclxuICAgIGFtcGxpdHVkZXM6IFtdLCBcclxuICAgIHBoYXNlczogW10sIFxyXG4gICAgY29tcGxleDogW11cclxufTtcclxubGV0IHRyaWFuZ2xlRmlsdGVyQ2hhcmFjdGVyaXN0aWNzOiB7YW1wbGl0dWRlczogbnVtYmVyW10sIHBoYXNlczogbnVtYmVyW10sIGNvbXBsZXg6IENvbXBsZXhbXX0gPSB7XHJcbiAgICBhbXBsaXR1ZGVzOiBbXSwgXHJcbiAgICBwaGFzZXM6IFtdLCBcclxuICAgIGNvbXBsZXg6IFtdXHJcbn07XHJcbmxldCBoZW1taW5nRmlsdGVyQ2hhcmFjdGVyaXN0aWNzOiB7YW1wbGl0dWRlczogbnVtYmVyW10sIHBoYXNlczogbnVtYmVyW10sIGNvbXBsZXg6IENvbXBsZXhbXX0gPSB7XHJcbiAgICBhbXBsaXR1ZGVzOiBbXSwgXHJcbiAgICBwaGFzZXM6IFtdLCBcclxuICAgIGNvbXBsZXg6IFtdXHJcbn07XHJcbmxldCBibGFja21hbkZpbHRlckNoYXJhY3RlcmlzdGljczoge2FtcGxpdHVkZXM6IG51bWJlcltdLCBwaGFzZXM6IG51bWJlcltdLCBjb21wbGV4OiBDb21wbGV4W119ID0ge1xyXG4gICAgYW1wbGl0dWRlczogW10sIFxyXG4gICAgcGhhc2VzOiBbXSwgXHJcbiAgICBjb21wbGV4OiBbXVxyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlzdEl0ZW0odGV4dDogc3RyaW5nKSB7XHJcbiAgICBsZXQgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2NvZWZmaWNpZW50c19saXN0X2l0ZW0nKTtcclxuICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gdGV4dDtcclxuXHJcbiAgICByZXR1cm4gbGlzdEl0ZW07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dDb2VmZmljaWVudHMoY29lZmZpY2llbnRzOiBudW1iZXJbXSwgbGlzdEJsb2NrOiBIVE1MRWxlbWVudCkge1xyXG4gICAgbGlzdEJsb2NrLmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29lZmZpY2llbnRzLmZvckVhY2goY29lZmYgPT4ge1xyXG4gICAgICAgIGxpc3RCbG9jay5hcHBlbmQoY3JlYXRlTGlzdEl0ZW0oY29lZmYudG9TdHJpbmcoKSkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dNb2RhbCgpIHtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY291bnQoKSB7XHJcbiAgICBmcmVxdWVuY2llcyA9IEFycmF5LmZyb20oZnJlcXVlbmNpZXNJbnB1dCkubWFwKGlucHV0ID0+IHBhcnNlSW50KGlucHV0LnZhbHVlKSk7XHJcbiAgICBkZWx0YSA9IGdldERlbHRhKHBhcnNlSW50KGFuSW5wdXQudmFsdWUpLCBwYXJzZUludChheklucHV0LnZhbHVlKSk7XHJcbiAgICBkZWx0YUYgPSBnZXREZWx0YUYocGFyc2VJbnQoZnpJbnB1dC52YWx1ZSksIHBhcnNlSW50KGZjSW5wdXQudmFsdWUpKTtcclxuICAgIGZjMXAgPSAgZ2V0RmMxcChwYXJzZUludChmY0lucHV0LnZhbHVlKSwgZGVsdGFGKTtcclxuICAgIEEgPSBnZXRBKGRlbHRhKTtcclxuICAgIEQgPSBnZXREKEEpO1xyXG4gICAgTSA9IGdldE0oRCwgZGVsdGFGLCBmZCk7XHJcbiAgICBOID0gTSArIDE7XHJcbiAgICBhbHBoYSA9IGdldEFscGhhKEEpO1xyXG4gICAgVGQgPSAxIC8gbTtcclxuICAgIE5kID0gTWF0aC5yb3VuZCgxIC8gVGQpO1xyXG4gICAgY29lZmZpY2llbnRzID0gZ2V0Q29lZmZpY2llbnRzKE0sIGZjMXAsIG0pO1xyXG4gICAgYWxwaGFzID0gZ2V0QWxwaGFzKE0sIGFscGhhLCBjb2VmZmljaWVudHMpO1xyXG4gICAgaENvZWZmaWNpZW50cyA9IGdldEhDb2VmZmljaWVudHMoYWxwaGFzLCBNKTtcclxuICAgIFNrID0gZ2V0U2soZnJlcXVlbmNpZXMsIE5kLCBUZCk7XHJcbiAgICBoVHJpYW5nbGVzID0gZ2V0VHJpYW5nbGVDb2VmZmljaWVudHMoaENvZWZmaWNpZW50cywgTiksIE07XHJcbiAgICBoSGVtbWluZyA9IGdldEhlbW1pbmdDb2VmZmljaWVudHMoaENvZWZmaWNpZW50cywgYWxwaGEsIE4pLCBNO1xyXG4gICAgaEJsYWNrbWFuID0gZ2V0QmxhY2ttYW5Db2VmZmljaWVudHMoaENvZWZmaWNpZW50cywgTiksIE07XHJcbiAgICBkZWx0YSA9IChNYXRoLm1heCguLi5TaykgLSBNYXRoLm1pbiguLi5TaykpIC8gKG0gLSAxKTtcclxuXHJcbiAgICBxdWFudHVtUyA9IGdldFF1YW50dW1TKE5kLCBTaywgZGVsdGEpO1xyXG4gICAgZmlsdGVyZWRTID0gZ2V0RmlsdGVyZWRTKE5kLCBoQ29lZmZpY2llbnRzLCBxdWFudHVtUyk7XHJcbiAgICByZXN0b3JlZFMgPSBnZXRSZXN0b3JlZFMoTmQsIGZpbHRlcmVkUyk7XHJcbiAgICBmaWx0ZXJDaGFyYWN0ZXJpc3RpY3MgPSBnZXRGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MoaENvZWZmaWNpZW50cywgTSwgZmQsIHBhcnNlSW50KGZjSW5wdXQudmFsdWUpKTtcclxuICAgIHRyaWFuZ2xlRmlsdGVyQ2hhcmFjdGVyaXN0aWNzID0gZ2V0RmlsdGVyQ2hhcmFjdGVyaXN0aWNzKGhUcmlhbmdsZXMsIE0sIGZkLCBwYXJzZUludChmY0lucHV0LnZhbHVlKSk7XHJcbiAgICBoZW1taW5nRmlsdGVyQ2hhcmFjdGVyaXN0aWNzID0gZ2V0RmlsdGVyQ2hhcmFjdGVyaXN0aWNzKGhIZW1taW5nLCBNLCBmZCwgcGFyc2VJbnQoZmNJbnB1dC52YWx1ZSkpO1xyXG4gICAgYmxhY2ttYW5GaWx0ZXJDaGFyYWN0ZXJpc3RpY3MgPSBnZXRGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MoaEJsYWNrbWFuLCBNLCBmZCwgcGFyc2VJbnQoZmNJbnB1dC52YWx1ZSkpO1xyXG5cclxuICAgIGRyYXdTdChnZXRTLCBmcmVxdWVuY2llcywgJ9CY0YHRhdC+0LTQvdGL0Lkg0YHQuNCz0L3QsNC7Jyk7XHJcblxyXG4gICAgc2hvd0NvZWZmaWNpZW50cyhoQ29lZmZpY2llbnRzLCBmaWx0ZXJDb2VmZmljaWVudHNMaXN0KTtcclxuICAgIHNob3dDb2VmZmljaWVudHMoaFRyaWFuZ2xlcywgdHJpYW5nbGVXaW5kb3dMaXN0KTtcclxuICAgIHNob3dDb2VmZmljaWVudHMoaEhlbW1pbmcsIGhlbW1pbmdXaW5kb3dMaXN0KTtcclxuICAgIHNob3dDb2VmZmljaWVudHMoaEJsYWNrbWFuLCBibGFja21hbldpbmRvd0xpc3QpO1xyXG5cclxuICAgIHNjaGVtZVBhaW50ZXIucGFpbnRTY2hlbWUoaENvZWZmaWNpZW50cyk7XHJcbn1cclxuXHJcbnNjaGVtZUNhbnZhcy53aWR0aCA9IGNhbnZhc1dpZHRoO1xyXG5zY2hlbWVDYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG5cclxuXHJcbnNvdXJjZVNpZ25hbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRyYXdTdChnZXRTLCBmcmVxdWVuY2llcywgJ9CY0YHRhdC+0LTQvdGL0Lkg0YHQuNCz0L3QsNC7JykpO1xyXG5kaWdpdGFsU2lnbmFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZHJhd0dyYXBoQnlZTGVuZ3RoKHF1YW50dW1TLCAn0KbQuNGE0YDQvtCy0L7QuSDRgdC40LPQvdCw0LsnLCBDaGFydFR5cGUuQ29sdW1uQ2hhcnQpKTtcclxuZmlsdGVyZWRTaWduYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkcmF3R3JhcGhCeVlMZW5ndGgoZmlsdGVyZWRTLCAn0J7RgtGE0LjQu9GM0YLRgNC+0LLQsNC90L3Ri9C5INGB0LjQs9C90LDQuycsIENoYXJ0VHlwZS5Db2x1bW5DaGFydCkpO1xyXG5pbXB1bHNlU2lnbmFsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZHJhd0dyYXBoQnlZTGVuZ3RoKGhDb2VmZmljaWVudHMsICfQmNC80L/Rg9C70YzRgdC90LDRjyDRhdCw0YDQsNC60YLQtdGA0LjRgdGC0LjQutCwJywgQ2hhcnRUeXBlLkxpbmVDaGFydCkpXHJcbmFtcGxpdHVkZVNpZ25hbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRyYXdHcmFwaEJ5WUxlbmd0aChmaWx0ZXJDaGFyYWN0ZXJpc3RpY3MuYW1wbGl0dWRlcywgJ9CQ0KfQpScsIENoYXJ0VHlwZS5MaW5lQ2hhcnQpKTtcclxucGhhc2VTaWduYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkcmF3R3JhcGhCeVlMZW5ndGgoZmlsdGVyQ2hhcmFjdGVyaXN0aWNzLnBoYXNlcywgJ9Ck0KfQpScsIENoYXJ0VHlwZS5MaW5lQ2hhcnQpKTtcclxucmVzdG9yZWRTaWduYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkcmF3R3JhcGhCeVlMZW5ndGgocmVzdG9yZWRTLnJlc3RvcmVkU2lnbmFscywgJ9CS0L7RgdGC0LDQvdC+0LLQu9C10L3QvdGL0Lkg0YHQuNCz0L3QsNC7JywgQ2hhcnRUeXBlLkxpbmVDaGFydCkpO1xyXG50cmlhbmdsZVNpZ25hbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRyYXdHcmFwaEJ5WUxlbmd0aCh0cmlhbmdsZUZpbHRlckNoYXJhY3RlcmlzdGljcy5hbXBsaXR1ZGVzLCAn0KLRgNC10YPQs9C+0LvRjNC90L7QtSDQvtC60L3QvicsIENoYXJ0VHlwZS5MaW5lQ2hhcnQpKTtcclxuaGVtbWluZ1NpZ25hbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRyYXdHcmFwaEJ5WUxlbmd0aChoZW1taW5nRmlsdGVyQ2hhcmFjdGVyaXN0aWNzLmFtcGxpdHVkZXMsICfQntC60L3QviDQpdC10LzQvNC40L3Qs9CwJywgQ2hhcnRUeXBlLkxpbmVDaGFydCkpO1xyXG5ibGFja21hblNpZ25hbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRyYXdHcmFwaEJ5WUxlbmd0aChibGFja21hbkZpbHRlckNoYXJhY3RlcmlzdGljcy5hbXBsaXR1ZGVzLCAn0J7QutC90L4g0JHQu9GN0LrQvNC10L3QsCcsIENoYXJ0VHlwZS5MaW5lQ2hhcnQpKTtcclxuXHJcbmNvdW50KCk7XHJcblxyXG5jb3VudEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvdW50KCk7XHJcbn0pO1xyXG5cclxubW9kYWxDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxufSk7XHJcblxyXG5zY2hlbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBzaG93TW9kYWwoKTtcclxuICAgIGNhbnZhc0hvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICBjb2VmZmljaWVudHNPdXRwdXRCbG9jay5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XHJcbn0pO1xyXG5cclxuY29lZmZpY2llbnRzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgc2hvd01vZGFsKCk7XHJcbiAgICBjb2VmZmljaWVudHNPdXRwdXRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICBjYW52YXNIb2xkZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG59KTtcclxuXHJcblxyXG4iXSwibmFtZXMiOlsiQ29tcGxleCIsInJlYWwiLCJpbWFnIiwiX3JlYWwiLCJfaW1hZyIsIk1hdGgiLCJzcXJ0IiwibnVtIiwibmV3UmVhbCIsIm5ld0ltYWciLCJwb3dOdW0iLCJwb3dlZFJlYWwiLCJwb3dlZEltYWciLCJpIiwiZ2V0U2ludXNvaWQiLCJqIiwiTiIsIlMiLCJSZSIsImNvcyIsIlBJIiwiSW0iLCJzaW4iLCJjb3VudERGVCIsImZpbHRlcmVkUyIsIk5kIiwiYW1wbGl0dWRlcyIsIkFycmF5IiwiZmlsbCIsImZpIiwibGVuZ3RoIiwiZm9yRWFjaCIsInMiLCJjb21wbGV4IiwiYWRkIiwibXVsdCIsImdldE1hZ25pdHVkZSIsImF0YW4yIiwiY291bnRJbnZlcnNlREZUIiwic2lnbmFsc0NvdW50IiwidCIsInJlc3RvcmVkU2lnbmFscyIsInJlcyIsInB1c2giLCJDaGFydFR5cGUiLCJkcmF3R3JhcGgiLCJ4RGF0YSIsInlEYXRhIiwidGl0bGUiLCJjaGFydFR5cGUiLCJnb29nbGUiLCJjaGFydHMiLCJsb2FkIiwic2V0T25Mb2FkQ2FsbGJhY2siLCJkcmF3Q2hhcnQiLCJkYXRhIiwidmlzdWFsaXphdGlvbiIsIkRhdGFUYWJsZSIsImNoYXJ0Iiwib3B0aW9ucyIsImN1cnZlVHlwZSIsImxlZ2VuZCIsImZvY3VzVGFyZ2V0IiwiQ29sdW1uQ2hhcnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJMaW5lQ2hhcnQiLCJhZGRDb2x1bW4iLCJhZGRSb3dzIiwic2V0Q2VsbCIsInNvcnQiLCJkcmF3Iiwic3BsaXRQbGFuZSIsImJlZ2luUG9pbnQiLCJlbmRQb2ludCIsInN0ZXAiLCJjb3JkcyIsImRyYXdTdCIsIlNGdW5jIiwiZnJlcXVlbmNpZXMiLCJ4Q29yZHMiLCJ5Q29yZHMiLCJtYXAiLCJ4IiwiZHJhd0dyYXBoQnlZTGVuZ3RoIiwiZHJhd0ZpbHRlckNoYXJhY3RlcmlzdGljcyIsInJhZEZyZXF1ZW5jaWVzIiwiZnJlcXVlbmN5IiwiUGFpbnRlciIsImN0eCIsInZlY3RvcjEiLCJ2ZWN0b3IyIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwieSIsImxpbmVUbyIsInN0cm9rZSIsInNvdXJjZSIsImRpcmVjdGlvbiIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3IiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImNpcmNsZUNlbnRlciIsInJhZGl1cyIsImFyYyIsInBvc2l0aW9uIiwicmVjdCIsImNlbnRlclBvcyIsImJhc2VMZW5ndGgiLCJ0ZXh0IiwidGV4dFNpemUiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJmb250IiwiZmlsbFRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjbGVhclJlY3QiLCJmaWxsQmFja2dyb3VuZCIsIlZlY3RvcjIiLCJTY2hlbWVQYWludGVyIiwicGFpbnRlciIsImNvZWZmaWNpZW50cyIsInN1bW1hdG9yUmFkaXVzIiwiYW1wbGlmaWVyc0hlaWdodCIsImFtcGxpZmllcnNCYXNlTGVuZ3RoIiwiZGVsYXllckxlbmd0aCIsImRlbGF5ZXJBbXBsRGlzdCIsImJsb2NrU2l6ZSIsImluUG9pbnQiLCJvdXRQb2ludCIsImNvdW50T3V0UG91bnQiLCJzdW1tYXRvclBvcyIsInN1YiIsInNvdXJjZVBvcyIsIm1vdmVYIiwidXBkYXRlQ2FudmFzIiwicGFpbnRJbk91dCIsInBhaW50U3VtbWF0b3IiLCJwYWludEFtcGxpZmllciIsImNvZWZmaWNpZW50IiwicGFpbnRBbXBsaWZpZXJCbG9jayIsImNlbnRlclBvc2l0aW9uIiwibmFtZSIsInBhaW50VHJpYW5nbGUiLCJwYWludFRleHQiLCJibG9ja1NvdXJjZVBvcyIsImFtcGxpZmllck51bSIsInlPZmZzZXQiLCJjb3JuUG9zIiwiZGVsYXllciIsImFtcGxpZmllclBvcyIsIm5ld1NvdXJjZVBvcyIsInBhaW50TGluZVAyUCIsIm1vdmVZIiwicGFpbnRIb2xsb3dSZWN0IiwicGFpbnRDaXJjbGUiLCJzdGFydFBvcyIsImNvZWZmaWNpZW50c0NvdW50Iiwib3V0UG9zIiwibGluZUxlbmd0aCIsInJlZHVjZSIsInN1bSIsImFpRXZlbkZ1bmMiLCJmYzFwIiwiZmQiLCJhaU9kZEZ1bmMiLCJhMEV2ZW5GdW5jIiwibSIsImdldERlbHRhIiwiQW4iLCJBeiIsInBvdzEiLCJwb3cyIiwiZGVsdGExIiwiZGVsdGEyIiwibWluIiwiZ2V0RGVsdGFGIiwiZnoiLCJmYyIsImdldEZjMXAiLCJkZWx0YUYiLCJnZXRBIiwiZGVsdGEiLCJsb2cxMCIsImdldEQiLCJBIiwiZ2V0TSIsIkQiLCJjZWlsIiwiZ2V0QWxwaGEiLCJnZXRDb2VmZmljaWVudHMiLCJNIiwicm91bmQiLCJhaUZ1bmMiLCJnZXRGYWN0b3JpYWwiLCJmYWN0b3JpYWwiLCJjdXJOdW0iLCJnZXRJTyIsIkkiLCJnZXRBbHBoYXMiLCJhbHBoYSIsImFscGhhc0kiLCJiZXRhIiwidyIsImdldEhDb2VmZmljaWVudHMiLCJhbHBoYXMiLCJoQ29lZmZpY2llbnRzIiwiaGFsZk0iLCJmbG9vciIsImdldFRyaWFuZ2xlQ29lZmZpY2llbnRzIiwibmV3SCIsImdldEhlbW1pbmdDb2VmZmljaWVudHMiLCJhbHBoYVF1YXJ0ZXIiLCJnZXRCbGFja21hbkNvZWZmaWNpZW50cyIsImdldFMiLCJnZXRTayIsIlRkIiwiU2siLCJnZXRRdWFudHVtUyIsImdldEZpbHRlcmVkUyIsInF1YW50dW1TIiwibmV3UyIsImdldFJlc3RvcmVkUyIsInJldmVyc2UiLCJnZXRGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MiLCJjaGFyYWN0ZXJpc3RpY3MiLCJwaGFzZXMiLCJuIiwiX3giLCJfeSIsImFkZGVkVmVjdG9yIiwibmV3VmVjdG9yIiwiZGVkdWN0aWJsZVZlY3RvciIsInNjYWxlIiwiZGl2aWRlciIsInBvdyIsIm1hZ25pdHVkZSIsIm5vcm1hbGl6ZVZlY3RvciIsIm5vcm1hbGl6ZSIsImxpbWl0TnVtIiwic2V0TWFnbml0dWRlIiwieEFkZCIsInlBZGQiLCJ2ZWN0b3IiLCJyYW5kb20iLCJmY0lucHV0IiwiZnpJbnB1dCIsImFuSW5wdXQiLCJheklucHV0IiwiZnJlcXVlbmNpZXNJbnB1dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaWx0ZXJDb2VmZmljaWVudHNMaXN0IiwidHJpYW5nbGVXaW5kb3dMaXN0IiwiaGVtbWluZ1dpbmRvd0xpc3QiLCJibGFja21hbldpbmRvd0xpc3QiLCJzb3VyY2VTaWduYWxCdG4iLCJkaWdpdGFsU2lnbmFsQnRuIiwiZmlsdGVyZWRTaWduYWxCdG4iLCJpbXB1bHNlU2lnbmFsQnRuIiwiYW1wbGl0dWRlU2lnbmFsQnRuIiwicGhhc2VTaWduYWxCdG4iLCJyZXN0b3JlZFNpZ25hbEJ0biIsImhlbW1pbmdTaWduYWxCdG4iLCJibGFja21hblNpZ25hbEJ0biIsInRyaWFuZ2xlU2lnbmFsQnRuIiwiY291bnRCdG4iLCJjb2VmZmljaWVudHNCdG4iLCJtb2RhbCIsIm1vZGFsQ2xvc2VCdG4iLCJzY2hlbWVCdG4iLCJjb2VmZmljaWVudHNPdXRwdXRCbG9jayIsImNhbnZhc0hvbGRlciIsInNjaGVtZUNhbnZhcyIsImdldENvbnRleHQiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsInNjaGVtZVBhaW50ZXIiLCJoVHJpYW5nbGVzIiwiaEhlbW1pbmciLCJoQmxhY2ttYW4iLCJyZXN0b3JlZFMiLCJmaWx0ZXJDaGFyYWN0ZXJpc3RpY3MiLCJ0cmlhbmdsZUZpbHRlckNoYXJhY3RlcmlzdGljcyIsImhlbW1pbmdGaWx0ZXJDaGFyYWN0ZXJpc3RpY3MiLCJibGFja21hbkZpbHRlckNoYXJhY3RlcmlzdGljcyIsImNyZWF0ZUxpc3RJdGVtIiwibGlzdEl0ZW0iLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwidGV4dENvbnRlbnQiLCJzaG93Q29lZmZpY2llbnRzIiwibGlzdEJsb2NrIiwiaW5uZXJIVE1MIiwiY29lZmYiLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNob3dNb2RhbCIsInJlbW92ZSIsImNvdW50IiwiZnJvbSIsImlucHV0IiwicGFyc2VJbnQiLCJ2YWx1ZSIsIm1heCIsInBhaW50U2NoZW1lIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=