CARVR = new ANN("CARVR", true, 1, 2, [3, 4, 5], 2, 0.5);
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
CARVR.inputLayerForwardPass(clayset, 0);
CARVR.hiddenLayersForwardPass();
CARVR.outputLayerForwardPass();
CARVR.errorCorrection(clayset, 1);
CARVR.outputLayerBackwardPass();
CARVR.hiddenLayersBackwardPass();
CARVR.hiddenWeightsUpdate();
CARVR.outputWeightsUpdate();