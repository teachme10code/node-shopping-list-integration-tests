const uuid = require('uuid');

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const ShoppingList = {
  create: function(name, checked) {
    console.log('Creating new shopping list item');
    const item = {
      name: name,
      id: uuid.v4(),
      checked: checked
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving shopping list items');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting shopping list item \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting shopping list item \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createShoppingList() {
  const storage = Object.create(ShoppingList);
  storage.items = {};
  return storage;
}

module.exports = {
  ShoppingList: createShoppingList(),
}