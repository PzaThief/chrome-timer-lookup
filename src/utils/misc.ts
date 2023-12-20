export function isNullOrEmpty(obj: object): boolean {
  return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
}
