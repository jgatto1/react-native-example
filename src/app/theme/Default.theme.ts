import { Theme as NavigationTheme } from '@react-navigation/native';
import { Palette, Theme } from 'app/theme/model';

const DefaultPalette: Palette = {
  primary: 'rgb(100,161,117)',
  accent: 'rgb(252,247,165)',
  background: {
    principal: 'rgb(240,246,241)',
    alternative: 'rgb(255,255,255)',
  },
  border: {
    primary: 'rgb(212,226,215)',
    accent: 'rgb(212,226,215)',
  },
  placeholder: 'rgb(194,194,194)',
  text: {
    primary: 'rgb(74,78,86)',
    accent: 'rgb(255,255,255)',
    title: 'rgb(61,135,168)',
  },
  divider: {
    color: 'rgb(61,135,168)',
    accent: 'rgb(242,171,121)',
  },
  error: {
    primary: 'rgb(191,39,27)',
  },
  selected: {
    primary: 'rgb(241,171,121)',
  },
  other: {
    login: {
      placeholder: 'rgb(150,150,150)',
    },
    weeklyTopic: {
      background: 'rgb(242,171,121)',
    },
    onBoarding: {
      text: { accent: 'rgb(74,79,86)' },
      background: { bottom: 'rgb(241,246,239)', middle: 'rgb(229,119,123)', top: 'rgb(241,246,239)' },
      title: { color: 'rgb(61,135,168)' },
      card: { background: 'rgb(255,255,255)' },
      button: { accent: 'rgb(212,226,215)', flat: 'rgb(64,138,170)' },
    },
    dailyActions: {
      button: {
        background: 'rgba(252,246,153,255)',
      },
    },
    profileSetting: {
      logoutButton: { background: 'rgb(215,124,126)' },
      notifications: { border: 'rgb(242,171,121)' },
    },
    safety: {
      button: { background: 'rgb(242,171,121)' },
      divider: { color: 'rgb(242,171,121)' },
      surprise: {
        first: '#7AA983',
        second: '#FDF489',
        third: '#D47276',
        forth: '#F7A56F',
      },
    },
    chat: {
      bubble: {
        out: {
          background: 'rgba(205,225,234,255)',
          border: 'rgba(60,136,167,255)',
        },
        in: [
          {
            background: 'rgba(208,226,212,255)',
            border: 'rgba(112,169,127,255)',
          },
        ],
      },
    },
    trigger: {
      log: {
        button: {
          color: 'rgb(229, 119, 123)',
        },
        triggerLabel: {
          selected: 'rgb(252,247,153)',
        },
      },
    },
    learn: {
      category: {
        background: 'rgba(245,238,224,255)',
      },
      post: {
        footer: {
          background: 'rgba(255, 245, 238, 1)',
        },
        background: 'rgba(254,248,238,255)',
      },
      suggest: {
        background: 'rgba(254,246,187,255)',
      },
    },
    progress: {
      counters: {
        my: 'rgba(255,167,112,255)',
        avg: 'rgba(229,119,123,255)',
      },
      weeks: {
        mark: {
          off: 'rgba(122,128,137,255)',
          on: 'rgba(253,247,139,255)',
        },
      },
      trigger: {
        severity: [
          'rgba(9,137,171,255)',
          'rgba(116,169,131,255)',
          'rgba(253,247,139,255)',
          'rgba(255,167,112,255)',
          'rgba(229,119,122,255)',
        ],
      },
    },
    avatar: {
      red: 'rgb(215,124,126)',
      redLight: 'rgb(253, 183, 185)',
    },
  },
  gray: {
    100: 'rgb(245,245,245)',
    400: 'rgb(189,189,189)',
    700: 'rgb(75,80,83)',
    800: 'rgb(39,39,42)',
  },
  lightGreen: {
    200: 'rgb(197,225,165)',
    400: 'rgb(156,204,101)',
    border: 'rgba(168,229,137,255)',
    inputBorder: 'rgba(178,208,185,255)',
    done: 'rgb(100,161,117)',
  },
  darkRed: {
    primary: 'rgb(177,105,128)',
    legacy: 'rgb(188, 80, 74)',
    error: 'rgb(212,90,89)',
  },
};

export const DefaultTheme: Theme = {
  id: 'default',
  fontFamily: {
    primary: 'Montserrat-Regular',
    accent: 'AgramondPro',
  },
  palette: DefaultPalette,
};

export const DefaultNavigationTheme: NavigationTheme = {
  colors: {
    background: DefaultTheme.palette.background.principal,
    border: DefaultTheme.palette.border.primary,
    card: DefaultTheme.palette.primary,
    notification: DefaultTheme.palette.primary,
    primary: DefaultTheme.palette.background.principal,
    text: DefaultTheme.palette.text.primary,
  },
  dark: false,
};
