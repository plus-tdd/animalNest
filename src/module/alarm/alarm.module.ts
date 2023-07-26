import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmServiceImpl } from './alarm.service';

@Module({})
export class AlarmModule {
  imports: [];
  controllers: [];
  providers: [
    AlarmService,
    {
      provide: 'AlarmService';
      useClass: AlarmServiceImpl;
    },
  ];
  exports: [
    {
      provide: 'AlarmService';
      useClass: AlarmServiceImpl;
    },
  ];
}
