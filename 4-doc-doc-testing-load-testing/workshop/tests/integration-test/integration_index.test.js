const { expect } = require('@jest/globals');
const mongoose = require('mongoose');
const ToDo = require('../../toDoModel.js').ToDo;
const DB_URI = 'mongodb://mongo:27017/toDoApp';

beforeAll(async () => {
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
    });
});

afterAll( async()=>{
    await mongoose.connection.close({});
})

//Test 1
test("TodoItem : create todo", async () => {
    const todoIem = new ToDo({text: "testIntegration", done: false});
    const todoCreated = await todoIem.save(todoIem);
    expect(todoCreated.name).toEqual("testIntegration");
    expect(todoCreated.done).toBeFalsy();
});

//test 2
test("TodoItem : throw error in save", async () => {
    const wrongTodoCreated = new ToDo({ txt: "monmessage"});
    expect(await ToDo.save(wrongTodoCreated)).toThrow();
});

//test 3
test('TodoItem: findOneAndUpdate', async() => {
    const todoIem = new ToDo({text: "testIntegrationToUpdate", done: false});
    const todoCreated = await todoIem.save(todoIem);

    const toDoCompleted = await ToDo.findOneAndUpdate({ _id: todoCreated._id }, {done: true});
    expect(toDoCompleted.name).toEqual(todoCreated.name);
    expect(toDoCompleted.done).toBeTruthy();
});

