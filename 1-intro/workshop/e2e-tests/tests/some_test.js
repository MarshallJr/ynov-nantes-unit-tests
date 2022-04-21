Feature('Ynov Nantes feature search bachelor informatique');

Scenario('Test Ynov Nantes Land Page', ({ I }) => {
    I.amOnPage('https://www.ynov-nantes.com/');

    I.click('.extra-cntnr .search-cta .cta');

    I.waitForText('Que recherchez-vous ?', 3);

    I.fillField('.search-form-input .searchfield', 'info');

    I.waitForText('Bachelor Informatique', 3);
});
