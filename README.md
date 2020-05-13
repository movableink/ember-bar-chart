# @movable/ember-bar-chart

A simple, declarative Ember component for rendering SVG bar charts.

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install @movable/ember-bar-chart
```

## Usage

This addon provides a `BarChart` component for rendering a horizontal bar chart.

```handlebars
<BarChart as |chart|>
  <chart.Bar @value={{100}} />
  <chart.Bar @value={{50}} />
  <chart.Bar @value={{70}} />
</BarChart>
```

The longest bar will fill the entire width of the chart. All others are given a width based on their `@value` relative to the longest bar.

For more complex use-cases, see the documentation site.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
