class ANN {
  constructor(
    id,
    includeBias,
    biasValue,
    inputNodes,
    hiddenNodes,
    outputNodes,
    learningRate
  ) {
    this.id = id;
    this.includeBias = includeBias;
    this.biasValue = biasValue;
    this.learningRate = learningRate;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.totalError = 0;
    console.log(this);
  }
  manifestInputLayer() {
    this.inputLayer = new inputLayer(this.inputNodes);
  }
  manifestHiddenLayers() {
    this.hiddenLayers = new hiddenLayers(this.inputNodes, this.hiddenNodes);
  }
  manifestBiasLayer() {
    if (this.includeBias === true) {
      this.biasLayer = new biasLayer(this.hiddenNodes.length + 1);
    }
  }
  manifestOutputLayer() {
    this.outputLayer = new outputLayer(this.hiddenNodes, this.outputNodes);
  }
  inputLayerForwardPass(data, instance) {
    this.inputLayer.a = data[instance];
  }
  hiddenLayersForwardPass() {
    for (let i = 0; i < this.hiddenNodes.length; i++) {
      this.hiddenLayers.z[i] =
        i === 0
          ? matrixProduct(this.hiddenLayers.w[i], this.inputLayer.a)
          : matrixProduct(this.hiddenLayers.w[i], this.hiddenLayers.a[i - 1]);
      if (this.includeBias) {
        let b = new Array(this.hiddenNodes[i]).fill(this.biasValue);
        this.hiddenLayers.z[i] = matrixSum(this.hiddenLayers.z[i], b);
      }
      this.hiddenLayers.a[i] = sigmoid(this.hiddenLayers.z[i]);
    }
  }
  outputLayerForwardPass() {
    this.outputLayer.z = matrixProduct(
      this.outputLayer.w,
      this.hiddenLayers.a[this.hiddenNodes.length - 1]
    );
    if (this.includeBias) {
      let b = new Array(this.outputNodes).fill(this.biasValue);
      this.outputLayer.z = matrixSum(this.outputLayer.z, b);
    }
    this.outputLayer.a = sigmoid(this.outputLayer.z);
  }
  errorCorrection(data, instance) {
    this.outputLayer.y = data[instance];
    this.totalError += quadraticCost(this.outputLayer.a, this.outputLayer.y);
  }
  outputLayerBackwardPass() {
    let alpha = this.hiddenLayers.a[this.hiddenNodes.length - 1];
    let dCda = dQuadraticCost(this.outputLayer.a, this.outputLayer.y);
    let dsigmadz = dSigmoid(this.outputLayer.z);
    let delta = matrixHadamard(dCda, dsigmadz);
    this.outputLayer.dCdW = 
     matrixSum(
      this.outputLayer.dCdW,
      matrixCustomProduct(delta, alpha)
    );
    console.log(`dCdW corrections: `);
    console.table(this.outputLayer.dCdW);
  }
  outputLayerLearningReset() {
    this.outputLayer.reset();
  }
  hiddenLayersBackwardPass() {}
}

CARVR = new ANN("CARVR", true, 1, 2, [3, 4, 5], 2, 0.5);
CARVR.manifestInputLayer();
CARVR.manifestHiddenLayers();
CARVR.manifestBiasLayer();
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
CARVR.outputLayerLearningReset();
