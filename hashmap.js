'use strict';

class HashMap {
  constructor(initialCapacity = 8){
    this.length = 0;
    this._slot = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key){
    const index = this._findSlot(key);
    if(this._slot[index] === undefined){
      throw new Error('Not Found');
    }
    return this._slot[index].value;
  }

  set(key, value){
    const loadRatio = (this.length + this._deleted + 1)/this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slot[index] = ({
      key,
      value,
      deleted: false
    });
    this.length++;
  }

  remove(key){
    const index = this._findSlot(key);
    const slot = this._slot[index];
    if(slot === undefined){
      throw new Error ('Not Found');  
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _resize(size){
    const oldSlots = this._slot;
    this._capacity = size;

    this.length = 0;
    this._slot = [];
    this._deleted = 0;

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }

  }

  _findSlot(key){
    //Hashing Happens Here;
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

let hm = new HashMap();
console.log(HashMap._hashString('Hello World'));