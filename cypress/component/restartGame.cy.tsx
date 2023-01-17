import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';

describe('restart game', () => {
  it('click on the emoji button restarts the game', () => {
    cy.mount(<App />);

    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
    cy.findByRole('button', { name: /restart/i }).click();
    cy.findCellByCoords(minesMockData.beginner.firstClick).should(
      'not.have.attr',
      'data-open',
    );
  });
});
