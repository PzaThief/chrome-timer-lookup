export class Timer {
  readonly id: number;
  readonly type: TimerType;
  readonly func: TimerHandler;
  readonly callStack: string | undefined;
  readonly delay: number | undefined;
  readonly createdAt: Date;
  lastExecuted: Date | undefined;
  status: TimerStatus | undefined;

  constructor(
    id: number,
    type: TimerType,
    func: TimerHandler,
    callStack: string | undefined = undefined,
    delay: number | undefined = undefined,
    createdAt: Date,
    lastExecuted: Date | undefined = undefined,
    status: TimerStatus | undefined = undefined
  ) {
    this.id = id;
    this.type = type;
    this.func = func;
    this.callStack = callStack;
    this.delay = delay;
    this.createdAt = createdAt;
    this.lastExecuted = lastExecuted;
    this.status = status;
  }

  toTransferable(): TransferableTimer {
    return TransferableTimer.fromTimer(this);
  }
  // Return remaining time to next execution in ms.
  // If there is no more execution in the future, it will return -1
  remainingToNextExecution(): number {
    if ((this.delay ?? 0) === 0) return -1;

    if (this.type === TimerType.Interval) {
      const previous = this.lastExecuted ?? this.createdAt;
      const next = new Date(previous.getTime() + this.delay!);
      return next.getTime() - new Date().getTime();
    }

    // in case of Timeout
    if (this.lastExecuted != null) return -1;
    const next = new Date(this.createdAt.getTime() + this.delay!);
    return next.getTime() - new Date().getTime();
  }
}

export class TransferableTimer {
  readonly id: number;
  readonly type: TimerType;
  readonly func: string;
  readonly callStack: string | undefined;
  readonly delay: number | undefined;
  readonly createdAt: string;
  lastExecuted: string | undefined;
  status: TimerStatus | undefined;

  constructor(
    id: number,
    type: TimerType,
    func: string,
    callStack: string | undefined = undefined,
    delay: number | undefined = undefined,
    createdAt: string,
    lastExecuted: string | undefined = undefined,
    status: TimerStatus | undefined = undefined
  ) {
    this.id = id;
    this.type = type;
    this.func = func;
    this.callStack = callStack;
    this.delay = delay;
    this.createdAt = createdAt;
    this.lastExecuted = lastExecuted;
    this.status = status;
  }

  public static fromTimer(timer: Timer) {
    return new TransferableTimer(
      timer.id,
      timer.type,
      timer.func.toString(),
      timer.callStack,
      timer.delay,
      timer.createdAt.toJSON(),
      timer.lastExecuted?.toJSON(),
      timer.status
    );
  }

  public static fromObject(obj: object): TransferableTimer {
    const timer = obj as TransferableTimer;
    return new TransferableTimer(
      timer.id,
      timer.type,
      timer.func,
      timer.callStack,
      timer.delay,
      timer.createdAt,
      timer.lastExecuted,
      timer.status
    );
  }

  toTimer(): Timer {
    return new Timer(
      this.id,
      this.type,
      this.func,
      this.callStack,
      this.delay,
      new Date(this.createdAt),
      this.lastExecuted ? new Date(this.lastExecuted) : undefined,
      this.status
    );
  }
}

export enum TimerType {
  Interval = 1,
  Timeout,
}

export enum TimerStatus {
  Running = 1,
  Done,
  Canceled,
}
