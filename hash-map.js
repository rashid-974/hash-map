import { node, linkedList } from "./linked-list.js";

export function hashMap() {
  let loadFactor = 0.75;
  let capacity = 16;
  let buckets = new Array(capacity);
  let size = 0;

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    let index = hash(key);
    if (!buckets[index]) {
      buckets[index] = linkedList();
    }

    const keyNode = buckets[index].findNode((entry) => entry.key === key);

    if (keyNode) {
      keyNode.value.value = value;
    } else {
      buckets[index].append({ key, value });
      size++;

      if (size / capacity > loadFactor) {
        grow();
      }
    }
  }

  function get(key) {
    const index = hash(key);
    if (!buckets[index]) {
      return null;
    }
    const keyNode = buckets[index].findNode((entry) => entry.key === key);
    if (keyNode) {
      return keyNode.value.value;
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    if (!buckets[index]) {
      return false;
    }
    const keyNode = buckets[index].findNode((entry) => entry.key === key);
    if (keyNode) {
      return true;
    }
    return false;
  }

  function remove(key) {
    const index = hash(key);
    if (!buckets[index]) {
      return false;
    }
    const wasRemoved = buckets[index].removeNode((entry) => entry.key === key);

    if (wasRemoved) {
      size--;
    }

    return wasRemoved;
  }

  function length() {
    return size;
  }

  function keys() {
    let keysArray = [];

    for (const bucket of buckets) {
      if (bucket) {
        for (const entry of bucket.toArray()) {
          keysArray.push(entry.key);
        }
      }
    }
    return keysArray;
  }

  function values() {
    let valuesArray = [];

    for (const bucket of buckets) {
      if (bucket) {
        for (const entry of bucket.toArray()) {
          valuesArray.push(entry.value);
        }
      }
    }
    return valuesArray;
  }

  function entries() {
    let entriesArray = [];

    for (const bucket of buckets) {
      if (bucket) {
        for (const entry of bucket.toArray()) {
          entriesArray.push([entry.key, entry.value]);
        }
      }
    }
    return entriesArray;
  }

  function clear() {
    capacity = 16;
    buckets = new Array(capacity);
    size = 0;
  }

  function grow() {
    const allEntries = entries();
    capacity = capacity * 2;
    buckets = new Array(capacity);
    size = 0;
    for (const [key, value] of allEntries) {
      set(key, value);
    }
  }

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    keys,
    values,
    entries,
    clear
  };
}
