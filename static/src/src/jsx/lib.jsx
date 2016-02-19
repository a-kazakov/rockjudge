import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";


window.rockjudge = {
    api: Api,
    storage: storage,
    message_dispatcher: message_dispatcher,
};
