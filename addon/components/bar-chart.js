import Component from "@ember/component";
import { action } from "@ember/object";
import { TrackedMap, TrackedSet } from "tracked-maps-and-sets";
import layout from "../templates/components/bar-chart";

/**
 * Render a Bar Chart through an SVG
 *
 * ```hbs
 * <BarChart @barHeight={{10}} @barGap={{10}} as |chart|>
 *   <chart.Bar @value={{100}} />
 *   <chart.Bar @value={{50}} />
 *   <chart.Bar @value={{70}} />
 * </BarChart>
 * ```
 *
 * Attributes or modifiers on the component as passed directly to the `svg` element
 *
 * @class BarChartComponent
 * @arg {number} barHeight
 * @yield {Hash} chart
 * @yield {BarChartBarComponent} chart.Bar the `bar-chart/bar` component
 */
export default class BarChartComponent extends Component {
  tagName = "";
  layout = layout;

  /** @prop {TrackedMap<SVGGElement, number>} **/
  valueMap = new TrackedMap();

  /** @prop {TrackedMap<SVGRectElement>} **/
  indexSet = new TrackedSet();

  get gap() {
    return this.barGap || 0;
  }

  get maxValue() {
    return [...this.valueMap.values()].reduce((largest, next) => {
      return largest > next ? largest : next;
    }, 0);
  }

  get barCount() {
    return this.indexSet.size;
  }

  get height() {
    const barHeight = this.barCount * this.barHeight;
    const gapHeight = Math.max(this.barCount - 1, 0) * this.gap;

    return barHeight + gapHeight;
  }

  /**
   * @param {import('./bar-chart/bar').default} barComponent
   * @param {SVGRectElement} rectElement
   */
  @action setBarPosition(barComponent, rectElement) {
    const index = this.barCount;
    this.indexSet.add(rectElement);

    const yOffset = index * this.barHeight + index * this.gap;
    barComponent.set("y", yOffset);
    rectElement.setAttribute("y", yOffset);
  }

  /**
   * @param {number} value
   * @param {SVGGElement} element
   */
  @action receiveValue(value, element) {
    this.valueMap.set(element, value);
  }
}
