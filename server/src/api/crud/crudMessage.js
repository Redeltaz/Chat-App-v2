import CRUDBase from "./crudBase.js";

class CRUDMessage extends CRUDBase {

    constructor(label) {
        super(label);
    }

}

const crudMessage = new CRUDMessage("Message");
export default crudMessage;