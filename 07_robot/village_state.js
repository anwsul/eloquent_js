const randomPick = require('./utils');
const roadGraph = require('./road_graph');

/**
 * Represents the state of the village in a robot delivery simulation.
 * The state includes the robot's current location and the list of parcels to be delivered.
 * This class provides methods for moving the robot, cloning the state, and generating a random initial state.
 */
class VillageState {
  /**
   * Creates an instance of VillageState.
   * 
   * @param {string} place - The current location of the robot.
   * @param {Array} parcels - List of parcels, each containing a place and address.
   */
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  /**
   * Moves the robot to a specified destination, if the destination is directly connected 
   * to the robot's current position. Also moves any parcels located at the robot's current position 
   * (i.e. the robot picks them up).
   * 
   * If the destination matches the address of a parcel, the parcel is marked as delivered.
   *
   * @param {string} destination - The destination to which the robot should move.
   * @returns {VillageState} A new village state with updated robot position and parcel states.
   */
  move (destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map(p => {
          if (p.place !== this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter(p => p.place !== p.address);
      return new VillageState(destination, parcels);
    }
  }

  /**
   * Creates a copy of the current village state.
   * 
   * @returns {VillageState} A new instance of VillageState with the same state as the current one.
   */
  clone () {
    return new VillageState(this.place, this.parcels.map(p => ({ ...p }))); // Deep copy of the parcels.
  }

  /**
   * Generates a random village state with a randomly selected initial place for the robot,
   * and a specified number of parcels at random locations.
   * 
   * @param {Number} [parcelCount] - (Optional) The number of parcels to generate. If not specified, 
   *                                a random number between 0 and 20 will be chosen.
   * @returns {VillageState} A randomly generated village state with robot and parcels.
   */
  static random (parcelCount = Math.floor(Math.random() * 20)) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({ place, address });
    }
    return new VillageState(randomPick(Object.keys(roadGraph)), parcels);
  }
}

module.exports = VillageState;