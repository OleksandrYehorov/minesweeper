import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';

describe('timer', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  it('timer shows playing time', () => {
    cy.clock();

    cy.findByLabelText(/timer/i).as('timer');

    cy.get('@timer').should('have.text', '0');
    cy.tick(3100);
    // must be still 0 because game is not started
    cy.get('@timer').should('have.text', '0');

    // start the game
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();

    cy.get('@timer').should('have.text', '0');
    cy.tick(3100);
    // must be 3 since game was started 3 seconds ago
    cy.get('@timer').should('have.text', '3');

    // restart the game
    cy.findByRole('button', { name: /restart/i }).click();

    // must be 0 after the game is restarted
    cy.get('@timer').should('have.text', '0');
  });
});
