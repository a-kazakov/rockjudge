import _ from "l10n";

import ActiveJob from "./ActiveJob";

export default class JobQueue extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            nowRendering: null,
        };
        this.scheduleJob();
    }

    addJob = (job_type, tour, copies) => {
        let new_queue = this.state.queue.slice(); // clone
        new_queue.push({
            type: job_type,
            tour: tour,
            copies: copies,
            id: Math.random(),
        });
        this.setState({
            queue: new_queue,
        });
    }
    scheduleJob = () => {
        setTimeout(this.processJob, 1000);
    }
    processJob = () => {
        if (this.state.nowRendering) {
            return;
        }
        let job = this.state.queue[0];
        if (!job) {
            this.scheduleJob();
            return;
        }
        this.timer = setTimeout(this.retryJob, 10000);
        this.setState({
            queue: this.state.queue.slice(1),
            nowRendering: job,
        });
    }
    retryJob = () => {
        this.setState({
            queue: [this.state.nowRendering].concat(this.state.queue),
            nowRendering: null,
        });
        this.scheduleJob();
    }
    handleDocxCreated = (filename) => {
        clearTimeout(this.timer);
        setTimeout(() => {
            let job = this.state.nowRendering;
            let xhr = new XMLHttpRequest();
            let address = `http://127.0.0.1:5949/print-docx?filename=${ filename }&copies=${ job.copies }`;
            xhr.open("GET", address, true);
            xhr.onload = () => {};
            xhr.onerror = () => this.addJob(job.type, job.tour, job.copies);
            xhr.send();
            this.setState({
                nowRendering: null,
            });
            this.scheduleJob();
        }, 1000);
    }
    renderActiveJob() {
        if (!this.state.nowRendering) {
            return null;
        }
        return (
            <ActiveJob
                key="active-job"
                queueItem={ this.state.nowRendering }
                onDone={ this.handleDocxCreated }
            />
        );
    }
    render() {
        if (this.state.queue.length === 0) {
            return (
                <div className="queue queue-empty">
                    { _("admin.auto_printer.queue_empty") }
                    <div className="hidden-container">
                        { this.renderActiveJob() }
                    </div>
                </div>
            );
        }
        return (
            <div className="queue">
                { this.state.queue.map((item) =>
                    <div className="row" key={ item.id }>
                        <div className="name">
                            { item.type === "test"
                                ? _("admin.auto_printer.test_page")
                                : `${item.tour.discipline.name} — ${item.tour.name}`
                            }
                        </div>
                        <div className="type">
                            { _(`admin.auto_printer.${item.type}`) }
                        </div>
                        <div className="copies">
                            { item.copies }
                        </div>
                    </div>
                ) }
                <div className="hidden-container">
                    { this.renderActiveJob() }
                </div>
            </div>
        );
    }
}

JobQueue.displayName = "AdminPanel_Service_AutoPrinter_JobQueue";
