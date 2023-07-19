// import winston from 'winston'
// import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
// import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
// import * as process from "process";
//
//
// const { createLogger, format, transports } = winston
// const { combine, timestamp, colorize, printf, simple } = winston.format
//
// const logFormat = printf(info => {
//     return `${info.timestamp} [${info.level}] : ${info.message}`
// })
//
// export default class Logger {
//     private logger: winston.Logger
//     private cloudWatchClient: CloudWatchLogsClient
//     LogGroupName: string
//     LogStreamName: string
//
//     constructor() {
//
//         /** ######### 기존 ########## */
//         this.logger = createLogger({
//             level: 'info',
//             format: combine(
//               timestamp({
//                   format: 'YYYY-MM-DD HH:mm:ss',
//               }),
//               logFormat,
//             )
//         })
//         // 프로덕션인 경우
//         // 실제 클라우드워치에 보내는 역할
//         if (process.env.NODE_ENV === 'production') {
//             // @aws-sdk/client-cloudwatch-logs
//             /** ######### 신규 클라우드워치 ########## */
//             this.cloudWatchClient = new CloudWatchLogsClient({
//                 credentials: {
//                     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//                 },
//                 region: process.env.CLOUDWATCH_REGION
//             })
//             this.LogGroupName = process.env.CLOUDWATCH_GROUP_NAME
//             this.LogStreamName = `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`
//
//             /** ######### 신규 클라우드워치 끝 ########## */
//
//             // // timestamp 는 클라우드워치에 도달할 때 찍히므로 별도 설정 필요 x
//             // const cloudwatchConfig = {
//             //     logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
//             //     logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
//             //     awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             //     awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
//             //     awsRegion: process.env.CLOUDWATCH_REGION,
//             //     messageFormatter: ({ level, message, additionalInfo }) =>
//             //       `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`
//             // }
//             // const cloudWatchHelper = new WinstonCloudwatch(cloudwatchConfig)
//             this.logger.add()
//
//         } else if (process.env.NODE_ENV === 'debug') {
//             // 프로덕션이 아닌 경우 콘솔에 출력
//             this.logger.add(new transports.Console({
//                 format: combine(
//                   colorize(),
//                   simple()
//                 ),
//             }))
//         }
//         /** ######### 기존 끝 ########## */
//     }
//
//     public info(msg: string) {
//         this.logger.info(msg)
//     }
//     public error(errMsg: string) {
//         this.logger.error(errMsg)
//     }
//     // public debug(debugMsg: string) {
//     //     this.logger.error(debugMsg)
//     // }
//     // public warn(warn: string) {
//     //     this.logger.error(warnMsg)
//     // }
//
//     public getRequestLogger() {
//         return WinstonModule.forRoot({
//             transports: [
//                 new winston.transports.Console(
//                   {
//                       level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
//                       format: combine(
//                         colorize(),
//                         timestamp(),
//                         nestWinstonModuleUtilities
//                           .format
//                           .nestLike('SampleApp', { prettyPrint: true }),
//                       ),
//                   }
//                 ),
//             ],
//         })
//     }
// }