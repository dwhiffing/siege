import {
  OFFSET_X,
  OFFSET_Y,
  NUM_COLUMNS,
  TILE_SIZE,
} from './constants'

export const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

export const getBoardPosition = (x, y) => {
  return [
    x * TILE_SIZE + OFFSET_X,
    y * TILE_SIZE + OFFSET_Y,
  ]
}

export const getBoardId = (x, y) => {
  return x + y * NUM_COLUMNS
}
