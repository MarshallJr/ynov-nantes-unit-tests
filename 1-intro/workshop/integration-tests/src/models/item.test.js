const mongoose = require('mongoose');
const { expect } = require('@jest/globals');
const {
    createItem,
    listItems,
    deleteOneItem,
    updateOneItem
} = require("../services/itemService");
const Item = require('./Item')


beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/docker-node-mongo", {useNewUrlParser: true });
});

test("ItemService : create item", async () => {
    const itemDate = new Date();
    const myCreateItem = { name: "monmessage", date: itemDate };
    const item = await createItem(myCreateItem);
    expect(item.name).toEqual(myCreateItem.name);
    expect(item.date).toEqual(myCreateItem.date);
});

test("ItemService : throw error", async () => {
    const myCreateItem = { nae: "monmessage"};
    const item = await createItem(myCreateItem);
    expect(item.name).toThrow("No name provided in the body");
});

test('should delete an item', async() => {
    const item = await deleteOneItem({ name: "monmessage" });
    expect(item.ok).toBe(1);
});

test("shoud return an array of item", async () => {
    const items = await listItems();
    expect(Array.isArray(items)).toBeTruthy();
});
test("update item", async () => {
    const where = { name: "monmessage" };
    const newData = { name: "camarche" };
    const updatedItem = await updateOneItem(where, newData);
    expect(updatedItem.ok).toBe(1);
});

