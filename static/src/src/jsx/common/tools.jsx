export function clone(obj) {
    if (typeof obj !== "object") {
        return obj;
    }
    return JSON.parse(JSON.stringify(obj));
}

class CmpChainImpl {
    constructor() {
        this.result = 0;
    }
    cmp(a, b) {
        if (this.result === 0) {
            if (a < b) {
                this.result = -1;
            } else if (a > b) {
                this.result = 1;
            }
        }
        return this;
    }
    end() {
        return this.result;
    }
}

export var CmpChain = () => new CmpChainImpl();
