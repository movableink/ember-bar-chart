# Labels

While `<BarChart />` does not provide any specific API for labelling your graph bars, all of the state required to do so is yielded from the components for you to build this yourself.

## Left-Hand-Side

To position labels to the "right" of your bars, the yielded `bar.yOffset` property can be helpful to get the `<text>` element into the correct position.

Since the bars will want to fill the entire width of the outer `<BarChart />` component, you can use padding on the left of the component to make a space for the labels to appear.

<Cookbook::Labels::Left />

## Right-Hand-Side

To position labels to the "right" of your bars, the yielded `bar.yOffset` and `bar.width` properties can be helpful to get the `<text>` element into the correct position.

Since the bars will want to fill the entire width of the outer `<BarChart />` component, you can use padding on the right of the component to make a space for the labels to appear.

<Cookbook::Labels::Right />
