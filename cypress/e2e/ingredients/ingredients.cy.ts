beforeEach(() => {
  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.visit('');
  cy.wait('@getIngredients');
});

describe('Тесты ингредиентов', () => {
  const selectors = {
    ingredient: '[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]',
    modal: '[data-cy=modal]',
    ingredientData: '[data-cy=ingredient-data-643d69a5c3f7b9001cfa093e]'
  };

  it('Проверка добавления ингредиента в конструктор', () => {
    const button = cy
      .get('[data-cy=ingredient-for-643d69a5c3f7b9001cfa093e]')
      .find('button')
      .click();

    const constructorList = cy.get('[data-cy=ingredients-list]');

    constructorList.get('[data-cy=643d69a5c3f7b9001cfa093e]').should('exist');
  });

  it('Проверка открытия модального окна с ингредиентом', () => {
    cy.get(selectors.ingredient).click();

    cy.get(selectors.modal).should('be.visible');

    cy.get(selectors.ingredientData).should('be.visible');
  });

  it('Проверка закрытия модального окна с ингредиентом по нажатию на крестик', () => {
    cy.get(selectors.ingredient).click();

    const modal = cy.get(selectors.modal).should('be.visible');

    const ingredientData = cy
      .get(selectors.ingredientData)
      .should('be.visible');

    cy.get('[data-cy=close-modal-button]').click();

    modal.should('not.exist');
    ingredientData.should('not.exist');
  });

  it('Проверка закрытия модального окна с ингредиентом по нажатию на оверлей', () => {
    cy.get(selectors.ingredient).click();

    const modal = cy.get(selectors.modal).should('be.visible');

    const ingredientData = cy
      .get(selectors.ingredientData)
      .should('be.visible');

    const overlay = modal.get('[data-cy=overlay]').click({ force: true });

    modal.should('not.exist');
    ingredientData.should('not.exist');
  });
});
