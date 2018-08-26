function quadraticCost(predicted, real) {
  var summa = 0;
  var result;
  for (let i = 0; i < predicted.length; i++) {
    summa += Math.pow(predicted[i] - real[i], 2);
  }
  result = 0.5 * summa;
  return result;
}

function dQuadraticCost(predicted, real) {
  var result = [];
  for (let i = 0; i < predicted.length; i++) {
    result[i] = predicted[i] - real[i];
  }
  return result;
}

function crossEntropy(predicted, real) {
  var summa = 0;
  var result;
  for (let i = 0; i < predicted.length; i++) {
    if (real[i] === 1) {
      summa -= Math.log(predicted[i]);
    } else {
      summa -= Math.log(1 - predicted[i]);
    }
  }
  result = summa;
  return result;
}

function dCrossEntropy(predicted, real) {
  var result = [];
  for (let i = 0; i < predicted.length; i++) {
    if (real[i] === 1) {
      result[i] = -1 / predicted[i];
    } else {
      result[i] = 1 / (1 - predicted[i]);
    }
  }
  return result;
}
