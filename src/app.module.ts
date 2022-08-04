import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from './Users/users.module';



@Module({
  imports: [
    TypegooseModule.forRoot("mongodb+srv://Devendra:devendra@cluster0.jysvm.mongodb.net/test?retryWrites=true&w=majority"),
     //TypegooseModule.forRoot("mongodb://localhost:27017"),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
