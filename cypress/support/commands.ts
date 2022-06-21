import '../component/workaround-cypress-process-issue';
import '@testing-library/cypress/add-commands';
import { Coords } from '../../src/utils/constants';

Cypress.Commands.add('findCellByCoords', ({ x, y }: Coords) => {
  x++;
  y++;
  return cy.get(
    `[data-testid="board"] :nth-child(${y}) > [data-testid="cell"]:nth-child(${x})`,
  );
});

declare global {
  namespace Cypress {
    interface Chainable {
      findCellByCoords: (
        coords: Coords,
      ) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
