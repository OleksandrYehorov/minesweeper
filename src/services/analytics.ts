import { intervalToDuration, formatDuration } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/analytics';
import { Difficulty } from '../utils/constants';
import { now } from '../utils/now';

const firebaseConfig = {
  apiKey: 'AIzaSyDJdOEpo7tADYFOhGZwyHJrKQ66tLUZ_Sk',
  authDomain: 'minesweeper-12668.firebaseapp.com',
  projectId: 'minesweeper-12668',
  storageBucket: 'minesweeper-12668.appspot.com',
  messagingSenderId: '227670634951',
  appId: '1:227670634951:web:e4cd4f9c038577b7c369e2',
  measurementId: 'G-BT2Q977QMC',
};

const initFirebaseAnalytics = () => {
  if (process.env.NODE_ENV === 'production') {
    firebase.initializeApp(firebaseConfig);

    return firebase.analytics();
  }

  return null;
};

const firebaseAnalytics = initFirebaseAnalytics();

export type AnalyticsEvents = {
  start_game: {
    difficulty: Difficulty;
  };
  win_game: {
    difficulty: Difficulty;
    durationMs: number;
    durationFormatted: string;
  };
  lose_game: {
    difficulty: Difficulty;
    durationMs: number;
    durationFormatted: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEvents;

const logEvent = <T extends AnalyticsEventName>(
  eventName: T,
  eventParams: AnalyticsEvents[T]
): void => {
  firebaseAnalytics?.logEvent<AnalyticsEventName>(eventName, eventParams);
};

export type LogEndGameParams = {
  difficulty: Difficulty;
  startedAt: number;
};

const logEndGame = ({
  win,
  difficulty,
  startedAt,
}: LogEndGameParams & { win: boolean }): void => {
  const endedAt = now();
  const durationMs = endedAt - startedAt;
  const duration = intervalToDuration({
    start: startedAt,
    end: endedAt,
  });
  const durationFormatted = formatDuration(duration);

  logEvent(win ? 'win_game' : 'lose_game', {
    difficulty,
    durationMs,
    durationFormatted,
  });
};

export const Analytics = {
  logStartGame(params: AnalyticsEvents['start_game']): void {
    logEvent('start_game', params);
  },
  logWinGame(params: LogEndGameParams): void {
    logEndGame({ win: true, ...params });
  },
  logLoseGame(params: LogEndGameParams): void {
    logEndGame({ win: false, ...params });
  },
};
