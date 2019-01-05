import { React } from "HostModules";

import PT from "prop-types";

export default class SeveralColumns extends React.PureComponent {
    static propTypes = {
        children: PT.node.isRequired,
        gap: PT.number,
        ratios: PT.arrayOf(PT.number.isRequired).isRequired,
    };
    static defaultProps = {
        gap: 1,
    };

    renderChild(node, idx, width, gap) {
        return (
            <div
                className="column"
                key={idx}
                style={{
                    width: `${width.toFixed(5)}%`,
                    marginLeft: `${gap.toFixed(5)}%`,
                }}
            >
                {node}
            </div>
        );
    }
    render() {
        const { children, gap, ratios } = this.props;
        const child_elements = React.Children.toArray(children);
        const total_elements =
            gap * (child_elements.length - 1) + ratios.reduce((a, b) => a + b, 0);
        const one_element_pct = 99.99 / total_elements;
        const gap_pct = one_element_pct * gap;
        return (
            <div className="several-columns">
                {child_elements.map((node, idx) =>
                    this.renderChild(
                        node,
                        idx,
                        ratios[idx] * one_element_pct,
                        idx === 0 ? 0 : gap_pct,
                    ),
                )}
            </div>
        );
    }
}
