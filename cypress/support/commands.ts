import '@testing-library/cypress/add-commands';
import { Coords } from '../../src/utils/constants';

Cypress.Commands.add('findCellByCoords', ({ x, y }: Coords) =>
  cy.get(`[data-x="${x}"][data-y="${y}"]`),
);

declare global {
  namespace Cypress {
    interface Chainable {
      findCellByCoords(coords: Coords): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
