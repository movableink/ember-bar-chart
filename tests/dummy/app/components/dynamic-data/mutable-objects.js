// BEGIN-SNIPPET dynamic-data-mutable-objects.js
import Component from "@ember/component";
import { action, set } from "@ember/object";

export default class DynamicDataMutableObjects extends Component {
  tagName = "";

  bars = [{ value: 100 }, { value: 50 }, { value: 70 }];

  @action updateBar(updatedIndex, inputEvent) {
    const newValue = parseInt(inputEvent.target.value, 10);

    set(this.bars[updatedIndex], "value", newValue);

    this.set("bars", this.bars);
  }
}
// END-SNIPPET
