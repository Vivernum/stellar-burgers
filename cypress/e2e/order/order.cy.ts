beforeEach(() => {
  cy.setCookie('accessToken', 'validToken');
  localStorage.setItem('refreshToken', 'validRefreshToken');
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.intercept('GET', '**/auth/user', {
    fixture: 'user.json'
  }).as('getUser');
  cy.intercept('POST', '**/api/orders', {
    fixture: 'orderResponse.json'
  }).as('createOrder');
  cy.visit('');
  cy.wait('@getIngredients');
  cy.wait('@getUser');
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('Тесты работы с заказами', () => {
  const selectors = {
    orderButton: '[data-cy=order-button-container]',
    orderNumber: '[data-cy=order-number]',
    closeButton: '[data-cy=close-modal-button]',
    modal: '[data-cy=modal]'
  };

  const ingredientsButtons = {
    button1: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093c]',
    button2: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]',
    button3: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]',
    button4: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa0942]',
    button5: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093f]'
  };

  // не совсем понимаю принцип, но оно работает
  // тут компилятор жалуется на несоответствие типов
  Cypress.Commands.add('addIngredients', () => {
    cy.get(ingredientsButtons.button1).find('button').click();
    cy.get(ingredientsButtons.button2).find('button').click();
    cy.get(ingredientsButtons.button3).find('button').click();
    cy.get(ingredientsButtons.button4).find('button').click();
    cy.get(ingredientsButtons.button5).find('button').click();
  });

  it('Проверка получения пользователя', () => {
    const name = cy.get('[data-cy=UserName]');
    name.contains('Vasiliy');
  });

  it('Проверка создания заказа', () => {
    // Property 'addIngredients' does not exist on type 'cy & CyEventEmitter'.
    // тут жалуется на то, что такого метода нет,
    // но по факту тесты работают
    cy.addIngredients();

    const orderButton = cy.get(selectors.orderButton).find('button').click();

    cy.wait('@createOrder');

    const modal = cy.get(selectors.modal).should('be.visible');

    const orderNumber = cy.get(selectors.orderNumber).should('be.visible');
    orderNumber.contains('101049');
  });

  it('Проверка закрытия модального окна по нажатию на крестик', () => {
    cy.addIngredients();

    const orderButton = cy.get(selectors.orderButton).find('button').click();

    cy.wait('@createOrder');

    const modal = cy.get(selectors.modal).should('be.visible');

    const orderNumber = cy.get(selectors.orderNumber).should('be.visible');
    orderNumber.contains('101049');

    const closeButton = cy.get(selectors.closeButton).click();

    modal.should('not.exist');
    orderNumber.should('not.exist');
  });

  it('Проверка закрытия модального окна по нажатию на оверлей', () => {
    cy.addIngredients();

    const orderButton = cy.get(selectors.orderButton).find('button').click();

    cy.wait('@createOrder');

    const modal = cy.get(selectors.modal).should('be.visible');

    const orderNumber = cy.get(selectors.orderNumber).should('be.visible');
    orderNumber.contains('101049');

    const overlay = modal.get('[data-cy=overlay]').click({ force: true });

    modal.should('not.exist');
    orderNumber.should('not.exist');
  });

  it('Прверка очистки конструктора после успешного заказа', () => {
    cy.addIngredients();

    cy.get('[data-cy=no-buns-top]').should('not.exist');
    cy.get('[data-cy=no-buns-bottom]').should('not.exist');
    cy.get('[data-cy=ingredients-list]').children().should('have.length', '4');

    const orderButton = cy.get(selectors.orderButton).find('button').click();

    cy.wait('@createOrder');

    const modal = cy.get(selectors.modal).should('be.visible');

    const orderNumber = cy.get(selectors.orderNumber).should('be.visible');
    orderNumber.contains('101049');

    const closeButotn = cy.get(selectors.closeButton).click();

    modal.should('not.exist');
    orderNumber.should('not.exist');

    cy.get('[data-cy=no-buns-top]').contains('Выберите булки');
    cy.get('[data-cy=no-buns-bottom]').contains('Выберите булки');
    cy.get('[data-cy=ingredients-list]')
      .children()
      .contains('Выберите начинку');
  });
});
