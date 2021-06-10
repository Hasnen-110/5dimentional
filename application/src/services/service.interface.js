import AuthService      from './auth.service';

class ServiceInterface {

    AuthService() {
        return new AuthService();
    }

}

export default new ServiceInterface();