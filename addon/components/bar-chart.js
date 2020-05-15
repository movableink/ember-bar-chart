import Component from "@ember/component";
import { action, computed } from "@ember/object";
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

  /** @type {Map<SVGGElement, number>} **/
  valueMap = new Map();

  /** @type {Set<SVGRectElement>} **/
  indexSet = new Set();

  @computed("barGap")
  get gap() {
    return this.barGap || 0;
  }

  @computed("valueMap")
  get maxValue() {
    return [...this.valueMap.values()].reduce((largest, next) => {
      return largest > next ? largest : next;
    }, 0);
  }

  @computed("indexSet.size")
  get barCount() {
    return this.indexSet.size;
  }

  @computed("barCount", "barHeight", "gap", "gapHeight")
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
    this.notifyPropertyChange("indexSet");

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
    this.notifyPropertyChange("valueMap");
  }

  /**
   * @param {SVGGElement} barElement
   */
  @action handleDestroyedBar(barElement) {
    this.valueMap.delete(barElement);
    this.notifyPropertyChange("valueMap");
  }

  /**
   * @param {SVGRectElement} rectElement
   */
  @action handleDestroyedRect(rectElement) {
    this.indexSet.delete(rectElement);
    this.notifyPropertyChange("indexSet");
  }
}
