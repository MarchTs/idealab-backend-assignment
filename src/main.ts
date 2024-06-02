import 'reflect-metadata';

import { AppUnitOfWorkFactory } from '@app/data/AppUnitOfWorkFactory';
import { AppUnitOfWorkFactoryIdentifier } from '@app/data/abstractions/IAppUnitOfWorkFactory';
import { AuthController } from '@app/modules/authentication/AuthController';
import { AuthService } from '@app/modules/authentication/AuthService';
import { InfluencerController } from '@app/modules/influencer/InfluencerController';
import { Action, createExpressServer } from 'routing-controllers';
import Container from 'typedi';
import { loadConfig } from './config';

const config = loadConfig();

Container.set(AppUnitOfWorkFactoryIdentifier, new AppUnitOfWorkFactory());
const authService = Container.get(AuthService);
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    controllers: [AuthController, InfluencerController],
    authorizationChecker: (action: Action, roles: string[]) => authService.authorizationChecker(action, roles),
});

// run express application on port 3000
app.listen(config.port);

console.log(`Start application on ${config.environment} on port ${config.port}`);
