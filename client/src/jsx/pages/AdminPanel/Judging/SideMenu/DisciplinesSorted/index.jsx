import Section from "./Section";

export default class DisciplinesSorted extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeTourId: PT.number,
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            onActiveTourChange: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div className="noselect">
                { this.props.competition.disciplines.map(discipline =>
                    <Section
                        activeTourId={ this.props.activeTourId }
                        discipline={ discipline }
                        key={ discipline.id }
                        onActiveTourChange={ this.props.onActiveTourChange }
                    />
                ) }
            </div>
        );
    }
}

DisciplinesSorted.displayName = "AdminPanel_Judging_SideMenu_DisciplinesSorted";
