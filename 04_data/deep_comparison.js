function deepEqual (val1, val2) {
  if (val1 == null && val2 == null) {
    return true;
  }

  if (typeof val1 == "object" && typeof val2 == "object") {
    let keys1 = Object.keys(val1);
    let keys2 = Object.keys(val2);

    if (keys1.length != keys2.length) {
      return false;
    }

    for (let i = 0; i < keys1.length; i++) {
      if (!deepEqual(keys1[i], keys2[i])) {
        return false;
      }

      if (!deepEqual(val1[keys1[i]], val2[keys2[i]])) {
        return false;
      }
    }

    return true;
  }

  return val1 === val2;
}
