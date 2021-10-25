import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    FilesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'file-management',
      autoLoadEntities: true,
      synchronize: true
    }),
  ],
})
export class AppModule {}
