import winston from 'winston'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import * as process from "process";


const { createLogger, format, transports } = winston
const { combine, timestamp, colorize, printf, simple, } = winston.format


export default class Logger {
    private logger: winston.Logger
    private cloudWatchClient: CloudWatchLogsClient
    LogGroupName: string
    LogStreamName: string

    constructor(private readonly category : string) {
        const logFormat = printf(info => {
            return `[${info.timestamp}] [${info.level}] [${this.category}] : ${info.message}`
        })
        // 프로덕션인 경우
        // 실제 클라우드워치에 보내는 역할
        this.logger = createLogger({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
            format: combine(
              colorize(),
              timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss',
              }),
              logFormat,
            )
        })
        this.logger.add(new transports.Console())
        // 프로덕션일경우 추가적으로 클라우드워치 작업
        if (process.env.NODE_ENV === 'production') {
            this.cloudWatchClient = new CloudWatchLogsClient({
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
                region: process.env.CLOUDWATCH_REGION
            })
            this.LogGroupName = process.env.CLOUDWATCH_GROUP_NAME
            this.LogStreamName = `${process.env.CLOUDWATCH_STREAM_NAME}-${process.env.NODE_ENV}`
        }
    }

    public info(msg: string) {
        this.logger.info(msg)
        if (process.env.NODE_ENV === "production") {
            this.sendToCloudWatch('Info', msg)
        }
    }
    public error(errMsg: string) {
        this.logger.error(errMsg)
        if (process.env.NODE_ENV === "production") {
            this.sendToCloudWatch('Error', errMsg)
        }
    }
    public debug(debugMsg: string) {
        this.logger.debug(debugMsg)
    }
    public warn(warnMsg: string) {
        this.logger.warn(warnMsg)
    }

    private sendToCloudWatch(level: string, msg: string) {
            const logEvents= [
                {
                    timestamp: new Date().getTime(),
                    message: `${level}: ${msg}`,
                }
            ]
        const command = new PutLogEventsCommand({
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
            logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
            logEvents
        })

        this.cloudWatchClient.send(command)
    }
}