import GenericException from "./GenericException";

export default class ClientRequestException extends GenericException{

    constructor(code, message) {
        super(code, message)
    }
}