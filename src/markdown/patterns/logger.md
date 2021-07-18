# logger

```js
/* logger.ts */

import { fx } from '@utils/fx';
import { hasKeys, findKey } from '@utils/object';

const LOG_LEVEL = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
} as const;

type ILevelKeys = keyof typeof LOG_LEVEL;
type ILevelValues = typeof LOG_LEVEL[ILevelKeys];
type ILogArgs = unknown[];

function convertToString(arg: unknown): string {
  const argType = typeof arg;

  if (argType === 'string') {
    return arg as string;
  } else if (argType === 'number' || argType === 'boolean') {
    return String(arg);
  } else if (argType === 'object') {
    try {
      return JSON.stringify(arg);
    } catch {
      console.error('Error to parsing object to string : ', arg);
      return '';
    }
  } else {
    return '';
  }
}

class Logger {
  private readonly defaultLevel = LOG_LEVEL.info;
  private readonly defaultLevelKey = 'info';
  private currentLogLevel: ILevelValues;

  constructor(level?: ILevelKeys) {
    this.currentLogLevel = level && hasKeys(LOG_LEVEL, level) ? LOG_LEVEL[level] : this.defaultLevel;
  }

  private combineStr = (...args: ILogArgs): string => {
    return fx.process(
      [...args],
      fx.map(convertToString),
      fx.reduce((result: string, str: string) => {
        const addStr = `${result && str ? ' ' : ''}${str}`;

        return result + addStr;
      }, '')
    ) as string;
  };

  private _log = (level: ILevelValues, ...args: ILogArgs) => {
    const key = (findKey(LOG_LEVEL, (v) => v === level) as ILevelKeys | undefined) || this.defaultLevelKey;

    if (this.currentLogLevel <= level) {
      if (level <= LOG_LEVEL.debug) {
        console.log(...args); // LOG_LEVEL trace, debug use console.log
      } else {
        console[key](...args);
      }
    }
  };

  private _error = (error: Error | null, ...args: ILogArgs) => {
    if (this.currentLogLevel <= LOG_LEVEL.error) {
      error ? console.error(error, ...args) : console.error(...args);
    }
  };

  getCurrentLogLevel = () => {
    return findKey(LOG_LEVEL, (v) => v === this.currentLogLevel) as ILevelKeys | undefined;
  };

  trace = (...args: ILogArgs) => {
    this._log(LOG_LEVEL.trace, ...args);
  };

  debug = (...args: ILogArgs) => {
    this._log(LOG_LEVEL.debug, ...args);
  };

  info = (...args: ILogArgs) => {
    this._log(LOG_LEVEL.info, ...args);
  };

  warn = (...args: ILogArgs) => {
    this._log(LOG_LEVEL.warn, ...args);
  };

  error = (error: Error | null, ...args: ILogArgs) => {
    this._error(error, ...args);
  };
}

export default new Logger(process.env.APP_LOG_LEVEL as ILevelKeys);

```