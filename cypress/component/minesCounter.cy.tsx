import { App } from '../../src/App';
import { Coords } from '../../src/utils/constants';
import { minesMockData } from '../../src/utils/minesMockData';

describe('mines counter', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
  });

  it('shows remaining mines', () => {
    cy.findByLabelText(/mines count/i).should('have.text', 10);

    cy.findCellByCoords({ x: 0, y: 0 }).rightclick();
    cy.findCellByCoords({ x: 1, y: 0 }).rightclick();

    cy.findByLabelText(/mines count/i).should('have.text', 8);
  });

  it('shows negative count if there are more than 10 flags', () => {
    cy.findByLabelText(/mines count/i).should('have.text', 10);

    const coords: Coords[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ];

    for (const { x, y } of coords) {
      cy.findCellByCoords({ x, y }).rightclick();
    }

    cy.findByLabelText(/mines count/i).should('have.text', -2);
  });
});
