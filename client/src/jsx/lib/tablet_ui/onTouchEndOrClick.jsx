export default function onTouchEndOrClick(handler) {
    let _handler = () => {};
    let distance = 0;
    let latest_pos = [0, 0];
    let fire = event => {
        event.preventDefault();
        return _handler();
    };
    let discard = () => {
        _handler = () => {};
    };
    let move = event => {
        let current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        let sqr = x => x * x;
        distance += Math.sqrt(
            sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]),
        );
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    };
    let start = event => {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    };
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler,
    };
}
