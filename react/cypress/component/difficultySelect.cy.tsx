import { App } from '../../src/App';
import { difficultyLevels, boardSizes } from '../../src/utils/constants';

describe('difficulty level select', () => {
  difficultyLevels.forEach((difficulty) => {
    it(`${difficulty}`, () => {
      cy.mount(<App />);
      cy.findByRole('button', {
        name: RegExp(`${difficulty}`, 'i'),
      }).click();

      cy.findAllByTestId('row').then((rows) => {
        const height = rows.length;
        cy.wrap(rows[0]).within(() => {
          cy.findAllByRole('button', {
            name: /cell/i,
          }).then((el) => {
            const width = el.length;
            const boardSize = boardSizes[difficulty];

            expect(width).to.equal(boardSize.width);
            expect(height).to.equal(boardSize.height);
          });
        });
      });
    });
  });
});
