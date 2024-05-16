export interface Palette {
  primary: string;
  accent: string;
  background: {
    principal: string;
    alternative: string;
  };
  border: {
    primary: string;
    accent: string;
  };
  placeholder: string;
  /**
   * Text Primary Must contrast with background principal
   */
  gray: {
    100: string;
    400: string;
    700: string;
    800: string;
  };
  darkRed: {
    primary: string;
    legacy: string;
    error: string;
  };
  lightGreen: {
    200: string;
    400: string;
    border: string;
    inputBorder: string;
    done: string;
  };
  text: {
    primary: string;
    accent: string;
    title: string;
  };
  divider: {
    color: string;
    accent: string;
  };
  error: {
    primary: string;
  };
  selected: {
    primary: string;
  };
  other: {
    login: {
      placeholder: string;
    };
    weeklyTopic: {
      background: string;
    };
    onBoarding: {
      text: {
        accent: string;
      };
      background: {
        top: string;
        middle: string;
        bottom: string;
      };
      card: {
        background: string;
      };
      title: {
        color: string;
      };
      button: {
        accent: string;
        flat: string;
      };
    };
    dailyActions: {
      button: {
        background: string;
      };
    };
    profileSetting: {
      logoutButton: { background: string };
      notifications: { border: string };
    };
    safety: {
      button: { background: string };
      divider: { color: string };
      surprise: {
        first: string;
        second: string;
        third: string;
        forth: string;
      };
    };
    chat: {
      bubble: {
        out: {
          border: string;
          background: string;
        };
        in: {
          // To pick on chat groups. On simple chat use the first
          border: string;
          background: string;
        }[];
      };
    };
    trigger: {
      log: {
        button: {
          color: string;
        };
        triggerLabel: {
          selected: string;
        };
      };
    };
    learn: {
      category: {
        background: string;
      };
      post: {
        footer: {
          background: string;
        };
        background: string;
      };
      suggest: {
        background: string;
      };
    };
    progress: {
      counters: {
        my: 'rgba(255,167,112,255)';
        avg: 'rgba(229,119,123,255)';
      };
      weeks: {
        mark: {
          off: string;
          on: string;
        };
      };
      trigger: {
        severity: string[];
      };
    };
    avatar: {
      red: string;
      redLight: string;
    };
  };
}

export interface FontFamily {
  primary: string;
  accent: string;
}

export interface Theme {
  id: 'default' | 'dark';
  palette: Palette;
  fontFamily: FontFamily;
}
