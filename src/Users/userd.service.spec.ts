import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
//let module:TestingModule;
// afterAll(async () => {
//   //await mongod.stop();

//   await mongoose.connection.close();
//   await mongoose.disconnect();
// });

describe('UserService', () => {
  let mongoConnection: Connection;
  let mongod: MongoMemoryServer;
  let service: UsersService;
  const fakeModel = jest.fn();


  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    mongoConnection = (await mongoose.connect(uri)).connection;

    let module: TestingModule = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRootAsync({
          useFactory: async () => ({
            uri
          }),
        }),
      ],
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: fakeModel,
      },
      ],
      controllers: [UsersController],

    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get the user create', async () => {
    const user = {
      email: 'sample@abc.com',
      password: 'abc'
    }
    const result = await service.create(user);
    await result.save();
    console.log(result);

    expect(result).toBeTruthy();
  });
  it('should get user detail by id', async () => {
    const result = await service.findUser('62eaba6b78e3f761a96ca4e7');
    expect(result).toBeDefined();
  });
});
