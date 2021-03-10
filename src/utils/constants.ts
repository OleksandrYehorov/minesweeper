export const difficultyLevels = ['beginner', 'intermediate', 'expert'] as const;

export type Difficulty = typeof difficultyLevels[number];

export interface BoardData {
  width: number;
  height: number;
  mines: number;
}

export const boardSizes: Record<Difficulty, BoardData> = {
  beginner: { width: 9, height: 9, mines: 10 },
  intermediate: { width: 16, height: 16, mines: 40 },
  expert: { width: 30, height: 16, mines: 99 },
};

export interface Coords {
  x: number;
  y: number;
}
