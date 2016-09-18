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

const CmpChain = () => new CmpChainImpl();
export default CmpChain;
