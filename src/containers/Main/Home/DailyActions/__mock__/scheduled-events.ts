import { ScheduledEvent } from 'model/backend/scheduled-event';

export const SCHEDULED_EVENTS: ScheduledEvent[] = [
  {
    end_at: 'Mon, 04 Oct 2021 22:59:00 GMT',
    event_name: 'Safety ',
    event_type: null,
    id: 2538,
    invitees: [
      {
        id: 2481,
        invitee_id: '79',
        invitee_type: 'cohort',
        is_deleted: false,
        scheduled_event_id: 2538,
      },
    ],
    is_deleted: false,
    repeats: [],
    resource_id: '26',
    resource_type: 'topic',
    start_at: 'Mon, 13 Sep 2021 08:00:00 GMT',
  },
  {
    end_at: 'Sun, 12 Sep 2021 03:59:00 GMT',
    event_name: 'Addiction',
    event_type: null,
    id: 2539,
    invitees: [
      {
        id: 2482,
        invitee_id: '79',
        invitee_type: 'cohort',
        is_deleted: false,
        scheduled_event_id: 2539,
      },
    ],
    is_deleted: false,
    repeats: [],
    resource_id: '30',
    resource_type: 'topic',
    start_at: 'Sun, 12 Sep 2021 02:59:00 GMT',
  },
];
