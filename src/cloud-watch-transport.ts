// /*
// import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
// import winston from 'winston';
// import * as process from "process";
//
// export class CloudWatchTransport extends winston.transports.Stream {
//     private cloudwatchLogs: CloudWatchLogsClient;
//     private readonly logGroupName: string;
//     private readonly logStreamName: string;
//     constructor(options: { stream?: any }) {
//         super();
//         this.cloudwatchLogs = new CloudWatchLogsClient({
//             credentials: {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//             },
//             region: process.env.CLOUDWATCH_REGION
//         });
//         this.logGroupName = process.env.CLOUDWATCH_GROUP_NAME;
//         this.logStreamName = process.env.CLOUDWATCH_STREAM_NAME;
//         this.stream = options.stream || process.stdout;
//     }
//
//     async log(info, callback) {
//         setImmediate(() => this.emit('logged', info));
//
//         const { level, message, ...meta } = info;
//
//         const params = {
//             logEvents: [
//                 {
//                     message: `${level}: ${message} ${JSON.stringify(meta)}`,
//                     timestamp: new Date().getTime()
//                 }
//             ],
//             logGroupName: this.logGroupName,
//             logStreamName: this.logStreamName,
//             // TODO: sequenceToken should be retrieved and managed.
//         };
//
//         try {
//             await this.cloudwatchLogs.send(new PutLogEventsCommand(params));
//             callback();
//         } catch (error) {
//             callback(error);
//         }
//     }
// }
//
// const logger = winston.createLogger({
//     transports: [
//         new CloudWatchTransport({ stream: process.stdout }),
//     ],
// });
//
// export default logger;*/
// import { CloudWatchLogsClient, PutLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";
// import * as winston from 'winston';
//
// export class CloudWatchTransport extends winston.transports.Stream {
//     private cloudwatchLogs: CloudWatchLogsClient;
//     private readonly logGroupName: string;
//     private readonly logStreamName: string;
//     private sequenceToken: string;
//
//     constructor(options: { stream?: any }) {
//         super();
//         this.cloudwatchLogs = new CloudWatchLogsClient({
//             credentials: {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//             },
//             region: process.env.CLOUDWATCH_REGION
//         });
//         this.logGroupName = process.env.CLOUDWATCH_GROUP_NAME;
//         this.logStreamName = process.env.CLOUDWATCH_STREAM_NAME;
//         this.sequenceToken = null;
//         this.stream = options.stream || new Stream();
//     }
//
//     async log(info, callback) {
//         setImmediate(() => this.emit('logged', info));
//
//         const { level, message, ...meta } = info;
//
//         const params = {
//             logEvents: [
//                 {
//                     message: `${level}: ${message} ${JSON.stringify(meta)}`,
//                     timestamp: new Date().getTime()
//                 }
//             ],
//             logGroupName: this.logGroupName,
//             logStreamName: this.logStreamName,
//             sequenceToken: this.sequenceToken,
//         };
//
//         try {
//             await this.cloudwatchLogs.send(new PutLogEventsCommand(params));
//             this.sequenceToken = params.nextSequenceToken;
//             callback();
//         } catch (error) {
//             callback(error);
//         }
//     }
// }
// class Stream {
//     public write(message: string): void {
//         console.log(message);
//     }
// }
// const logger = winston.createLogger({
//     transports: [
//         new CloudWatchTransport({ stream: new Stream() }),
//     ],
// });
//
// export default logger;