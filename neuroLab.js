CARVR = new ANN(
  "CARVR",
  true,
  1,
  2,
  [100],
  2,
  0.5,
  "sigmoid",
  "sigmoid",
  "quadratic"
);
CARVR.manifestInputLayer();
CARVR.manifestHiddenLayers();
CARVR.manifestOutputLayer();
const clayset = [
  [0.12, 0.5],
  [0.121, 0.53],
  [0.124, 0.57],
  [0.132, 0.6],
  [0.141, 0.73],
  [0.154, 0.87],
  [0.163, 0.82]
];
console.log("My dataset: " + clayset);
console.log("Dataset length: " + clayset.length);

const Red = new Trainer(CARVR, clayset, 1, 100, 1);
Red.train();
