class ANN {
  constructor(
    id,
    includeBias,
    biasValue,
    inputNodes,
    hiddenNodes,
    outputNodes,
    learningRate,
    hiddenActivation,
    outputActivation,
    errorFunction
  ) {
    this.id = id;
    this.includeBias = includeBias;
    this.biasValue = biasValue;
    this.learningRate = learningRate;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.hiddenActivation = hiddenActivation;
    this.outputActivation = outputActivation;
    this.errorFunction = errorFunction;
    this.totalError = 0;
    console.log(this);
  }
  manifestInputLayer() {
    this.inputLayer = new inputLayer(this.inputNodes);
  }
  manifestHiddenLayers() {
    this.hiddenLayers = new hiddenLayers(
      this.inputNodes,
      this.hiddenNodes,
      this.learningRate
    );
  }
  manifestOutputLayer() {
    this.outputLayer = new outputLayer(
      this.hiddenNodes,
      this.outputNodes,
      this.learningRate
    );
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
      this.hiddenLayers.forwardActivation(this.hiddenActivation, i);
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
    this.outputLayer.forwardActivation(this.outputActivation);
  }
  errorCorrection(data, instance) {
    this.outputLayer.y = data[instance];
    if (this.errorFunction === "quadratic") {
      this.totalError += quadraticCost(this.outputLayer.a, this.outputLayer.y);
    } else if (this.errorFunction === "crossEntropy") {
      this.totalError += crossEntropy(this.outputLayer.a, this.outputLayer.y);
    }
  }
  outputLayerBackwardPass() {
    let alpha = this.hiddenLayers.a[this.hiddenNodes.length - 1];
    this.outputLayer.backwardActivation(this.outputActivation);
    let dCda;
    if (this.errorFunction === "quadratic") {
      dCda = dQuadraticCost(this.outputLayer.a, this.outputLayer.y);
    } else if (this.errorFunction === "crossEntropy") {
      dCda = dCrossEntropy(this.outputLayer.a, this.outputLayer.y);
    }
    this.outputLayer.delta = matrixHadamard(dCda, this.outputLayer.dsigmadz);
    this.outputLayer.dCdW = matrixDifference(
      this.outputLayer.dCdW,
      matrixCustomProduct(this.outputLayer.delta, alpha)
    );
  }
  hiddenLayersBackwardPass() {
    for (let i = this.hiddenNodes.length - 1; i >= 0; i--) {
      let alpha = i > 0 ? this.hiddenLayers.a[i - 1] : this.inputLayer.a;
      this.hiddenLayers.backwardActivation(this.hiddenActivation, i);
      let deltaInFront =
        i === this.hiddenNodes.length - 1
          ? this.outputLayer.delta
          : this.hiddenLayers.delta[i + 1];
      let w_prod_deltaInFront =
        i === this.hiddenNodes.length - 1
          ? matrixProduct(this.outputLayer.w, deltaInFront)
          : matrixProduct(this.hiddenLayers.w[i + 1], deltaInFront);
      this.hiddenLayers.delta[i] = matrixHadamard(
        w_prod_deltaInFront,
        this.hiddenLayers.dsigmadz
      );
      this.hiddenLayers.dCdW[i] = matrixDifference(
        this.hiddenLayers.dCdW[i],
        matrixCustomProduct(this.hiddenLayers.delta[i], alpha)
      );
    }
  }
  hiddenWeightsUpdate() {
    this.hiddenLayers.updateWeights();
  }
  outputWeightsUpdate() {
    this.outputLayer.updateWeights();
  }
  hiddenLayersLearningReset() {
    this.hiddenLayers.reset();
  }
  outputLayerLearningReset() {
    this.outputLayer.reset();
  }
}
