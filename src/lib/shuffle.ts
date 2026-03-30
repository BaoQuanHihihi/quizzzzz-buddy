/** Fisher–Yates shuffle in place, returns same array */
export function shuffleInPlace<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = array[i]!;
    array[i] = array[j]!;
    array[j] = t;
  }
  return array;
}

/** Return a new array shuffled (copy) */
export function shuffleCopy<T>(items: T[]): T[] {
  return shuffleInPlace([...items]);
}

/** Pick `count` unique items in random order from `pool` */
export function pickRandomUnique<T>(pool: T[], count: number): T[] {
  if (count <= 0) return [];
  const copy = shuffleCopy(pool);
  return copy.slice(0, Math.min(count, copy.length));
}
