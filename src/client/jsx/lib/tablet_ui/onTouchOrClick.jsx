function prevent(e) {
    e.preventDefault();
}

export default function onTouchOrClick(handler) {
    let f = event => {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f,
        onTouchEnd: prevent,
    };
}
