import { ChannelMessage } from 'model/backend/channel';
import moment from 'moment';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 4,
    min: 2,
  },
});

export const randomMockMessageFrom: (users: string[]) => ChannelMessage = (users) => ({
  channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
  count_flags: 0,
  created: `${moment().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`, //Sun, 29 Aug 2021 17:51:25 GMT'
  is_flagged: false,
  is_hidden: false,
  message: lorem.generateSentences(),
  modified: `${moment().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`, //Sun, 29 Aug 2021 17:51:25 GMT'
  user_uuid: users[Math.floor(Math.random() * users.length)],
  uuid: `${Math.random()}`,
});

export const MESSAGES: { messages: ChannelMessage[] } = {
  messages: [
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 0,
      created: 'Sun, 29 Aug 2021 17:51:25 GMT',
      is_flagged: false,
      is_hidden: false,
      message: 'Responding to Help Me Cope message:\n<b>Hello</b>\n\nHey!',
      modified: 'Sun, 29 Aug 2021 17:51:25 GMT',
      user_uuid: '41fa0822-08e4-11ec-b0bd-16e2a3977c87',
      uuid: 'bb010bbe-08f1-11ec-b0bd-16e2a3977c87',
    },
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 1,
      created: 'Sun, 29 Aug 2021 17:51:54 GMT',
      is_flagged: true,
      is_hidden: false,
      message: '1\n\n\nD\nD\nD\nDd',
      modified: 'Sun, 29 Aug 2021 17:51:54 GMT',
      user_uuid: '41fa0822-08e4-11ec-b0bd-16e2a3977c87',
      uuid: 'cc50579e-08f1-11ec-b0bd-16e2a3977c87',
    },
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 1,
      created: 'Sun, 29 Aug 2021 17:51:58 GMT',
      is_flagged: true,
      is_hidden: false,
      message: 'Jsksksjs',
      modified: 'Sun, 29 Aug 2021 17:51:58 GMT',
      user_uuid: '41fa0822-08e4-11ec-b0bd-16e2a3977c87',
      uuid: 'ceabe526-08f1-11ec-b0bd-16e2a3977c87',
    },
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 0,
      created: 'Sun, 29 Aug 2021 18:27:26 GMT',
      is_flagged: false,
      is_hidden: false,
      message: 'Ok!',
      modified: 'Sun, 29 Aug 2021 18:27:26 GMT',
      user_uuid: '4d56ec72-fa06-11eb-b0bd-16e2a3977c87',
      uuid: 'c30607a6-08f6-11ec-b0bd-16e2a3977c87',
    },
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 0,
      created: 'Sun, 29 Aug 2021 18:27:37 GMT',
      is_flagged: false,
      is_hidden: false,
      message: '1',
      modified: 'Sun, 29 Aug 2021 18:27:37 GMT',
      user_uuid: '4d56ec72-fa06-11eb-b0bd-16e2a3977c87',
      uuid: 'c94dac0e-08f6-11ec-b0bd-16e2a3977c87',
    },
    {
      channel_uuid: '6be12012-08e4-11ec-b0bd-16e2a3977c87',
      count_flags: 0,
      created: 'Tue, 31 Aug 2021 20:18:18 GMT',
      is_flagged: false,
      is_hidden: false,
      message: 'Hola',
      modified: 'Tue, 31 Aug 2021 20:18:18 GMT',
      user_uuid: '4d56ec72-fa06-11eb-b0bd-16e2a3977c87',
      uuid: '94bc62ac-0a98-11ec-b0bd-16e2a3977c87',
    },
  ],
};
