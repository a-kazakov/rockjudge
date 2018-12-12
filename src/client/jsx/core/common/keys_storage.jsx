import md5 from "js-md5";
import BN from "bn.js";

import Api from "common/server/Api";

class KeysStorage {
    constructor() {
        const keys_json = localStorage.getItem(this.ls_key);
        if (!keys_json) {
            this.has_keys = false;
            this.client_id = null;
            this.secret = null;
            return;
        }
        const keys_obj = JSON.parse(keys_json);
        this.has_keys = true;
        this.client_id = keys_obj.client_id;
        this.secret = keys_obj.secret;
        this._awaiting_resolvers = [];
    }

    get ls_key() {
        return `server_keys_${window.server_id}`;
    }

    updateKeys(client_id, secret) {
        this.has_keys = true;
        this.client_id = client_id;
        this.secret = secret;
        localStorage.setItem(
            this.ls_key,
            JSON.stringify({
                client_id: client_id,
                secret: secret,
            }),
        );
    }

    resetKeys() {
        localStorage.removeItem(this.ls_key);
    }

    obtainKeys() {
        return new Promise(resolve => {
            this._awaiting_resolvers.push(resolve);
            if (this._awaiting_resolvers.length === 1) {
                this._obtainKeysImpl();
            }
        });
    }

    _obtainKeysImpl() {
        function makeRandomBN() {
            let result = "";
            for (let i = 0; i < 20; ++i) {
                result += Math.random()
                    .toFixed(5)
                    .slice(2);
            }
            return new BN(result);
        }

        // Diffie-hellman
        Api("auth/start_registration", {})
            .disableSignature()
            .onSuccess(response => {
                const client_id = response.client_id;
                // Sever data
                const dh_p = new BN(response.dh_p);
                const dh_g = new BN(response.dh_g);
                const dh_ga = new BN(response.dh_ga);
                // My data
                const dh_b = makeRandomBN();
                // Reductions
                const red_ctx = BN.mont(dh_p);
                const dh_g_red = dh_g.toRed(red_ctx);
                const dh_ga_red = dh_ga.toRed(red_ctx);
                // Calculations
                const dh_gb_red = dh_g_red.redPow(dh_b);
                const dh_gab_red = dh_ga_red.redPow(dh_b);
                const secret = dh_gab_red.fromRed().toString(16);
                // Making new request
                Api("auth/complete_registration", {
                    client_id: client_id,
                    data: {
                        dh_gb: dh_gb_red.fromRed().toString(10),
                    },
                })
                    .disableSignature()
                    .onSuccess(ex_response => {
                        if (
                            md5(`RockJudge|${secret}`) !==
                            ex_response.verification_string
                        ) {
                            console.error("Key exchange failed");
                            return;
                        }
                        this.updateKeys(client_id, secret);
                        this._awaiting_resolvers.forEach(resolve => resolve());
                    })
                    .send();
            })
            .send();
    }
}

const keys_storage = new KeysStorage();
export default keys_storage;
