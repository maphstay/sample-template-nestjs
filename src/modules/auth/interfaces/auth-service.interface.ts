import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

export abstract class IAuthService {
  abstract login(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }>;
}
