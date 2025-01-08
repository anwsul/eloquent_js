class Group {
  #array = [];

  add (element) {
    if (!this.has(element)) {
      this.#array.push(element);
    }
  }


  delete (element) {
    this.#array = this.#array.filter(currentValue => currentValue != element);
  }

  has (element) {
    return this.#array.includes(element);
  }

  static from (iterableObject) {
    let group = new Group();
    for (let obj of iterableObject) {
      group.add(obj);
    }

    return group;
  }
}


let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

