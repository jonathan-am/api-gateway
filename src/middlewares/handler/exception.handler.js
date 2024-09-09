export default function handler(error, req, res, next) {
    let status = error.code ? error.code : 400;
    res.status(status).send({ msg: error.messages ? error.messages : error.message, code: status});
}