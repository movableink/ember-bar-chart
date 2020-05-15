import Component from "@ember/component";
import { action } from "@ember/object";
import layout from "../../templates/components/measured-text-group/text";

export default class BarChartMeasuredText extends Component {
  tagName = "";
  layout = layout;

  @action setRef(element) {
    this.ref = element;
  }

  @action handleResize(entries) {
    let size = 0;

    for (const entry of entries) {
      size = Math.max(size, entry.target.getBBox().width);
    }

    this.reportSize(this.ref, size);
  }
}
