import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | measured-text-group", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders information about the text size", async function (assert) {
    await render(hbs`
      <svg>
        <MeasuredTextGroup as |group|>
          <group.Text>Foo</group.Text>
          <group.Text>Something much longer than Foo</group.Text>

          <text data-test-size>{{group.maxSize}}</text>
        </MeasuredTextGroup>
      </svg>
    `);

    await assert.waitFor(() => {
      assert
        .dom("[data-test-size]")
        .hasTextContaining("226", "Reports the size of the rendered text");
    });
  });
});
