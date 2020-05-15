# Dynamic Data

The `<BarChart />` component is fully capable of handling dynamically changing data sets, under the right conditions.

Trouble arises when every change to your data source directly causes all of your bars to be removed and re-inserted into the DOM. There are a few ways to avoid this:

## 1. Use Mutable Data

One approach is to mutate your data, rather than producing a new array of items on every change:

<DynamicData::MutableObjects />

Notice how, rather than creating a new `bars` array, we update the existing one and then tell Ember about that change through `.set`. This ensures that Ember treats changes to the data as an updates, rather than a creation and deletion.

## 2. Explicit `key` in Iteration

If your data is immutable, things are a little more tricky. By default, each iteration of the loop uses the identity of the object to determine if a change should be handled as an update or a creation + deletion. The default behavior would have _every_ change completely destroy and re-create your DOM nodes. This is bad for performance and your user experience! Notice what happens here when you try to drag the sliders around. On top of that, the order of inserts and deletes are not easily handled by our `<BarChart />` component, and the bars do not update correctly.

<DynamicData::ImmutableWithoutKey />

Because every DOM node is completely torn down on each iteration, the sliders barely work; the node is destroyed right from under the user's cursor.

We can solve this by providing an explicit `key` to the `{{each}}` iteration, which helps Ember understand what is "new" vs "updated" in cases where the identify of the object has changed. This makes it possible to re-use and update DOM nodes, rather than re-create them, on every change -- even if our data is completely new.

<DynamicData::ImmutableWithKey />
