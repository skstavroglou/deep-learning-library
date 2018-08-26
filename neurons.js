class inputLayer {
  constructor(inputNodes) {
    this.inputNodes = inputNodes;
    this.ids = [];
    this.a = new Array(this.inputNodes).fill(0);
    for (let i = 0; i < this.inputNodes; i++) this.ids[i] = `I${i + 1}`;
  }
}
class hiddenLayers {
  constructor(inputNodes, hiddenNodes, learningRate) {
    this.dsigmadz;
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.learningRate = learningRate;
    let hindex = 1;
    this.ids = new Array(this.hiddenNodes);
    this.w = new Array(this.hiddenNodes);
    this.z = new Array(this.hiddenNodes);
    this.a = new Array(this.hiddenNodes);
    this.heta = new Array(this.hiddenNodes);
    this.delta = new Array(this.hiddenNodes);
    this.dCdW = new Array(this.hiddenNodes);
    for (let i = 0; i < this.hiddenNodes.length; i++) {
      this.ids[i] = new Array(this.hiddenNodes[i]);
      this.w[i] = new Array(this.hiddenNodes[i]);
      this.z[i] = new Array(this.hiddenNodes[i]).fill(0);
      this.a[i] = new Array(this.hiddenNodes[i]).fill(0);
      this.heta[i] = new Array(this.hiddenNodes[i]);
      this.delta[i] = new Array(this.hiddenNodes[i]).fill(0);
      this.dCdW[i] = new Array(this.hiddenNodes[i]);
      for (let j = 0; j < this.hiddenNodes[i]; j++) {
        this.ids[i][j] = `H${hindex}`;
        this.heta[i][j] =
          i === 0
            ? new Array(this.inputNodes).fill(this.learningRate)
            : new Array(this.hiddenNodes[i - 1]).fill(this.learningRate);
        this.w[i][j] =
          i === 0
            ? listOfSeededRandoms(this.inputNodes, 1)
            : listOfSeededRandoms(this.hiddenNodes[i - 1], 1);
        this.dCdW[i][j] =
          i === 0
            ? new Array(this.inputNodes).fill(0)
            : new Array(this.hiddenNodes[i - 1]).fill(0);
        hindex++;
      }
    }
  }
  forwardActivation(activation, i) {
    if (activation === "sigmoid") {
      this.a[i] = sigmoid(this.z[i]);
    } else if (activation === "relu") {
      this.a[i] = relu(this.z[i]);
    }
  }
  backwardActivation(activation, i) {
    if (activation === "sigmoid") {
      this.dsigmadz = dSigmoid(this.z[i]);
    } else if (activation === "relu") {
      this.dsigmadz = dRelu(this.z[i]);
    }
  }
  reset() {
    for (let i = 0; i < this.hiddenNodes.length; i++) {
      for (let j = 0; j < this.hiddenNodes[i]; j++) {
        this.dCdW[i][j] =
          i === 0
            ? new Array(this.inputNodes).fill(0)
            : new Array(this.hiddenNodes[i - 1]).fill(0);
      }
    }
  }
  updateWeights() {
    for (let i = 0; i < this.hiddenNodes.length; i++) {
      for (let j = 0; j < this.hiddenNodes[i]; j++) {
        this.w[i][j] = matrixDifference(
          this.w[i][j],
          matrixHadamard(this.heta[i][j], this.dCdW[i][j])
        );
      }
    }
  }
}
class outputLayer {
  constructor(hiddenNodes, outputNodes, learningRate) {
    this.dsigmadz;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.learningRate = learningRate;
    this.ids = [];
    this.w = [];
    this.heta = [];
    this.dCdW = [];
    for (let i = 0; i < this.outputNodes; i++) {
      this.ids[i] = `O${i + 1}`;
      this.w[i] = listOfSeededRandoms(
        this.hiddenNodes[this.hiddenNodes.length - 1],
        1
      );
      this.heta[i] = new Array(
        this.hiddenNodes[this.hiddenNodes.length - 1]
      ).fill(this.learningRate);
      this.dCdW[i] = new Array(
        this.hiddenNodes[this.hiddenNodes.length - 1]
      ).fill(0);
    }
    this.z = new Array(this.outputNodes).fill(0);
    this.a = new Array(this.outputNodes).fill(0);
    this.delta = new Array(this.outputNodes).fill(0);
    this.y = new Array(this.outputNodes).fill(0);
  }
  forwardActivation(activation) {
    if (activation === "sigmoid") {
      this.a = sigmoid(this.z);
    } else if (activation === "relu") {
      this.a = relu(this.z);
    }
  }
  backwardActivation(activation) {
    if (activation === "sigmoid") {
      this.dsigmadz = dSigmoid(this.z);
    } else if (activation === "relu") {
      this.dsigmadz = dRelu(this.z);
    }
  }
  reset() {
    for (let i = 0; i < this.outputNodes; i++) {
      this.dCdW[i] = new Array(
        this.hiddenNodes[this.hiddenNodes.length - 1]
      ).fill(0);
    }
  }
  updateWeights() {
    for (let i = 0; i < this.outputNodes; i++) {
      this.w[i] = matrixDifference(
        this.w[i],
        matrixHadamard(this.heta[i], this.dCdW[i])
      );
    }
  }
}
