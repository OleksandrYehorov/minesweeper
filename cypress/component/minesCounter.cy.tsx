import { App } from '../../src/App';
import { minesMockData } from '../../src/utils/minesMockData';

const minesCount = 10;

describe('mines counter', () => {
  beforeEach(() => {
    cy.mount(<App />);
    cy.findCellByCoords(minesMockData.beginner.firstClick).click();
  });

  it('shows remaining mines', () => {
    const flagsCount = 4;

    cy.findByLabelText(/mines count/i).should('have.text', minesCount);

    cy.get('[data-open=false]')
      .filter((i) => i < flagsCount)
      .rightclick({ multiple: true });

    cy.findByLabelText(/mines count/i).should(
      'have.text',
      minesCount - flagsCount,
    );
  });

  it('shows negative count if there are more than 10 flags', () => {
    const flagsCount = minesCount + 3;

    cy.findByLabelText(/mines count/i).should('have.text', minesCount);

    cy.get('[data-open=false]')
      .filter((i) => i < flagsCount)
      .rightclick({ multiple: true });

    cy.findByLabelText(/mines count/i).should(
      'have.text',
      minesCount - flagsCount,
    );
  });
});
