const { runRobot, randomRobot, routeRobot, goalOrientedRobot } = require("./robots");
const VillageState = require("./village_state");

/**
 * Compares the performance of two robot strategies by running them through a series of simulations.
 *
 * Each robot attempts to deliver parcels in a randomly generated village state. The function
 * tracks the total number of moves taken by each robot across multiple tests and calculates
 * their average performance.
 *
 * @param {Function} robot1 - The first robot strategy to test.
 * @param {Array} memory1 - The initial memory for the first robot.
 * @param {Function} robot2 - The second robot strategy to test.
 * @param {Array} memory2 - The initial memory for the second robot.
 */
function compareRobots (robot1, memory1, robot2, memory2) {
  const testCount = 100;
  let move1 = 0;
  let move2 = 0;

  for (let i = 0; i < testCount; i++) {
    let villageState = VillageState.random();

    move1 += runRobot(villageState.clone(), robot1, memory1);
    move2 += runRobot(villageState, robot2, memory2);
  }

  console.log(`Moves taken by robot 1: ${move1 / testCount} on average`);
  console.log(`Moves taken by robot 2: ${move2 / testCount} on average`);
}

compareRobots(randomRobot, [], goalOrientedRobot, []);