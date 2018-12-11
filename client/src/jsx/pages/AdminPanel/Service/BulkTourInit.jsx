import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import showSuccess from "common/dialogs/showSuccess";

export default class BulkTourInit extends React.Component {
    static propTypes = {
        competition: PT.shape({
            disciplines: PT.arrayOf(
                PT.shape({
                    tours: PT.arrayOf(
                        PT.shape({
                            id: PT.number.isRequired,
                            active: PT.bool.isRequired,
                            finalized: PT.bool.isRequired,
                        }),
                    ),
                }).isRequired,
            ),
        }).isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            tourIds: null,
            currentIdx: null,
            failures: null,
        };
    }

    initNextTour(idx) {
        if (idx >= this.state.tourIds.length) {
            this.setState({
                tourIds: null,
                currentIdx: null,
                failures: null,
            });
            showSuccess(_("global.messages.success"));
            return;
        }
        Api("tour/init", {
            tour_id: this.state.tourIds[idx],
        })
            .onError(() => {
                this.setState({
                    failures: this.state.failures + 1,
                });
            })
            .onDone(() => {
                this.setState({
                    currentIdx: this.state.currentIdx + 1,
                });
                this.initNextTour(idx + 1);
            })
            .send();
    }

    run = () => {
        this.setState(
            {
                tourIds: this.props.competition.disciplines
                    .filter(d => d.tours.length > 0)
                    .filter(d => !d.tours[0].finalized)
                    .filter(d => !d.tours[0].active)
                    .map(d => d.tours[0].id),
                currentIdx: 0,
                failures: 0,
            },
            () => {
                this.initNextTour(0);
            },
        );
    };

    handleClick = () => {
        showConfirm(_("admin.confirms.bulk_tour_init"), this.run);
    };

    renderStatus() {
        return (
            <div className="status">
                {_(
                    "admin.messages.bulk_tour_init_status",
                    this.state.currentIdx,
                    this.state.tourIds.length,
                    this.state.failures,
                )}
            </div>
        );
    }
    renderButton() {
        return (
            <button onClick={this.handleClick}>
                {_("admin.buttons.bulk_tour_init")}
            </button>
        );
    }
    renderBody() {
        if (this.state.tourIds == null) {
            return this.renderButton();
        } else {
            return this.renderStatus();
        }
    }
    render() {
        return <div className="BulkTourInit">{this.renderBody()}</div>;
    }
}
