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
  cy.visit('http://localhost:4000');
  cy.wait('@getIngredients');
  cy.wait('@getUser');
});

afterEach(() => {
  cy.clearCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

describe('Тесты работы с заказами', () => {
  it('Проверка получения пользователя', () => {
    const name = cy.get('[data-cy=UserName]');
    name.contains('Vasiliy');
  });

  it('Проверка создания заказа', () => {
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093c]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa0942]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093f]')
      .find('button')
      .click();

    const button = cy.get('[data-cy=order-button-container]').find('button');
    button.click();

    cy.wait('@createOrder');

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const orderNumber = modal.get('[data-cy=order-number]');
    orderNumber.should('be.visible');
    orderNumber.contains('101049');
  });

  it('Проверка закрытия модального окна по нажатию на крестик', () => {
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093c]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa0942]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093f]')
      .find('button')
      .click();

    const button = cy.get('[data-cy=order-button-container]').find('button');
    button.click();

    cy.wait('@createOrder');

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const orderNumber = modal.get('[data-cy=order-number]');
    orderNumber.should('be.visible');
    orderNumber.contains('101049');

    const closeButton = modal.get('[data-cy=close-modal-button]');
    closeButton.click();

    modal.should('not.exist');
    orderNumber.should('not.exist');
  });

  it('Проверка закрытия модального окна по нажатию на оверлей', () => {
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093c]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa0942]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093f]')
      .find('button')
      .click();

    const button = cy.get('[data-cy=order-button-container]').find('button');
    button.click();

    cy.wait('@createOrder');

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const orderNumber = modal.get('[data-cy=order-number]');
    orderNumber.should('be.visible');
    orderNumber.contains('101049');

    const overlay = modal.get('[data-cy=overlay]');
    overlay.click({ force: true });

    modal.should('not.exist');
    orderNumber.should('not.exist');
  });

  it('Прверка очистки конструктора после успешного заказа', () => {
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093c]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa0942]')
      .find('button')
      .click();
    cy.get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093f]')
      .find('button')
      .click();

    cy.get('[data-cy=no-buns-top]').should('not.exist');
    cy.get('[data-cy=no-buns-bottom]').should('not.exist');
    cy.get('[data-cy=ingredients-list]').children().should('have.length', '4');

    const button = cy.get('[data-cy=order-button-container]').find('button');
    button.click();

    cy.wait('@createOrder');

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const orderNumber = modal.get('[data-cy=order-number]');
    orderNumber.should('be.visible');
    orderNumber.contains('101049');

    const closeButton = modal.get('[data-cy=close-modal-button]');
    closeButton.click();

    modal.should('not.exist');
    orderNumber.should('not.exist');

    cy.get('[data-cy=no-buns-top]').contains('Выберите булки');
    cy.get('[data-cy=no-buns-bottom]').contains('Выберите булки');
    cy.get('[data-cy=ingredients-list]')
      .children()
      .contains('Выберите начинку');
  });
});
