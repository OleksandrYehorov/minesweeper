import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';

describe('restart game', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it('click on the emoji button restarts the game', () => {
    cy.findCellByCoords(minesMockData.beginner.firstClick).as('cell').click();
    cy.findByRole('button', { name: /restart/i }).click();

    cy.get('@cell').should('have.attr', 'data-open', 'false');
  });
});
