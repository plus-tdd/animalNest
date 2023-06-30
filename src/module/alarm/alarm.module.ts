import { Module } from '@nestjs/common';
import { AlarmService } from './alarmService';
import { AlarmServiceImpl } from './alarmService';

@Module({})
export class AlarmModule {
    imports: []
    controllers: []
    providers: [
      AlarmService,
      {
        provide: 'AlarmService',
        useClass: AlarmServiceImpl,
      },
    ]
    exports: [
    {
        provide: 'AlarmService',
        useClass: AlarmServiceImpl,
    },
    ]
  }




