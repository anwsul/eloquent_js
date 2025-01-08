class IterableGroup {
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
    let group = new IterableGroup();
    for (let obj of iterableObject) {
      group.add(obj);
    }

    return group;
  }

  [Symbol.iterator] () {
    let index = 0;
    let data = this.#array;

    return {
      next () {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { done: true };
        }
      }
    }
  }
}

let group = IterableGroup.from(["a", "b", "c"]);

for (let value of group) {
  console.log(value);
}