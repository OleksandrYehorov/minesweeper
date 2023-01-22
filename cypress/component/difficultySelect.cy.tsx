import { App } from '../../src/App';
import { difficultyLevels, boardSizes } from '../../src/utils/constants';

describe('difficulty level select', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });

  difficultyLevels.forEach((difficulty) => {
    it(`${difficulty}`, () => {
      cy.findByRole('button', {
        name: RegExp(`${difficulty}`, 'i'),
      }).click();

      cy.findAllByTestId('row').then((rows) => {
        cy.wrap(rows[0])
          .findAllByRole('button', {
            name: /cell/i,
          })
          .then((cells) => {
            const height = rows.length;
            const width = cells.length;
            const boardSize = boardSizes[difficulty];

            expect(width).to.equal(boardSize.width);
            expect(height).to.equal(boardSize.height);
          });
      });
    });
  });
});
