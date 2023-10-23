export function composeImageUrl(identifier: string) {
  return `https://www.artic.edu/iiif/2/${identifier}/full/843,/0/default.jpg`;
}

type ItemWithKey = {
  [key: string]: any;
};
export const mergeWithoutDuplicates = <T extends ItemWithKey>(
  prev: T[],
  newData: T[],
  uniqueKey: keyof T,
): T[] => {
  const prevMap = new Map(prev.map(item => [item[uniqueKey], item]));
  newData.forEach(item => prevMap.set(item[uniqueKey], item));
  return Array.from(prevMap.values());
};
