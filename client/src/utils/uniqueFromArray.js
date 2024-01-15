const uniqueObjects = (arrayOfObjects) =>
  arrayOfObjects.reduce(
    (accumulator, currentObject) => {
      // Check if the id property already exists in the Set
      const isNameUnique = !accumulator.nameSet.has(currentObject.id);

      if (isNameUnique) {
        // If the id is unique, add the object to the accumulator and the id to the Set
        accumulator.nameSet.add(currentObject.id);
        accumulator.result.push(currentObject);
      }

      return accumulator;
    },
    { result: [], nameSet: new Set() }
  ).result;

export default uniqueObjects;
