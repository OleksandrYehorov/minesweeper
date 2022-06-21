import { App } from '../../src/App';
import { Coords } from '../../src/utils/constants';
import { minesMockData } from '../../src/utils/minesMockData';

describe('number cell', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
  });

  it('upon click opens remaining not flagged cells', () => {
    cy.findCellByCoords({ x: 6, y: 3 }).rightclick();
    cy.findCellByCoords({ x: 7, y: 3 }).rightclick();

    cy.findCellByCoords({ x: 7, y: 4 }).click();

    const cellsCoords: Coords[] = [
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 8, y: 5 },
    ];

    for (const coords of cellsCoords) {
      cy.findCellByCoords(coords).should('have.attr', 'data-open', 'true');
    }
  });

  it('upon click opens mine cells', () => {
    cy.findCellByCoords({ x: 3, y: 2 }).rightclick();
    cy.findCellByCoords({ x: 3, y: 3 }).click();

    cy.findCellByCoords({ x: 4, y: 2 }).within(() => {
      cy.findByRole('img', {
        name: 'mine',
      }).should('exist');
    });
  });

  it('does not open cells if number and flags are different', () => {
    cy.findCellByCoords({ x: 6, y: 3 }).rightclick();
    cy.findCellByCoords({ x: 7, y: 4 }).click();

    const cellsCoords: Coords[] = [
      { x: 7, y: 3 },
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 8, y: 5 },
    ];

    for (const coords of cellsCoords) {
      cy.findCellByCoords(coords).should('have.attr', 'data-open', 'false');
    }
  });
});
