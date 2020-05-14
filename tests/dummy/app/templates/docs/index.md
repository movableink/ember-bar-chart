# Getting Started

To get things started, you'll want to install the addon like so:

```bash
yarn add @movable/ember-bar-chart
```

This will make the `<BarChart />` component available in your application.

A `<BarChart />` can most simply be rendered using the yielded `<Bar />` component. You can set some basic state on the component as well, like the height of each bar and the amount of space between them. This is configured at the `<BarChart />` level so that the vertical position of the bars can be laid out without manual calculation on your part.

Since the width of each bar is relative to the entire `<BarChart />` component, you'll want to make sure that the `<BarChart />` has some sort of explicit width (either through the `width` attribute, a CSS class, or some kind of layout mechanic like CSS Grid).

<GettingStarted::Basic />
