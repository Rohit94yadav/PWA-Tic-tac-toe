import { NeuralNetwork, Model, Academy } from "reimprovejs/dist/reimprove.js";

/*
Input 3x3 cells with two possibilites x or o

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

classification perfect, good, bad, 
0 = perfect = better winning chances
1 = good = placement OK but placed with not real benefit e.g. first move or placed in a free field
2 = bad = filling the winning location other player

*/

const modelFitConfig = {
  // Exactly the same idea here by using tfjs's model's
  epochs: 1, // fit config.
  stepsPerEpoch: 16
};

const numActions = 2; // The number of actions your agent can choose to do
const inputSize = 9; // Inputs size (10x10=100 image for instance)
const temporalWindow = 1; // The window of data which will be sent yo your agent
// For instance the x previous inputs, and what actions the agent took

const totalInputSize =
  inputSize * temporalWindow + numActions * temporalWindow + inputSize;

const network = new NeuralNetwork();
network.InputShape = [totalInputSize];
network.addNeuralNetworkLayers([
  { type: "dense", units: 32, activation: "relu" },
  { type: "dense", units: numActions, activation: "softmax" }
]);
// Now we initialize our model, and start adding layers
const model = new Model.FromNetwork(network, modelFitConfig);

// Finally compile the model, we also exactly use tfjs's optimizers and loss functions
// (So feel free to choose one among tfjs's)
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Every single field here is optionnal, and has a default value. Be careful, it may not
// fit your needs ...

const teacherConfig = {
  lessonsQuantity: 10, // Number of training lessons before only testing agent
  lessonsLength: 100, // The length of each lesson (in quantity of updates)
  lessonsWithRandom: 2, // How many random lessons before updating epsilon's value
  epsilon: 1, // Q-Learning values and so on ...
  epsilonDecay: 0.995, // (Random factor epsilon, decaying over time)
  epsilonMin: 0.05,
  gamma: 0.8 // (Gamma = 1 : agent cares really much about future rewards)
};

const agentConfig = {
  model: model, // Our model corresponding to the agent
  agentConfig: {
    memorySize: 5000, // The size of the agent's memory (Q-Learning)
    batchSize: 128, // How many tensors will be given to the network when fit
    temporalWindow: temporalWindow // The temporal window giving previous inputs & actions
  }
};

export const academy = new Academy(); // First we need an academy to host everything
export const teacher = academy.addTeacher(teacherConfig);
export const agentX = academy.addAgent(agentConfig);
export const agentO = academy.addAgent(agentConfig);

academy.assignTeacherToAgent(agentX, teacher);
academy.assignTeacherToAgent(agentO, teacher);
