import _ from "l10n";

import Item from "./Item";
import SubMenu from "./SubMenu";

export default class SideMenu extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activePage: PT.string,
            activePageProps: PT.object.isRequired,
            competition: PT.object.isRequired,
            onNavigate: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            activePage: null,
        }
    }

    handleItemClick = (mkey) => {
        this.props.onNavigate(mkey.page, mkey.page_props);
    }

    renderOneLevelItem(page) {
        return (
            <Item
                active={ this.props.activePage === page }
                mkey={ { page: page, page_props: {} } }
                title={ _(`admin.menu.${page}`) }
                onClick={ this.handleItemClick }
            />
        );
    }
    renderItemWithDisciplines(page) {
        const items = this.props.competition.disciplines.map((discipline) =>
            <Item
                active={ page === this.props.activePage &&
                         discipline.id === this.props.activePageProps.disciplineId }
                key={ `${page}|${discipline.id}` }
                level={ 2 }
                mkey={ { page: page, page_props: { disciplineId: discipline.id } } }
                title={ discipline.name }
                onClick={ this.handleItemClick }
            />
        )
        return (
            <SubMenu
                id={ `D_${page}` }
                title={ _(`admin.menu.${page}`) }
            >
                { items }
            </SubMenu>
        );
    }
    render() {
        return (
            <div className="SideMenu">
                { this.renderOneLevelItem("import_export") }
                { this.renderOneLevelItem("manage_judges") }
                { this.renderOneLevelItem("manage_disciplines") }
                { this.renderOneLevelItem("manage_clubs") }
                { this.renderItemWithDisciplines("manage_participants") }
                { this.renderItemWithDisciplines("manage_tours") }
                { this.renderOneLevelItem("manage_competition_plan") }
                { this.renderOneLevelItem("start_list") }
                { this.renderOneLevelItem("competition_report") }
            </div>
        );
    }
}

SideMenu.displayName = "AdminPanel_Management_SideMenu";
