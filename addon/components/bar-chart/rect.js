import Component from "@ember/component";
import layout from "../../templates/components/bar-chart/rect";

/**
 * Renders the `rect` for a bar in the bar chart
 *
 * Only necessary to interact with directly in advanced use-cases of the `Bar` component
 */
export default class BarChartRectComponent extends Component {
  tagName = "";
  layout = layout;
}
