import { App } from '../../src/App';
import { boardSizes } from '../../src/utils/constants';
import { minesMockData } from '../../src/utils/minesMockData';

describe('win game', () => {
  it('game is won by opening all non mine cells', () => {
    cy.mount(<App />);
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();

    // flag all mines
    for (const coords of minesMockData.beginner.mines) {
      cy.findCellByCoords(coords).rightclick();
    }

    // click all cells
    for (let y = 0; y < boardSizes.beginner.height; y++) {
      for (let x = 0; x < boardSizes.beginner.width; x++) {
        cy.findCellByCoords({ x, y }).click();
      }
    }

    // check that the game is won
    cy.findByRole('img', {
      name: /smiling face with sunglasses/i,
    }).should('exist');

    const flaggedCellCoords = minesMockData.beginner.mines[0];
    cy.findCellByCoords(flaggedCellCoords).rightclick();

    // check that cells can not be unflagged after win
    cy.findCellByCoords(flaggedCellCoords).within(() => {
      cy.findByRole('img', {
        name: 'flag',
      }).should('exist');
    });
  });
});
