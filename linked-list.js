export function node(value = null, nextNode = null) {
  return {
    value,
    nextNode,
  };
}

export function linkedList() {
  let headNode = null;
  let listSize = 0;

  function append(value) {
    if (!headNode) {
      headNode = node(value);
    } else {
      let current = headNode;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = node(value);
    }

    listSize++;
  }

  function prepend(value) {
    let newNode = node(value);
    newNode.nextNode = headNode;
    headNode = newNode;

    listSize++;
  }

  function head() {
    if (headNode === null) {
      return undefined;
    }
    return headNode.value;
  }

  function size() {
    return listSize;
  }

  function tail() {
    let current = headNode;
    if (current === null) {
      return undefined;
    }
    while (current.nextNode !== null) {
      current = current.nextNode;
    }

    return current.value;
  }

  function at(index) {
    if (index < 0 || index >= listSize) {
      return undefined;
    }

    let current = headNode;
    for (let i = 0; i < index; i++) {
      if (current.nextNode === null) {
        return undefined;
      }
      current = current.nextNode;
    }
    return current.value;
  }

  function pop() {
    if (headNode === null) {
      return undefined;
    }
    const popValue = headNode.value;
    headNode = headNode.nextNode;
    listSize--;

    return popValue;
  }

  function contains(value) {
    if (headNode === null) {
      return undefined;
    }

    let current = headNode;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  function findIndex(value) {
    if (headNode === null) {
      return undefined;
    }

    let index = 0;

    let current = headNode;
    while (current !== null) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.nextNode;
    }
    return -1;
  }

  function toString() {
    let string = "";
    if (headNode === null) {
      return string;
    }

    let current = headNode;
    while (current.nextNode !== null) {
      string += `( ${current.value} ) -> `;

      current = current.nextNode;
    }
    string += `( ${current.value} ) -> null`;
    return string;
  }

  function insertAt(index, ...values) {
    if (index < 0 || index > listSize) {
      throw new RangeError("Index not available");
    }

    if (index === 0) {
      const newHeadNode = node(values.shift());
      listSize++;
      let newNode = newHeadNode;
      for (const value of values) {
        newNode.nextNode = node(value);
        newNode = newNode.nextNode;
        listSize++;
      }
      newNode.nextNode = headNode;
      headNode = newHeadNode;
      return toString();
    }

    let firstHalf = headNode;
    for (let i = 1; i < index; i++) {
      firstHalf = firstHalf.nextNode;
    }

    let secondHalf = firstHalf.nextNode;
    for (const value of values) {
      firstHalf.nextNode = node(value);
      firstHalf = firstHalf.nextNode;
      listSize++;
    }

    firstHalf.nextNode = secondHalf;

    return toString();
  }

  function removeAt(index) {
    if (index < 0 || index >= listSize) {
      throw new RangeError("Index not available");
    }

    if (index === 0) {
      pop();
      return toString();
    }

    let firstHalf = headNode;
    for (let i = 1; i < index; i++) {
      if (i !== index) {
        firstHalf = firstHalf.nextNode;
      }
    }
    let secondHalf = firstHalf.nextNode;
    secondHalf = secondHalf.nextNode;
    firstHalf.nextNode = secondHalf;
    listSize--;

    return toString();
  }

  function findNode(predicate) {
    if (headNode === null) {
      return undefined;
    }

    let current = headNode;
    while (current !== null) {
      if (predicate(current.value)) {
        return current;
      }
      current = current.nextNode;
    }
    return current;
  }

  function removeNode(predicate) {
    if (headNode === null) {
      return false;
    }

    if (predicate(headNode.value)) {
      headNode = headNode.nextNode;
      listSize--;
      return true;
    }

    let current = headNode;
    while (current.nextNode !== null) {
      if (predicate(current.nextNode.value)) {
        current.nextNode = current.nextNode.nextNode;
        listSize--;
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  function toArray() {
    const result = [];
    let current = headNode;
    while (current !== null) {
      result.push(current.value);
      current = current.nextNode;
    }
    return result;
  }

  return {
    append,
    prepend,
    head,
    tail,
    at,
    pop,
    size,
    contains,
    findIndex,
    toString,
    insertAt,
    removeAt,
    findNode,
    removeNode,
    toArray
  };
}
