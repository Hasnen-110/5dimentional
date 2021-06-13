import AuthService      from './auth.service';
import MomentService    from './moment.service';

class ServiceInterface {

    AuthService() {
        return new AuthService();
    }

    MomentService() {
        return new MomentService();
    }

}

export default new ServiceInterface();