class ConnectionTester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payload_size: 1000,
            ping_interval: 1000,
            active_pings: {},
            finished_pings: [],
            lastest_latency: 0,
        };
        message_dispatcher.addListener("ping_reply", this.onPingReply.bind(this));
        this.resetJob();
    }
    resetJob(interval) {
        if (this.job) {
            clearInterval(this.job);
        }
        this.job = setInterval(this.ping.bind(this), interval || this.state.ping_interval);
    }
    ping() {
        let ping_id = Math.random().toString();
        let new_state = $.extend({}, this.state.active_pings);
        new_state[ping_id] = new Date().getTime();
        this.setState({
            active_pings: new_state,
            latest_sent: new Date().getTime(),
        });
        Api("service.ping", { ping_id: ping_id, payload_size: this.state.payload_size }).send();
    }
    onPingReply(response) {
        let ping_id = response.ping_id;
        if (!this.state.active_pings[ping_id]) {
            return;
        }
        let time = new Date().getTime() - this.state.active_pings[ping_id];
        let active_pings = $.extend({}, this.state.active_pings);
        let finished_pings = $.extend([], this.state.finished_pings);
        finished_pings.push({
            received: new Date().getTime(),
            latency: time,
        })
        if (finished_pings.length > 1100) {
            finished_pings = finished_pings.slice(-1000);
        }
        delete active_pings[ping_id];
        this.setState({
            active_pings: active_pings,
            finished_pings: finished_pings,
        });
    }
    setPayloadSize(new_size) {
        this.setState({
            payload_size: new_size,
        });
    }
    setPingInterval(interval) {
        this.setState({
            ping_interval: interval,
        });
        this.resetJob(interval);
    }
    calcStatistics(source) {
        let arr = source.map((p) => parseInt(p.latency));
        arr.sort((a, b) => a - b);
        return {
            min: (arr[0] / 1000).toFixed(2),
            max: (arr[arr.length - 1] / 1000).toFixed(2),
            p50: (arr[Math.round((arr.length - 1) * 0.50)] / 1000).toFixed(2),
            p80: (arr[Math.round((arr.length - 1) * 0.80)] / 1000).toFixed(2),
            p95: (arr[Math.round((arr.length - 1) * 0.95)] / 1000).toFixed(2),
            p99: (arr[Math.round((arr.length - 1) * 0.99)] / 1000).toFixed(2),
        }
    }
    renderStat(stat) {
        return <div className="stat">
            <div className="title">Min:</div>
            <div className="value">{ stat.min }</div>
            <div className="title">P50:</div>
            <div className="value">{ stat.p50 }</div>
            <div className="title">P80:</div>
            <div className="value">{ stat.p80 }</div>
            <div className="title">P95:</div>
            <div className="value">{ stat.p95 }</div>
            <div className="title">P99:</div>
            <div className="value">{ stat.p99 }</div>
            <div className="title">Max:</div>
            <div className="value">{ stat.max }</div>
        </div>;
    }
    render() {
        let stat100 = this.calcStatistics(this.state.finished_pings.slice(-100));
        let stat1000 = this.calcStatistics(this.state.finished_pings.slice(-1000));
        return <div>
            <header>
                <h1>Connection tester</h1>
            </header>
            <div className="container-fluid">
                <div className="row connection-tester">
                    <div className="col-md-6">
                        <h3>Payload size</h3>
                        <TabletSelectorInput
                            choices={ [[100, "100 b"], [1000, "1 KB"], [10000, "10 KB"], [100000, "100 KB"], [1000000, "1 MB"]] }
                            active={ this.state.payload_size }
                            onValueUpdate={ this.setPayloadSize.bind(this) } />
                        <h3>Ping interval</h3>
                        <TabletSelectorInput
                            choices={ [[100, "100ms"], [200, "200ms"], [500, "500ms"], [1000, "1s"], [2000, "2s"], [5000, "5s"], [10000, "10s"]] }
                            active={ this.state.ping_interval }
                            onValueUpdate={ this.setPingInterval.bind(this) } />
                    </div>
                    <div className="col-md-6">
                        <b>Active pings:</b> { Object.keys(this.state.active_pings).length }<br />
                        <h3>Lastest latencies</h3>
                        <table className="latency-chart"><tbody><tr>
                            { this.state.finished_pings.slice(-10).map((ping, idx) =>
                                <td key={ idx } className="chart-cell">
                                    <div className={ "bar" + (ping.latency > 2000 ? " red" : "") } style={{ height: Math.min(Math.round(ping.latency / 10), 200) + "px" }}></div>
                                    { Math.round(ping.latency / 10) / 100 }
                                </td>
                            ) }
                            <td></td>
                        </tr></tbody></table>
                        <h3>Statiscics out of 100:</h3>
                        { this.renderStat(stat100) }
                        <h3>Statiscics out of 1000:</h3>
                        { this.renderStat(stat1000) }
                    </div>
                </div>
            </div>
        </div>;
    }
}
