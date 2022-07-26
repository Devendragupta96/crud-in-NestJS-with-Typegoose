import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { UsersService } from './users.service';
import { jest } from '@jest/globals';
import { AppModule } from '../app.module';
import { UsersModule } from './users.module';
let mongod: MongoMemoryServer;
//let module: TestingModule;
let id;

describe('UserService', () => {
  let service: UsersService;
  //jest.setTimeout(30000);

//  let model:Model<User>;
//   const fakeModel = {
//     create: jest.fn(),
//     findById: jest.fn(),
//     save: jest.fn(),
//     find: jest.fn(),
//     findByIdAndDelete: jest.fn(),
//     findByIdAndUpdate: jest.fn()
//   }
  const fakeModel = jest.fn();
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        TypegooseModule.forRootAsync({
                  useFactory: async () => ({
                    uri: await mongod.getUri(),
                  }),
                }),
        //AppModule,
        UsersModule

        ],
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: fakeModel,       //User
      },
      ],
      //controllers: [UsersController],

    }).compile();

    service = module.get<UsersService>(UsersService);
    //model=module.get<User>(User);
  });

  afterAll(async () => {
  await mongoose.connection.close();
  await mongoose.disconnect();
  await mongod.stop();
  //await module.close();
  
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create the user', async () => {
    let user = {
      email: 'sampleabc1263@gmail.com',
      password: 'abc',
      name:"abc",
      age:60,
    }

    let result = await service.create(user);
    id=result._id;
    console.log(result);
    console.log(typeof id);
    

    expect(result).toBeDefined();
    expect(result.password ).toBe("abc");

  });
  it('should get user detail by id', async () => {
    const result = await service.findUser(id);
    console.log(result);
    
    expect(result).toBeDefined();
  });
  it('should find all the users', async () => {
    const result = await service.findAll();
    console.log(result);

    expect(result).toBeDefined();
  });
  
  it('should update the users', async () => {
    let user = {
      email: 'sample11@abc.com',
      password: 'abc',
      name:"abc",
      age:12
    }
    const result = await service.update(id, user);
    console.log(result);

    expect(result).toBeDefined();
  });
  it('should get user detail by aggregation', async () => {
    const result = await service.aggregate();
    console.log(result);
    
    expect(result).toBeDefined();
  });
  it('should delete the users', async () => {
    const result = await service.remove(id);

    console.log(result);
    
    expect(result).toBeDefined();
  });
  it('should not get the user after deletion', async () => {
  //   let user = {
  //     email: '1',
  //     password: 'abc'
  //   }

    let result = await service.findUser(id);
    console.log(result);

    expect(result).toBeNull();
    expect(result).toBeFalsy();

  });
  
});
