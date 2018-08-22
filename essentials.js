function sum(a) {
  var result = 0;
  for (let i = 0; i < a.length; i++) {
    result += a[i];
  }
  return result;
}
function listOfZeroes(length) {
  let lista = [];
  for (let i = 0; i < length; i++) {
    lista.push(0);
  }
  return lista;
}
function arrayOfZeroes(length1, length2) {
  let lista = [];
  for (let i = 0; i < length2; i++) {
    lista[i] = listOfZeroes(length1);
  }
  return lista;
}
function listOfNulls(length) {
  let lista = [];
  for (let i = 0; i < length; i++) {
    lista.push(null);
  }
  return lista;
}
function listOfRandoms(length) {
  let lista = [];
  for (let i = 0; i < length; i++) {
    lista.push(Math.random());
  }
  return lista;
}
function listOfSeededRandoms(length, seed) {
  let lista = [];
  for (let i = 0; i < length; i++) {
    var x = Math.sin(seed++) * 10000;
    lista.push(x - Math.floor(x));
  }
  return lista;
}
