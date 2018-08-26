class Trainer {
  constructor(ANN, trainingData, batchSize, epochs, horizon) {
    this.ANN = ANN;
    this.trainingData = trainingData;
    this.batchSize = batchSize - 1;
    this.epochs = epochs;
    this.horizon = horizon;
    this.epoch = 0;
    this.erorrita = 0;
    this.error = [];
    this.w1 = [];
    this.w2 = [];
    this.historicalWeights = [];
    console.log(this);
  }
  // panopticon() {
  //   for (let w1 = 0.01; w1 <= 1; w1 += 0.01) {
  //     this.w1.push(w1.toFixed(2));
  //     this.w2.push(w1.toFixed(2));
  //     for (let w2 = 0.01; w2 <= 1; w2 += 0.01) {
  //       // console.log(`w1 = ${w1.toFixed(2)}`);
  //       // console.log(`w2 = ${w2.toFixed(2)}`);
  //       let batchIndex = 0;
  //       this.erorrita = 0;
  //       this.ANN.HiddenLayers[0][0].weights[0] = w1.toFixed(2);
  //       this.ANN.HiddenLayers[0][0].weights[1] = w2.toFixed(2);
  //       // this.historicalWeights.push(this.ANN.HiddenLayers[0][0].weights);
  //       // console.log(`this.historicalWeights = ${this.historicalWeights}`);
  //       for (
  //         let instance = 0;
  //         instance < this.trainingData.length - this.horizon;
  //         instance++
  //       ) {
  //         this.ANN.InputLayerForwardPass(this.trainingData, instance);
  //         this.ANN.HiddenLayersForwardPass();
  //         this.ANN.OutputLayerForwardPass();
  //         this.ANN.MasterLayerErrorAssessment(
  //           this.trainingData,
  //           instance + this.horizon
  //         );
  //         if (batchIndex < this.batchSize) {
  //           batchIndex += 1;
  //           this.ANN.MasterLayerCorrection();
  //         } else {
  //           batchIndex = 0;
  //           this.ANN.MasterLayerCorrection();
  //           this.erorrita += this.ANN.TotalError;
  //           this.ANN.TotalError = 0;
  //         }
  //       }
  //       this.error.push(this.erorrita);
  //     }
  //   }
  // }
  train() {
    let batchIndex = 0;
    for (let epoch = 0; epoch < this.epochs; epoch++) {
      console.log("#### Ushering in Epoch Number: " + epoch + " ####");
      this.erorrita = 0;
      for (
        let instance = 0;
        instance < this.trainingData.length - this.horizon;
        instance++
      ) {
        this.ANN.inputLayerForwardPass(this.trainingData, instance);
        this.ANN.hiddenLayersForwardPass();
        this.ANN.outputLayerForwardPass();
        this.ANN.errorCorrection(this.trainingData, instance + this.horizon);
        if (batchIndex < this.batchSize) {
          batchIndex += 1;
          this.ANN.outputLayerBackwardPass();
          this.ANN.hiddenLayersBackwardPass();
        } else {
          batchIndex = 0;
          // console.log("# Total BATCH error = " + this.ANN.totalError + " #");
          this.ANN.outputLayerBackwardPass();
          this.ANN.hiddenLayersBackwardPass();
          this.ANN.hiddenWeightsUpdate();
          this.ANN.outputWeightsUpdate();
          this.ANN.hiddenLayersLearningReset();
          this.ANN.outputLayerLearningReset();
          this.erorrita += this.ANN.totalError;
          this.ANN.totalError = 0;
        }
      }
      // this.historicalWeights.push(this.ANN.HiddenLayers[0][0].weights);
      // console.log(`Weights update: ${this.ANN.HiddenLayers[0][0].weights}`);
      // this.error.push(this.erorrita);
      console.log("# Total BATCH error = " + this.erorrita + " #");
    }
  }
  // trainInfinite() {
  //   let batchIndex = 0;
  //   console.log("#### Ushering in Epoch Number: " + this.epoch + " ####");
  //   this.erorrita = 0;
  //   for (
  //     let instance = 0;
  //     instance < this.trainingData.length - 1;
  //     instance++
  //   ) {
  //     // console.log("### Data time instance: " + instance + " ###");
  //     this.ANN.InputLayerForwardPass(this.trainingData, instance);
  //     this.ANN.HiddenLayersForwardPass();
  //     this.ANN.OutputLayerForwardPass();
  //     this.ANN.MasterLayerErrorAssessment(this.trainingData, instance);
  //     if (batchIndex < this.batchSize) {
  //       batchIndex += 1;
  //       this.ANN.MasterLayerCorrection();
  //     } else {
  //       batchIndex = 0;
  //       this.ANN.MasterLayerCorrection();
  //       // console.log("# Total BATCH error = " + this.ANN.TotalError + " #");
  //       this.erorrita += this.ANN.TotalError;
  //       this.ANN.TotalError = 0;
  //       this.ANN.OutputLayerBackpropagation();
  //       this.ANN.DeepestHiddenLayerBackpropagation();
  //       this.ANN.HiddenLayersBackpropagation();
  //       this.ANN.HiddenWeightsUpdate();
  //       this.ANN.OutputWeightsUpdate();
  //       this.ANN.MasterReset();
  //     }
  //   }
  //   console.log("# Total BATCH error = " + this.erorrita + " #");
  //   this.epoch++;
  // }
}
