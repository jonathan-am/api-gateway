import GenericException from "./GenericException";

export default class BadRequest extends GenericException{
    
    constructor(code, message, messages) {
        super(code, message)
        this.messages = messages;
    }
}