import Component from "@ember/component";
import { action, computed } from "@ember/object";
import layout from "../templates/components/measured-text-group";

export default class MeasuredTextGroupComponent extends Component {
  tagName = "";
  layout = layout;

  /** @type {Map<SVGTextElement, number>} */
  sizeMap = new Map();

  @computed("sizeMap")
  get maxSize() {
    return [...this.sizeMap.values()].reduce((acc, next) => {
      return Math.max(acc, next);
    }, 0);
  }

  /**
   * @param {SVGTextElement} element
   * @param {number} size
   */
  @action recieveTextSize(element, size) {
    this.sizeMap.set(element, size);
    this.notifyPropertyChange("sizeMap");
  }

  @action handleTextDestroy(element) {
    this.sizeMap.delete(element);
    this.notifyPropertyChange("sizeMap");
  }
}
