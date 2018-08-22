function quadraticCost(predicted, real) {
  var summa = 0;
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
