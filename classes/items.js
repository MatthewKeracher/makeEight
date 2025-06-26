class items {
  constructor() {
    this.items = [];
  }

  n(name) {
    let result = this.items.find(
      (item) => item.name.toUpperCase() === name.toUpperCase()
    );

    return checkForUndefined(result, `items.n(${name})`);
  }

  search(name) {
    let result = this.items.filter(
      //filter first.
      (item) => item.name.toUpperCase().includes(name.toUpperCase())
    );

    if (result.length === 1) {
      result = result[0];
    }

    return checkForUndefined(result, `items.n(${name})`);
  }

  add(data) {
    //Character, Location, etc.
    this.items.push(data);
    return this.items;
  }

  all() {
    return this.items;
  }

  delete(key, value) {
    this.items = this.items.filter((item) => item[key] !== value);
    return this.items;
  }

  filterItems(type) {
    return this.items.filter(obj => obj.type === type);
  }

  getItem(type) {
    const byType = this.filterItems(type);
    if (byType.length === 0) {
      return undefined;
    }
    const randomIndex = rand(0, byType.length - 1);
    log(byType[randomIndex]);
    return byType[randomIndex];
  }

}

class item {
  name = "";
  type = "";
  description = "";

  quality = 0;
  wear = 0;
  
  constructor(item) {
    this.name = item?.name || "New Item";
    this.description = item?.description || "No description available.";
    this.quality = rand(1, 5);
    this.wear = rand(0, 5);
  }

}


