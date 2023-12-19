export class Timer {
  readonly id: number;
  readonly type: TimerType;
  readonly func: TimerHandler;
  readonly delay: number | undefined;
  readonly createdAt: Date;
  lastExecuted: Date | undefined;

  constructor(
    id: number,
    type: TimerType,
    func: TimerHandler,
    delay: number | undefined = undefined,
    createdAt: Date,
    lastExecuted: Date | undefined = undefined
  ) {
    this.id = id;
    this.type = type;
    this.func = func;
    this.delay = delay;
    this.createdAt = createdAt;
    this.lastExecuted = lastExecuted;
  }
}

export enum TimerType {
  Interval = 1,
  Timeout,
}
