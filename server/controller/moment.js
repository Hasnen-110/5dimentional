import Moment from "../business/moment";

export async function getMoments(req, res) {
    try {
        var {params: {userid}, isAuthorized} = req;
        if (!isAuthorized) res.status(200).send({status: 404, message: 'token expired'});
        var response = await new Moment({userid}).getMoments();
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

export async function addMoment(req, res) {
    try {
        var {body: {userid, moment}, isAuthorized} = req;
        // if (!isAuthorized) res.status(200).send({status: 404, message: 'token expired'});
        var response = await new Moment({userid, moment}).addMoment();
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