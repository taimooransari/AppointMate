export default class HashTable {
    constructor() {
      this.table = new Array(137); // prime number to reduce collisions
      this.values = [];
      this.size=0;
    }
    
    hash(string) {
      const H = 37;
      let total = 0;
      for (let i = 0; i < string.length; i++) {
        total += H * total + string.charCodeAt(i);
      }
      total %= this.table.length;
      if (total < 0) {
        total += this.table.length - 1;
      }
      return parseInt(total);
    }
    
    put(key, data) {
        const pos = this.hash(key);
        if (this.table[pos] === undefined) {
          this.table[pos] = key;
          this.values[pos] = data;
          this.size++; // increment the size when adding a new item
        } else {
          let index = pos;
          while (this.table[index] !== undefined) {
            index++;
          }
          this.table[index] = key;
          this.values[index] = data;
          this.size++; // increment the size when adding a new item
        }
        // check if the table needs to be resized
        if (this.size > this.table.length * 0.7) {
          this.resize(this.table.length * 2);
        }
      }
      
      resize(newSize) {
        const oldTable = this.table;
        const oldValues = this.values;
        this.table = new Array(newSize);
        this.values = [];
        this.size = 0;
        for (let i = 0; i < oldTable.length; i++) {
          if (oldTable[i] !== undefined) {
            this.put(oldTable[i], oldValues[i]);
          }
        }
      }
    
    get(key) {
      const hash = this.hash(key);
      if (hash > -1) {
        for (let i = hash; this.table[i] !== undefined; i++) {
          if (this.table[i] === key) {
            return this.values[i];
          }
        }
      }
      return undefined;
    }
  }
  