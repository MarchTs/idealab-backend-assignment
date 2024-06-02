import { AuthService } from '@app/modules/authentication/AuthService';
import { EmailAuthLoginRequest } from '@app/modules/authentication/requests/EmailAuthLoginRequest';
import { Body, JsonController, Post } from 'routing-controllers';
import Container from 'typedi';

@JsonController('/auth')
export class AuthController {
    private readonly _authService: AuthService = Container.get(AuthService);

    @Post('/login')
    async login(@Body() request: EmailAuthLoginRequest) {
        return this._authService.loginEmail(request);
    }

    @Post('/register-email')
    async registerEmail(@Body() request: EmailAuthLoginRequest): Promise<{ token: string }> {
        const account = await this._authService.registerEmail(request);
        const token = await this._authService.createJwtToken(account);
        return { token };
    }
}
