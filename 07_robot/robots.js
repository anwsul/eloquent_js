const randomPick = require('./utils');
const VillageState = require('./village_state');
const roadGraph = require('./road_graph');

/**
 * Runs the robot until all parcels are delivered.
 * 
 * @param {VillageState} state - The current state of the village, including the robot's position and parcels.
 * @param {Function} robot - A robot starategy, which determines the next move.
 *                            Returns an object containing the direction to move and updated memory.
 * @param {Array<String>} memory - Used by the robot for decision-making between moves.
 * @returns {number} The number of moves it took to deliver all parcels.
 */
function runRobot (state, robot, memory) {
  for (let move = 0; ; move++) {
    if (state.parcels.length == 0) {
      return move;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

/**
 * A simple robot strategy that randomly selects a direction from the possible connected places.
 * 
 * @param {VillageState} state - The current state of the village.
 * @returns {Object} An action object containing a direction to move to.
 */
function randomRobot (state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

/**
 * One possible route that allows us to visit every office and house 
 * in the village, represented by `@roadGraph`.
 */
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

/**
 * A robot strategy that follows a predefined route, moving from one location to the next 
 * in the `mailRoute` array.
 * 
 * @param {VillageState} state - The current state of the village.
 * @param {Array<string>} memory - The list of locations to visit (the robot's memory of the route).
 * @returns {Object} An action object containing the next direction and the updated memory.
 */
function routeRobot (state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

/**
 * Finds the shortest path between two locations in the village, represented by a graph.
 * 
 * @param {Object} graph - A graph object where keys are locations and values are lists of connected locations.
 * @param {string} from - The starting location for the search.
 * @param {string} to - The target destination for the search.
 * @returns {Array<string>} The sequence of locations representing the shortest path from `from` to `to`.
 */
function findRoute (graph, from, to) {
  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

/**
 * A goal-oriented robot strategy that determines the shortest route to either a parcel's 
 * destination or its address, and moves towards the next location in the route.
 * 
 * @param {Object} state - The current state of the village, including the robot's position and parcels.
 * @param {Array<string>} route - A list of locations representing the current route towards a goal.
 * @returns {Object} An action object containing the next direction and updated memory (remaining route).
 */
function goalOrientedRobot ({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

module.exports = {
  runRobot,
  randomRobot,
  routeRobot,
  goalOrientedRobot
};