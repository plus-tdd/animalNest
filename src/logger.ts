import winston from 'winston';
import {
  CloudWatchLogsClient,
  PutLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import * as process from 'process';
import moment from 'moment-timezone';

const { createLogger, transports } = winston;
const { combine, timestamp, colorize, printf, errors } = winston.format;

export default class Logger {
  private logger: winston.Logger;
  private cloudWatchClient: CloudWatchLogsClient;
  LogGroupName: string;
  LogStreamName: string;
  private is_production = process.env.NODE_ENV === 'production';

  constructor(private readonly category: string) {
    // 실제 클라우드워치에 보내는 역할
    this.logger = createLogger({
      level: this.is_production ? 'info' : 'silly',
    });

    // 프로덕션일경우 추가적으로 클라우드워치 작업
    if (this.is_production) {
      this.cloudWatchClient = new CloudWatchLogsClient({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.CLOUDWATCH_REGION,
      });
      this.LogGroupName = process.env.CLOUDWATCH_GROUP_NAME;
      this.LogStreamName = process.env.CLOUDWATCH_STREAM_NAME;

      this.logger.add(
        new transports.Console({
          format: combine(
            colorize(),
            timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            printf((info) => {
              return `[${info.timestamp}] [${process.env.NODE_ENV}] [${info.level}] [${this.category}] : ${info.message}`;
            }),
          ),
        }),
      );
    } else {
      this.logger.add(
        new transports.Console({
          format: combine(
            colorize(),
            timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            printf((info) => {
              return `[${info.timestamp}] [${info.level}] [${this.category}] : ${info.message}`;
            }),
          ),
        }),
      );
    }
  }

  public info(msg: string, metadata = '') {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(msg);
    if (this.is_production) {
      const info = {
        timestamp: now,
        level: 'info',
        category: this.category,
        message: msg,
        metadata: metadata,
      };
      this.sendToCloudWatch(info);
    }
  }
  public error(errMsg: Error | string, metadata = '') {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    if (errMsg instanceof Error) {
      const err = errMsg.stack ? errMsg.stack : errMsg.message;
      this.logger.error(err + '\n    --metadata->' + metadata); // this will now log the error stack trace
    } else {
      this.logger.error(errMsg + '\n    --metadata->' + metadata);
    }
    if (this.is_production) {
      const info = {
        timestamp: now,
        level: 'error',
        category: this.category,
        message: errMsg,
        metadata: metadata,
      };
      this.sendToCloudWatch(info);
    }
  }
  public debug(debugMsg: string, metadata = '') {
    this.logger.debug(debugMsg);
  }
  public warn(warnMsg: string, metadata = '') {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    this.logger.warn(warnMsg);
    if (this.is_production) {
      const info = {
        timestamp: now,
        level: 'debug',
        category: this.category,
        message: warnMsg,
        metadata: metadata,
      };
      this.sendToCloudWatch(info);
    }
  }

  private sendToCloudWatch(info) {
    const logEvents = [
      {
        timestamp: new Date().getTime(),
        message: `[${info.timestamp}] [${info.level}] [${info.category}] ${
          info.metadata !== '' ? '- ' + info.metadata : ''
        } : ${info.message}`,
      },
    ];
    const command = new PutLogEventsCommand({
      logGroupName: this.LogGroupName,
      logStreamName: this.LogStreamName,
      logEvents,
    });
    this.cloudWatchClient.send(command);
  }
}
