function sigmoid(t) {
  var result = [];
  for (let i = 0; i < t.length; i++) {
    result[i] =
      Math.pow(Math.E, t[i]) / Math.pow(1 + Math.pow(Math.E, t[i]), 2);
  }
  return result;
}

function dSigmoid(t) {
  var result = [];
  for (let i = 0; i < t.length; i++) {
    result[i] =
      Math.pow(Math.E, t[i]) / Math.pow(1 + Math.pow(Math.E, t[i]), 2);
  }
  return result;
}
