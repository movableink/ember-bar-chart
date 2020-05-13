import Component from "@ember/component";
import { action } from "@ember/object";
import { TrackedMap } from "tracked-maps-and-sets";

export default class BarChartComponent extends Component {
  tagName = "";

  /** @prop {TrackedMap<SVGGElement, number>} **/
  valueMap = new TrackedMap();

  /** @prop {TrackedMap<SVGRectElement, number>} **/
  indexMap = new TrackedMap();

  get gap() {
    return this.barGap || 0;
  }

  get maxValue() {
    return [...this.valueMap.values()].reduce((largest, next) => {
      return largest > next ? largest : next;
    }, 0);
  }

  get barCount() {
    return this.indexMap.size;
  }

  /**
   * @param {import('./bar-chart/bar').default} barComponent
   * @param {SVGRectElement} rectElement
   */
  @action setBarPosition(barComponent, rectElement) {
    const index = this.barCount;
    this.indexMap.set(rectElement, index);

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