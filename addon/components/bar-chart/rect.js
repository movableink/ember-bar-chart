import Component from "@ember/component";

export default class BarChartRectComponent extends Component {
  tagName = "";

  mutationObserverInit = {
    attributes: true,
    attributeFilter: ["width"],
  };
}
