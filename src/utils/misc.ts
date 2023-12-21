export function isNullOrEmpty(obj: object): boolean {
  return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function timeConversion(duration: number) {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + 'h');
    duration = duration - (hours * msInHour);
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + 'm');
    duration = duration - (minutes * msInMinute);
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + 's');
  }

  return portions.join(' ');
}

export function getCallStack(depth: number = 0): string {
  const stackStr = new Error().stack!
  const stackList = stackStr.split("\n    at ").slice(2 + depth)
  return stackList.join("\n")
}