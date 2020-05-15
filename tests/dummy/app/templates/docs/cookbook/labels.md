# Labels

While `<BarChart />` does not provide any specific API for labelling your graph bars, all of the state required to do so is yielded from the components for you to build this yourself.

The addon provides a helper component called `<MeasuredTextGroup />` that can be useful when creating labels in your graphs. It yields a `<Text />` component that reports back the size of element as state that is also yielded from the `<MeasuredTextGroup />`. This way, you can dynamically calculate the positioning of labels and padding on the chart itself to get the location of your labels correct, no matter what!

## Left-Hand-Side

The following shows how you might configure some labels on the left-hand-side of your bars. It's a little complicated, but we'll break it down:

<Cookbook::Labels::Left />

To start, we render out a `<MeasuredTextGroup />` that we will use to actually render the `<text />` labels within the chart. This will calculate their size and provide it as a property that we can use later on.

Next, we define a local variable, `textSpacing`, based on a little calculation on the maximum size of the rendered text labels. It's helpful to create a variable for this in the template since we need the value in a number of places. For the `add` (and later, `sub`) implementation, we are using [`ember-math-helpers`](https://github.com/shipshapecode/ember-math-helpers).

The next interesting bit is the `style` definition, which uses our `textSpacing` to dynamically calculate the amount of padding on the left of the chart. This is important to give the text a place to appear next to the chart's bars. Note that it's important that the `<BarChart />` component has the `overflow: visible` CSS property on it.

When we actually render our labels, we use the yielded `<textGroup.Text />` component. This is a wrapper around the SVG `<text>` element, but also reports the size of the rendered element back to the `textGroup` in order to calculate the `textGroup.maxSize` property that we use elsewhere. We set a few attributes on the component in order to get it in the right position:

- We set a `y` value based on `bar.yOffset`, which tells us where, top to bottom, the corresponding bar is rendered
- A negative `dx` value based on `textSpacing` is used to re-align the text back at the "start" of the graph, since the `padding-left` value we set earlier has pushed the content over.
- A `dy` allows us to fine-tune the position of the text to make sure it visually appears in the right place.

While this code is quite verbose, it also gives you _complete_ control over how your chart is rendered, providing you the tools to build the experience you want rather than having opinions of it's own. Additionally, rather than you needing to come up with some values by hand that are hard-coded to provide the right amount of space for the text, everything is dynamically calculated and positioned based on the _actual_ size of the labels, making your UI much more resilient to changes in the future.

## Right-Hand-Side

Rendering labels on the right of each bar is very similar

<Cookbook::Labels::Right />

To call out the few differences:

- `padding-right` is set on the chart rather than `padding-left`. No template variable is necessary, since the size of the text is only used once
- Rather than setting the `dx` attribute based on text size, we set the `x` attribute based on the width of the bar itself
