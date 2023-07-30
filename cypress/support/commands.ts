import '@testing-library/cypress/add-commands';
import { Coords } from '../../src/utils/constants';

Cypress.Commands.add('findCellByCoords', ({ x, y }: Coords) =>
  cy.get(`[data-x="${x}"][data-y="${y}"]`),
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      findCellByCoords(coords: Coords): Cypress.Chainable<JQuery>;
    }
  }
}
