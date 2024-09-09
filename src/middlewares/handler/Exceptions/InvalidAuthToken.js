import GenericException from "./GenericException";

export default class InvalidAuthToken extends GenericException {
    constructor(code, message) {
        super(code, message)
    }
}