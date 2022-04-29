Feature('Todo-list');

//Test 1
Scenario('Test Todo List Land Page', ({ I }) => {
    I.amOnPage('http://localhost:5000');
    I.waitForText("What do I need to do?", 3)
});

//Test 2
Scenario('Test Add a todo item', ({ I }) => {
    I.amOnPage('http://localhost:5000');
    I.fillField("#newTODO", "TestWOW-e2e :)")
    I.click('#create-todo')
    I.wait(1)
    I.see('TestWOW-e2e :)', '.table')
});
