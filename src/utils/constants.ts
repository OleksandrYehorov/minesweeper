export const difficultyLevels = ['beginner', 'intermediate', 'expert'] as const;

export type Difficulty = (typeof difficultyLevels)[number];

class BoardData {
  public readonly totalCellsCount: number;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly mines: number,
  ) {
    this.totalCellsCount = height * width;
  }
}

export const boardSizes = {
  beginner: new BoardData(9, 9, 10),
  intermediate: new BoardData(16, 16, 40),
  expert: new BoardData(30, 16, 99),
  // expert: new BoardData(128, 72, 720 * 2),
} satisfies Record<Difficulty, BoardData>;

export interface Coords {
  x: number;
  y: number;
}
