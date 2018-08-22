class inputLayer {
  constructor(inputNodes) {
    this.inputNodes = inputNodes;
    this.ids = [];
    this.a = new Array(this.inputNodes).fill(0);
    for (let i = 0; i < this.inputNodes; i++) this.ids[i] = `I${i + 1}`;
  }
}
class hiddenLayers {
  constructor(inputNodes, hiddenNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    let hindex = 1;
    this.ids = new Array(this.hiddenNodes);
    this.w = new Array(this.hiddenNodes);
    this.z = new Array(this.hiddenNodes);
    this.a = new Array(this.hiddenNodes);
    this.heta = new Array(this.hiddenNodes);
    for (let i = 0; i < this.hiddenNodes.length; i++) {
      this.ids[i] = new Array(this.hiddenNodes[i]);
      this.w[i] = new Array(this.hiddenNodes[i]);
      this.z[i] = new Array(this.hiddenNodes[i]).fill(0);
      this.a[i] = new Array(this.hiddenNodes[i]).fill(0);
      this.heta[i] = new Array(this.hiddenNodes[i]).fill(0.1);
      for (let j = 0; j < this.hiddenNodes[i]; j++) {
        this.ids[i][j] = `H${hindex}`;
        this.w[i][j] =
          i === 0
            ? listOfSeededRandoms(this.inputNodes, 1)
            : listOfSeededRandoms(this.hiddenNodes[i - 1], 1);
        hindex++;
      }
    }
  }
}
class biasLayer {
  constructor(size) {
    this.size = size;
    this.ids = [];
    this.a = new Array(this.size).fill(1);
    for (let i = 0; i < this.size; i++) this.ids[i] = `B${i + 1}`;
  }
}
class outputLayer {
  constructor(hiddenNodes, outputNodes) {
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.ids = [];
    this.w = [];
    this.dCdW = [];
    for (let i = 0; i < this.outputNodes; i++) {
      this.ids[i] = `O${i + 1}`;
      this.w[i] = listOfSeededRandoms(
        this.hiddenNodes[this.hiddenNodes.length - 1],
        1
      );
      this.dCdW[i] = new Array(
        this.hiddenNodes[this.hiddenNodes.length - 1]
      ).fill(0);
    }
    this.z = new Array(this.outputNodes).fill(0);
    this.a = new Array(this.outputNodes).fill(0);
    this.heta = new Array(this.outputNodes).fill(0.1);
    this.delta = new Array(this.outputNodes).fill(0);
    this.y = new Array(this.outputNodes).fill(0);
  }
  reset() {
    for (let i = 0; i < this.outputNodes; i++) {
      this.dCdW[i] = new Array(
        this.hiddenNodes[this.hiddenNodes.length - 1]
      ).fill(0);
    }
  }
}
