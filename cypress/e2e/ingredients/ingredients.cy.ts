beforeEach(() => {
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.visit('http://localhost:4000');
  cy.wait('@getIngredients');
});

describe('Тесты ингредиентов', () => {
  it('Проверка добавления ингредиента в конструктор', () => {
    const button = cy
      .get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button');

    button.click();

    const constructorList = cy.get('[data-cy=ingredients-list]');

    constructorList.get('[data-cy=643d69a5c3f7b9001cfa093e]').should('exist');
  });

  it('Проверка открытия модального окна с ингредиентом', () => {
    const ingredient = cy.get(
      '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]'
    );

    ingredient.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const modalIngredientData = modal.get(
      '[data-cy=ingredient-data-643d69a5c3f7b9001cfa093e]'
    );
    modalIngredientData.should('be.visible');
  });

  it('Проверка закрытия модального окна с ингредиентом по нажатию на крестик', () => {
    const ingredient = cy.get(
      '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]'
    );

    ingredient.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const modalIngredientData = modal.get(
      '[data-cy=ingredient-data-643d69a5c3f7b9001cfa093e]'
    );
    modalIngredientData.should('be.visible');

    const closeButton = modal.get('[data-cy=close-modal-button]');
    closeButton.click();

    modalIngredientData.should('not.exist');
    modal.should('not.exist');
  });

  it('Проверка закрытия модального окна с ингредиентом по нажатию на оверлей', () => {
    const ingredient = cy.get(
      '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]'
    );

    ingredient.click();

    const modal = cy.get('[data-cy=modal]');
    modal.should('be.visible');

    const modalIngredientData = modal.get(
      '[data-cy=ingredient-data-643d69a5c3f7b9001cfa093e]'
    );
    modalIngredientData.should('be.visible');

    const overlay = modal.get('[data-cy=overlay]');
    overlay.click({ force: true });
    // тут я не понимаю, в чем проблема нажатия на оверлей
    // пробовал разные позиции клика, но работает только
    // передача опции force

    modalIngredientData.should('not.exist');
    modal.should('not.exist');
  });
});
