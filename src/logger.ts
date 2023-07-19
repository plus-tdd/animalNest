import winston from 'winston'
import {
    WinstonModule,
    utilities as nestWinstonModuleUtilities,
} from 'nest-winston'
import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
import { stringify } from "ts-jest";
import * as process from "process";
import { ConfigService } from "@nestjs/config";


const { createLogger, format, transports } = winston
const { combine, timestamp, colorize, printf, simple } = winston.format

const logFormat = printf(info => {
    return `${info.timestamp} [${info.level}] : ${info.message}`
})

export default class Logger {
    private logger: winston.Logger
    private cloudWatchClient: CloudWatchLogsClient
    LogGroupName: string
    LogStreamName: string

    constructor(/*private readonly env: ConfigService*/) {

        /** ######### 기존 ########## */
        this.logger = createLogger({
            level: 'info',
            format: combine(
              timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss',
              }),
              logFormat,
            )
        })
        // 프로덕션인 경우
        // 실제 클라우드워치에 보내는 역할
        if (process.env.NODE_ENV === 'production') {
            // @aws-sdk/client-cloudwatch-logs
            /** ######### 신규 클라우드워치 ########## */
            this.cloudWatchClient = new CloudWatchLogsClient({
                credentials: {
                    accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
                    secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
                },
                region: process.env.CLOUDWATCH_REGION
            })
            this.LogGroupName = process.env.CLOUDWATCH_GROUP_NAME
            this.LogStreamName =  `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`

        /** ######### 신규 클라우드워치 끝 ########## */
        } else if (process.env.NODE_ENV === 'debug') {
            // 프로덕션이 아닌 경우 콘솔에 출력
            this.logger.add(new transports.Console({
                format: combine(
                  colorize(),
                  simple()
                ),
            }))
        }
        /** ######### 기존 끝 ########## */
    }

    public info(msg: string) {
        this.logger.info(msg)
    }
    public error(errMsg: string) {
        this.logger.error(errMsg)
    }
    // public debug(debugMsg: string) {
    //     this.logger.error(debugMsg)
    // }
    // public warn(warn: string) {
    //     this.logger.error(warnMsg)
    // }

    public getRequestLogger() {
        return WinstonModule.forRoot({
            transports: [
                new winston.transports.Console(
                  {
                      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                      format: combine(
                        colorize(),
                        timestamp(),
                        nestWinstonModuleUtilities
                          .format
                          .nestLike('SampleApp', { prettyPrint: true }),
                      ),
                  }
                ),
            ],
        })
    }
}