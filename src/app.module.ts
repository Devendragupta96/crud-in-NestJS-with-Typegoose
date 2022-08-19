import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './Users/users.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    }),
    TypegooseModule.forRoot(process.env.MONGO_URI),
     //TypegooseModule.forRoot("mongodb://localhost:27017"),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
