import Component from "@ember/component";
import { action, computed } from "@ember/object";

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
