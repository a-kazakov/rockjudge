class TimeoutWrapper {
    constructor(parent, callback, time) {
        this.parent = parent;
        this.id = setTimeout(() => {
            this.disarmParent();
            return callback();
        }, time);
        this.armParent();
    }
    cancel() {
        clearTimeout(this.id);
        this.disarmParent();
    }
    armParent() {
        this.parent._handles.set(`T/${this.id}`, this);
    }
    disarmParent() {
        this.parent._handles.delete(`T/${this.id}`);
    }
    replace(next) {
        this.id = next.id;
    }
}

class IntervalWrapper {
    constructor(parent, callback, time) {
        this.parent = parent;
        this.id = setInterval(callback, time);
        this.armParent();
    }
    cancel() {
        clearInterval(this.id);
        this.disarmParent();
    }
    armParent() {
        this.parent._handles.set(`I/${this.id}`, this);
    }
    disarmParent() {
        this.parent._handles.delete(`I/${this.id}`);
    }
}

export default class SafeTimeout {
    _handles = new Map();

    setTimeout(callback, time) {
        return new TimeoutWrapper(this, callback, time);
    }
    setInterval(callback, time) {
        return new IntervalWrapper(this, callback, time);
    }
    setRepeatingTimeout(callback, time) {
        let wrapper;
        const fn_wrapper = () => {
            const result = callback();
            if (!result) {
                const next_wrapper = this.setTimeout(fn_wrapper, time);
                wrapper.replace(next_wrapper);
            }
        };
        wrapper = new TimeoutWrapper(this, fn_wrapper, time);
        return wrapper;
    }
    clear() {
        Array.from(this._handles.values()).forEach(h => h.cancel());
    }
}
