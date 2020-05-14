import Component from "@ember/component";
import { action, computed } from "@ember/object";

/**
 * Renders a bar in a `<BarChart />`
 *
 * Accepts a `@value` argument that determines the relative length of this bar compared to others in the chart
 *
 * ```hbs
 * <chart.Bar @value={{100}} />
 * ```
 *
 * Can also be rendered block-style to access the yielded values for more advanced use-cases
 *
 * ```hbs
 * <chart.Bar @value={{100}} as |bar|>
 *   <bar.Rect fill="red" />
 *   <text y={{bar.yOffset}} x={{bar.width}} dx="100px">
 *     My Label
 *   </text>
 * </chart.Bar>
 * ```
 *
 * @yield {Hash} bar
 * @yield {BarChartRectComponent} bar.Rect renders the rect element
 * @yield {number} bar.height the height of the bar
 * @yield {number} bar.yOffset the distance from the top of the SVG to the top of the bar
 * @yield {number} bar.width width of the bar, in pixels
 */
export default class BarChartBarComponent extends Component {
  tagName = "";

  @computed("y")
  get yOffset() {
    return this.y || 0;
  }

  @computed("barWidth")
  get width() {
    return this.barWidth || 0;
  }

  @computed("value", "maxValue")
  get widthDecimal() {
    if (this.maxValue == 0) {
      return 0;
    }

    return this.value / this.maxValue;
  }

  @computed("widthDecimal")
  get widthPercentage() {
    return `${this.widthDecimal * 100}%`;
  }

  @action updatePosition(resizeObserverEntries) {
    for (const entry of resizeObserverEntries) {
      this.set("barWidth", entry.contentRect.width);
    }
  }
}
