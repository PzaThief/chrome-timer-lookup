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

  simplify(): SimplifiedTimer {
    return new SimplifiedTimer(this);
  }
}

export class SimplifiedTimer {
  readonly id: number;
  readonly type: string;
  readonly func: string;
  readonly delay: number | undefined;
  readonly createdAt: string;
  lastExecuted: string | undefined;

  constructor(timer: Timer) {
    this.id = timer.id;
    this.type = TimerType[timer.type];
    this.func = timer.func.toString();
    this.delay = timer.delay;
    this.createdAt = timer.createdAt.toJSON();
    this.lastExecuted = timer.lastExecuted?.toJSON();
  }
}

export enum TimerType {
  Interval = 1,
  Timeout,
}
