import User from "../business/user";

export async function signin(req, res) {
    try {
        var {body: {...user}, isAuthorized} = req;
        console.log(isAuthorized)
        var response = await new User({user}).signin();
        res.status(200).send({
            status: 200,
            message: 'Success',
            ...response
        });
    } catch(err) {
        console.log(err);
        res.status(200)
        .send(err.getErrorObject());
    }
}

export async function signup(req, res) {
    try {
        var {body: {...user}} = req;
        var response = await new User({user}).signup();
        res.status(200).send({
            status: 200,
            message: 'Success',
            ...response
        });
    } catch(err) {
        console.log(err);
        res.status(200)
        .send(err.getErrorObject());
    }
}