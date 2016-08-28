export const OFFSET_X = 20
export const OFFSET_Y = 20
export const TWEEN_DURATION = 400
export const TILE_DIMENSIONS = 75
export const TILE_SPACING = 5
export const NUM_COLUMNS = 6
export const NUM_ROWS = 5
export const TILE_SIZE = TILE_DIMENSIONS + TILE_SPACING
export const MATCH_TYPES = [
  [
    1, 0,
    1, 0,
  ], [
    1, 0, 1, 0,
    1, 0, 1, 0,
  ], [
    1, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0,
  ], [
    1, 0,
    0, 1,
  ], [
    1, 0, 1, 0,
    0, 1, 0, 1,
  ], [
    1, 0, 1, 0, 1, 0,
    0, 1, 0, 1, 0, 1,
  ], [
    1, 1,
    0, 0,
  ], [
    1, 1, 1, 1,
    0, 0, 0, 0,
  ], [
    1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0,
  ]
]

// shape index + tile type = index
export const UNIT_TYPES = [
  'soldier', 'sling', 'airman', 'patch',
  'knight', 'archer', 'airship', 'wall',
  'elephant', 'catapult', 'zeplin', 'repair',
]

export const TILE_SHAPES = [
  [0, 2],
  [2, 2],
  [4, 2],
  [0, 4],
  [2, 4],
  [0, 6],
]
