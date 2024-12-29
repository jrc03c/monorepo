// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4
    class="block has-text-grey has-text-weight-bold is-size-4"
    id="table">
    Table

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/table/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <bulma-table
      :columns="sampleData.columns"
      :values="sampleData.values"
      class="is-fullwidth is-striped">
    </bulma-table>
  </bulma-block>

  <bulma-block>
    The <code>&lt;bulma-table&gt;</code> element can either be filled with slotted content or passed a two-dimensional array of values via a <code>values</code> attribute. If the <code>values</code> attribute is used, then attributes called <code>columns</code> and <code>index</code> may also be used. They both represent, respectively, the column and row names of the data in <code>values</code>. In the example above, both the <code>values</code> and <code>columns</code> attributes were used, but the <code>index</code> attribute was not.
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon, BulmaTable } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const TableView = createVueComponentWithCSS({
  name: "x-table-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
    "bulma-table": BulmaTable,
  },

  template,

  data() {
    return {
      css,
      sampleData: {
        columns: ["Pos", "Team", "Pld", "W", "D", "L", "GF", "GA", "GD", "Pts"],
        index: [],
        values: [
          [1, "Leicester City (C) ", 38, 23, 12, 3, 68, 36, 32, 81],
          [2, "Arsenal ", 38, 20, 11, 7, 65, 36, 29, 71],
          [3, "Tottenham Hotspur ", 38, 19, 13, 6, 69, 35, 34, 70],
          [4, "Manchester City ", 38, 19, 9, 10, 71, 41, 30, 66],
          [5, "Manchester United ", 38, 19, 9, 10, 49, 35, 14, 66],
          [6, "Southampton ", 38, 18, 9, 11, 59, 41, 18, 63],
          [7, "West Ham United ", 38, 16, 14, 8, 65, 51, 14, 62],
          [8, "Liverpool ", 38, 16, 12, 10, 63, 50, 13, 60],
          [9, "Stoke City ", 38, 14, 9, 15, 41, 55, NaN, 51],
          [10, "Chelsea ", 38, 12, 14, 12, 59, 53, 6, 50],
          [11, "Everton ", 38, 11, 14, 13, 59, 55, 4, 47],
          [12, "Swansea City ", 38, 12, 11, 15, 42, 52, NaN, 47],
          [13, "Watford ", 38, 12, 9, 17, 40, 50, NaN, 45],
          [14, "West Bromwich Albion ", 38, 10, 13, 15, 34, 48, NaN, 43],
          [15, "Crystal Palace ", 38, 11, 9, 18, 39, 51, NaN, 42],
          [16, "AFC Bournemouth ", 38, 11, 9, 18, 45, 67, NaN, 42],
          [17, "Sunderland ", 38, 9, 12, 17, 48, 62, NaN, 39],
          [18, "Newcastle United (R) ", 38, 9, 10, 19, 44, 65, NaN, 37],
          [19, "Norwich City (R) ", 38, 9, 7, 22, 39, 67, NaN, 34],
          [20, "Aston Villa (R) ", 38, 3, 8, 27, 27, 76, NaN, 17],
        ],
      },
    }
  },
})

export { TableView }
