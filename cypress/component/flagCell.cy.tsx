import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';
import { LONG_TOUCH_DELAY } from '../../src/utils/useLongTouch';

describe('flag cell feature', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.wait(100); // TODO: investigate
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
    cy.findCellByCoords({ x: 6, y: 2 }).as('cell');
  });

  it('right click flags and unflags cell', () => {
    cy.get('@cell').rightclick();
    cy.get('@cell').within(() => {
      cy.findByRole('img', { name: 'flag' }).should('exist');
    });

    cy.get('@cell').rightclick();

    cy.get('@cell').within(() => {
      cy.findByRole('img', { name: 'flag' }).should('not.exist');
    });
  });

  it('long touch flags and unflags cell (on touch devices)', () => {
    cy.clock();

    cy.get('@cell').trigger('touchstart');
    cy.tick(LONG_TOUCH_DELAY);
    cy.get('@cell').trigger('touchend');

    cy.get('@cell').within(() => {
      cy.findByRole('img', { name: 'flag' }).should('exist');
    });

    cy.get('@cell').trigger('touchstart');
    cy.tick(LONG_TOUCH_DELAY);
    cy.get('@cell').trigger('touchend');

    cy.get('@cell').within(() => {
      cy.findByRole('img', { name: 'flag' }).should('not.exist');
    });
  });

  it('flag prevents cell from opening', () => {
    cy.get('@cell').rightclick();
    cy.get('@cell').click();

    cy.get('@cell').within(() => {
      cy.findByRole('img', { name: 'flag' }).should('exist');
    });
  });
});
