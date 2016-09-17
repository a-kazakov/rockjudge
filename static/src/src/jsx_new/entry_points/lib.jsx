import "babel-polyfill";

import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

window.rockjudge = {
    api: Api,
    storage: storage,
    message_dispatcher: message_dispatcher,
};
