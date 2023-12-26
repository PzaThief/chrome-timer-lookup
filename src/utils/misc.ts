export function isNullOrEmpty(obj: object): boolean {
  return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function timeToReadable(duration: number) {
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

  const msInSecond = 1000;
  const seconds = Math.trunc(duration / msInSecond);
  if (seconds > 0) {
    portions.push(seconds + 's');
    duration = duration - (seconds * msInSecond);
  }

  const milliSeconds = duration;
  if (milliSeconds > 0 || portions.length == 0) {
    portions.push(milliSeconds + 'ms');
  }

  return portions.join(' ');
}

export function getCallStack(depth: number = 0): string {
  const stackStr = new Error().stack!
  const stackList = stackStr.split("\n    at ").slice(2 + depth)
  return stackList.join("\n")
}