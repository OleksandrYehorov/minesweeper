import '../component/workaround-cypress-process-issue';
import '@testing-library/cypress/add-commands';
import { Coords } from '../../src/utils/constants';

Cypress.Commands.add('findCellByCoords', ({ x, y }: Coords) => {
  return cy.get(
    `[data-testid="board"] :nth-child(${
      y + 1
    }) > [data-testid="cell"]:nth-child(${x + 1})`,
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
