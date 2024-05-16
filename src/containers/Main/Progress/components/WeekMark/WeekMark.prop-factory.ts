import { WeeklyCommitment, WeeklyMeetingAttendance, WeeklyPowerUp } from 'model/backend/progress';

declare type WeekPrecondition<T> = (item: T) => boolean;

class WeekHelper<T> {
  constructor(private precondition: WeekPrecondition<T>) {}

  public evaluate(list?: T[]): number[] {
    if (!list || list.length === 0) {
      return [];
    }
    return new Array(12)
      .fill(0)
      .map((_, i) => ({ overflow: i >= list.length, weekIndex: i }))
      .map((partial) => ({
        ...partial,
        take: !partial.overflow && this.precondition(list[partial.weekIndex]),
      }))
      .filter((item) => item.take)
      .map((item) => item.weekIndex);
  }

  public static create<I>(precondition: WeekPrecondition<I>): WeekHelper<I> {
    return new WeekHelper(precondition);
  }

  public static forPowerUps(precondition: WeekPrecondition<WeeklyPowerUp>) {
    return new WeekHelper(precondition);
  }

  public static forMeetingAttendance(precondition: WeekPrecondition<WeeklyMeetingAttendance>) {
    return new WeekHelper(precondition);
  }

  public static forCommitment(precondition: WeekPrecondition<WeeklyCommitment>) {
    return new WeekHelper(precondition);
  }
}

const nonFuture = (item: WeeklyPowerUp | WeeklyCommitment | WeeklyMeetingAttendance) => {
  return !item.is_future;
};

function nonFutureAnd<T extends WeeklyPowerUp | WeeklyCommitment | WeeklyMeetingAttendance>(
  p: WeekPrecondition<T>
): WeekPrecondition<T> {
  return (item: T) => nonFuture(item) && p(item);
}

const PowerUp = WeekHelper.forPowerUps(nonFutureAnd((power) => power.did_power_up));

const MeetingAttendance = WeekHelper.forMeetingAttendance(nonFutureAnd((meet) => meet.did_attend_meeting));

const MeetingAttendanceNonFull = WeekHelper.forMeetingAttendance(
  nonFutureAnd((meet) => meet.did_attend_meeting && meet.attendance !== 'full')
);

const Commitment = WeekHelper.forCommitment(nonFutureAnd((c) => c.did_commitment));

export const WeekMarkPropFactory = {
  PowerUp,
  MeetingAttendance,
  Commitment,
  MeetingAttendanceNonFull,
};
