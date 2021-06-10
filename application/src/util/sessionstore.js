const STORAGE = {
    PROFILE     : 'profile'
}

export default class Session {

    setProfile = (data) => {
        let profile = JSON.stringify(data);
        sessionStorage.setItem(STORAGE.PROFILE, profile);
    }

    getProfile = () => {
        let data = sessionStorage.getItem(STORAGE.PROFILE);
        let profile = JSON.parse(data);
        return {...profile, isLoading: false}
    }

    remove = (storage) => {
        sessionStorage.removeItem(storage);
    }

    removeAll = () => sessionStorage.clear();
}