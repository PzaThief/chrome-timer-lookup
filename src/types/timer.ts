import { timeConversion } from "../utils/misc";

export class Timer {
  readonly id: number;
  readonly type: TimerType;
  readonly func: TimerHandler;
  readonly callStack: string | undefined;
  readonly delay: number | undefined;
  readonly createdAt: Date;
  lastExecuted: Date | undefined;

  constructor(
    id: number,
    type: TimerType,
    func: TimerHandler,
    callStack: string | undefined = undefined,
    delay: number | undefined = undefined,
    createdAt: Date,
    lastExecuted: Date | undefined = undefined
  ) {
    this.id = id;
    this.type = type;
    this.func = func;
    this.callStack = callStack;
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
  readonly callStack: string | undefined;
  readonly delay: string | undefined;
  readonly createdAt: string;
  lastExecuted: string | undefined;

  constructor(timer: Timer) {
    this.id = timer.id;
    this.type = TimerType[timer.type];
    this.func = timer.func.toString();
    this.callStack = timer.callStack;
    this.delay = timer.delay ? timeConversion(timer.delay) : undefined;
    this.createdAt = timer.createdAt.toJSON();
    this.lastExecuted = timer.lastExecuted?.toJSON();
  }
}

export enum TimerType {
  Interval = 1,
  Timeout,
}
