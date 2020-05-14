import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import percySnapshot from "@percy/ember";

module("Integration | Component | bar-chart", function (hooks) {
  setupRenderingTest(hooks);

  test("can declaratively render simple bars", async function (assert) {
    await render(hbs`
      <BarChart @barHeight={{10}} @barGap={{10}} width="500" as |chart|>
        <chart.Bar @value={{100}} data-test-bar="0" />
        <chart.Bar @value={{50}} data-test-bar="1" />
        <chart.Bar @value={{70}} data-test-bar="2" />
      </BarChart>
    `);

    await percySnapshot(assert);

    assert.dom("g rect").exists({ count: 3 }, "Renders 3 bar components");

    await assert.waitFor(() => {
      assert
        .dom("[data-test-bar='0'] rect")
        .hasAttribute(
          "width",
          "100%",
          "Calculated the correct width for the first bar"
        );
      assert
        .dom("[data-test-bar='1'] rect")
        .hasAttribute(
          "width",
          "50%",
          "Calculated the correct width for the second bar"
        );
      assert
        .dom("[data-test-bar='2'] rect")
        .hasAttribute(
          "width",
          "70%",
          "Calculated the correct width for the third bar"
        );
      assert
        .dom("svg")
        .hasStyle(
          { height: "50px" },
          "Sets a `height` attribute on the chart element"
        );
    });
  });

  test("can render the `rect` explicitly", async function (assert) {
    await render(hbs`
      <BarChart @barHeight={{10}} width="500" as |chart|>
        <chart.Bar @value={{50}} as |bar|>
          <bar.Rect data-test-rect width="100%" />
        </chart.Bar>
      </BarChart>
    `);

    await percySnapshot(assert);

    assert.dom("g rect").exists("Renders a `rect` inside a `g`");
    assert.dom("[data-test-rect]").exists("Can set attributes on the `rect`");
    assert
      .dom("[data-test-rect]")
      .hasAttribute(
        "width",
        "100%",
        "Can override the default attribute values"
      );
  });

  test("can render text before the bar", async function (assert) {
    await render(hbs`
      <style>
        .box {
          box-sizing: border-box;
        }
        .overflow-visible {
          overflow: visible;
        }
        .pt-10 {
          padding-top: 10px;
        }
        .pl-80 {
          padding-left: 80px;
        }
      </style>
      <BarChart @barHeight={{10}} @barGap={{10}} width="500" class="box overflow-visible pt-10 pl-80" as |chart|>
        <chart.Bar @value={{80}} as |bar|>
          <bar.Rect />
          <text y={{bar.yOffset}} dx="-80px" dy="0.6em">First Bar</text>
        </chart.Bar>

        <chart.Bar @value={{50}} as |bar|>
          <bar.Rect />
          <text y={{bar.yOffset}} dx="-80px" dy="0.6em">Second Bar</text>
        </chart.Bar>
      </BarChart>
    `);

    await percySnapshot(assert);

    assert.dom("text").exists({ count: 2 });
  });

  test("can render text after the bar", async function (assert) {
    await render(hbs`
      <style>
        .box {
          box-sizing: border-box;
        }
        .overflow-visible {
          overflow: visible;
        }
        .pt-10 {
          padding-top: 10px;
        }
        .pr-80 {
          padding-right: 80px;
        }
      </style>
      <BarChart @barHeight={{10}} @barGap={{10}} width="500" class="box overflow-visible pt-10 pr-80" as |chart|>
        <chart.Bar @value={{80}} as |bar|>
          <bar.Rect />
          <text y={{bar.yOffset}} x={{bar.width}} dx="10px" dy="0.6em">First Bar</text>
        </chart.Bar>

        <chart.Bar @value={{50}} as |bar|>
          <bar.Rect />
          <text y={{bar.yOffset}} x={{bar.width}} dx="10px" dy="0.6em">Second Bar</text>
        </chart.Bar>
      </BarChart>
    `);

    await percySnapshot(assert);

    assert.dom("text").exists({ count: 2 });
  });
});
