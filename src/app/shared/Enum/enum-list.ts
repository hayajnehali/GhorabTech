export function getEnumList<T extends object>(enumType: T) {
  return Object.keys(enumType)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      id: (enumType as any)[key],
      name: key
    }));
}
