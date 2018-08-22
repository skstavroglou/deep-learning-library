function matrixCustomProduct(m1, m2) {
  var result = [];
  for (let i = 0; i < m1.length; i++) {
    result[i] = [];
    for (let j = 0; j < m2.length; j++) {
      result[i][j] = m1[i] * m2[j];
    }
  }
  return result;
}
function matrixHadamard(m1, m2) {
  var result = [];
  if (m1[0].length > 0 && m2[0].length > 0) {
    for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m1[0].length; j++) {
        result[i][j] = m1[i][j] * m2[i][j];
      }
    }
  } else {
    for (var i = 0; i < m1.length; i++) {
      result[i] = m1[i] * m2[i];
    }
  }
  return result;
}
function matrixSum(m1, m2) {
  var result = [];
  if (m1[0].length > 0 && m2[0].length > 0) {
    for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m1[0].length; j++) {
        result[i][j] = m1[i][j] + m2[i][j];
      }
    }
  } else {
    for (var i = 0; i < m1.length; i++) {
      result[i] = m1[i] + m2[i];
    }
  }
  return result;
}
function matrixProduct(m1, m2) {
  if (m1[0].length > 0 && m2[0].length > 0) {
    if (m1[0].length === m2.length) {
      var result = twoDmultiplication(m1, m2);
    } else if (m1.length === m2[0].length) {
      var result = twoDmultiplication(m2, m1);
    }
  } else if (m1[0].length > 0) {
    var result = twoDoneDmultiplication(m1, m2);
  } else if (m2[0].length > 0) {
    var result = twoDoneDmultiplication(m2, m1);
  } else {
    var result = 0;
    for (var i = 0; i < m1.length; i++) {
      result += m1[i] * m2[i];
    }
  }
  return result;
}
function twoDmultiplication(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
function twoDoneDmultiplication(m1, m2) {
  var result = [];
  if (m1[0].length === m2.length) {
    for (var i = 0; i < m1.length; i++) {
      var sum = 0;
      for (var j = 0; j < m1[0].length; j++) {
        sum += m1[i][j] * m2[j];
      }
      result[i] = sum;
    }
  } else {
    for (var j = 0; j < m1[0].length; j++) {
      var sum = 0;
      for (var i = 0; i < m1.length; i++) {
        sum += m1[i][j] * m2[i];
      }
      result[j] = sum;
    }
  }
  return result;
}
