// BEGIN-SNIPPET dynamic-data-immutable.js
import Component from "@ember/component";
import { action } from "@ember/object";

export default class DynamicDataImmutableObjectsComponent extends Component {
  tagName = "";

  bars = [
    { id: 1, value: 100 },
    { id: 2, value: 50 },
    { id: 3, value: 70 },
  ];

  @action updateBar(updatedIndex, inputEvent) {
    const newValue = parseInt(inputEvent.target.value, 10);

    this.set(
      "bars",
      this.bars.map((item, index) => {
        if (updatedIndex === index) {
          return { id: item.id, value: newValue };
        } else {
          return item;
        }
      })
    );
  }
}
// END-SNIPPET
