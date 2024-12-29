(() => {
  // node_modules/@jrc03c/vue-component-with-css/dist/vue-component-with-css.import.mjs
  function createVueComponentWithCSS(component) {
    let count = 0;
    let styleElement;
    component = component || {};
    const data = component.data ? component.data : function() {
    };
    const mounted = component.mounted ? component.mounted : function() {
    };
    const unmounted = component.unmounted ? component.unmounted : function() {
    };
    if (!data.css)
      data.css = "";
    component.data = function() {
      return data.bind(this)();
    };
    component.mounted = function() {
      mounted.bind(this)();
      count++;
      let root = this.$root.$el.getRootNode();
      if (root === document) {
        root = root.body;
      }
      if (!styleElement) {
        styleElement = document.createElement("style");
        root.appendChild(styleElement);
        styleElement.innerHTML = this.css;
      }
    };
    component.unmounted = function() {
      unmounted.bind(this)();
      count--;
      let root = this.$root.$el.getRootNode();
      if (root === document) {
        root = root.body;
      }
      if (count < 1) {
        if (styleElement) {
          try {
            root.removeChild(styleElement);
          } catch (e) {
            try {
              styleElement.parentElement.removeChild(styleElement);
            } catch (e2) {
            }
          }
        }
        styleElement = null;
      }
    };
    return component;
  }
  if (typeof window !== "undefined") {
    window.createVueComponentWithCSS = createVueComponentWithCSS;
  }

  // res/js/src/lib/elements/block.mjs
  var css = (
    /* css */
    ``
  );
  var template = (
    /* html */
    `
  <div class="block bulma-block">
    <slot></slot>
  </div>
`
  );
  var BulmaBlock = createVueComponentWithCSS({
    name: "bulma-block",
    template,
    data() {
      return {
        css
      };
    }
  });

  // res/js/src/lib/elements/box.mjs
  var css2 = (
    /* css */
    ``
  );
  var template2 = (
    /* html */
    `
  <div class="box bulma-box">
    <slot></slot>
  </div>
`
  );
  var BulmaBox = createVueComponentWithCSS({
    name: "bulma-box",
    template: template2,
    data() {
      return {
        css: css2
      };
    }
  });

  // res/js/src/lib/elements/button.mjs
  var css3 = (
    /* css */
    ``
  );
  var template3 = (
    /* html */
    `
  <button
    :class="{
      'is-black': black,
      'is-danger': danger,
      'is-dark': dark,
      'is-ghost': ghost,
      'is-info': info,
      'is-light': light,
      'is-link': link,
      'is-primary': primary,
      'is-success': success,
      'is-text': text,
      'is-warning': warning,
      'white': white,
    }"
    class="bulma-button button">
    <slot></slot>
  </button>
`
  );
  var BulmaButton = createVueComponentWithCSS({
    name: "bulma-button",
    template: template3,
    props: {
      black: { type: Boolean, required: false, default: () => false },
      danger: { type: Boolean, required: false, default: () => false },
      dark: { type: Boolean, required: false, default: () => false },
      ghost: { type: Boolean, required: false, default: () => false },
      info: { type: Boolean, required: false, default: () => false },
      light: { type: Boolean, required: false, default: () => false },
      link: { type: Boolean, required: false, default: () => false },
      primary: { type: Boolean, required: false, default: () => false },
      success: { type: Boolean, required: false, default: () => false },
      text: { type: Boolean, required: false, default: () => false },
      warning: { type: Boolean, required: false, default: () => false },
      white: { type: Boolean, required: false, default: () => false }
    },
    data() {
      return {
        css: css3
      };
    }
  });

  // res/js/src/lib/elements/delete.mjs
  var css4 = (
    /* css */
    ``
  );
  var template4 = (
    /* html */
    `
  <button class="bulma-delete delete"></button>
`
  );
  var BulmaDelete = createVueComponentWithCSS({
    name: "bulma-delete",
    template: template4,
    data() {
      return {
        css: css4
      };
    }
  });

  // res/js/src/lib/elements/icon.mjs
  var css5 = (
    /* css */
    ``
  );
  var template5 = (
    /* html */
    `
  <span class="bulma-icon icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`
  );
  var BulmaIcon = createVueComponentWithCSS({
    name: "bulma-icon",
    template: template5,
    props: {
      name: {
        type: String,
        required: true,
        default: () => "exclamation-circle"
      }
    },
    data() {
      return {
        css: css5,
        observer: null
      };
    },
    methods: {
      updateInnerClasses() {
        const classes = Array.from(this.$el.classList);
        if (classes.includes("is-medium")) {
          this.$refs.inner.classList.add("la-lg");
        } else {
          this.$refs.inner.classList.remove("la-lg");
        }
        if (classes.includes("is-large")) {
          this.$refs.inner.classList.add("la-2x");
        } else {
          this.$refs.inner.classList.remove("la-2x");
        }
      }
    },
    mounted() {
      this.observer = new MutationObserver((mutations) => {
        if (!this.$refs.inner) {
          return;
        }
        for (const mutation of mutations) {
          if (mutation.attributeName === "class") {
            this.updateInnerClasses();
            return;
          }
        }
      });
      this.observer.observe(this.$el, {
        attributes: true,
        attributeFilter: ["class"]
      });
      this.$nextTick(() => this.updateInnerClasses());
    },
    unmounted() {
      this.observer.disconnect();
    }
  });

  // res/js/src/lib/elements/image.mjs
  var css6 = (
    /* css */
    ``
  );
  var template6 = (
    /* html */
    `
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`
  );
  var BulmaImage = createVueComponentWithCSS({
    name: "bulma-image",
    template: template6,
    props: {
      src: {
        type: String,
        required: false,
        default: () => ""
      }
    },
    data() {
      return {
        css: css6
      };
    }
  });

  // res/js/src/lib/elements/notification.mjs
  var css7 = (
    /* css */
    ``
  );
  var template7 = (
    /* html */
    `
  <div class="bulma-notification notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`
  );
  var BulmaNotification = createVueComponentWithCSS({
    name: "bulma-notification",
    emits: ["close"],
    components: {
      "bulma-delete": BulmaDelete
    },
    template: template7,
    props: {
      permanent: {
        type: Boolean,
        required: false,
        default: () => false
      }
    },
    data() {
      return {
        css: css7
      };
    }
  });

  // res/js/src/lib/elements/progress.mjs
  var css8 = (
    /* css */
    ``
  );
  var template8 = (
    /* html */
    `
  <progress :value="value" class="bulma-progress progress" max="1">
    {{ value * 100 }}%
  </progress>
`
  );
  var BulmaProgress = createVueComponentWithCSS({
    name: "bulma-progress",
    template: template8,
    props: {
      value: {
        type: Number,
        required: false,
        default: () => 0
      }
    },
    data() {
      return {
        css: css8
      };
    }
  });

  // res/js/src/lib/helpers.mjs
  function range(a, b) {
    const out = [];
    for (let i = a; i < b; i++) {
      out.push(i);
    }
    return out;
  }

  // res/js/src/lib/elements/table.mjs
  var css9 = (
    /* css */
    ``
  );
  var template9 = (
    /* html */
    `
  <table class="bulma-table table" v-if="values && values.length > 0">
    <thead v-if="columns && columns.length > 0">
      <tr>
        <th v-if="index && index.length > 0"></th>

        <th :key="j" v-for="j in range(0, columns.length)">
          <b>{{ columns[j] }}</b>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr :key="i" v-for="i in range(0, values.length)">
        <td v-if="index && index.length > 0">
          <b>{{ index[i] }}</b>
        </td>

        <td :key="j" v-for="j in range(0, values[i].length)">
          {{ values[i][j] }}
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table" v-else>
    <slot></slot>
  </table>
`
  );
  var BulmaTable = createVueComponentWithCSS({
    name: "bulma-table",
    template: template9,
    props: {
      columns: {
        type: Array,
        required: false,
        default: () => []
      },
      index: {
        type: Array,
        required: false,
        default: () => []
      },
      values: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    data() {
      return {
        css: css9
      };
    },
    methods: {
      range
    }
  });

  // res/js/src/lib/elements/tags.mjs
  var css10 = (
    /* css */
    `
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`
  );
  var template10 = (
    /* html */
    `
  <div class="bulma-tags field is-grouped is-grouped-multiline">
    <div :key="i" class="control" v-for="i in range(0, tags.length)">
      <div class="tags has-addons">
        <!-- string tag, clickable -->
        <a
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !!tags[i].click">
          {{ tags[i] }}
        </a>

        <!-- string tag, not clickable -->
        <span
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !tags[i].click">
          {{ tags[i] }}
        </span>

        <!-- object tag with classes, clickable -->
        <a
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="!!tags[i].name && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </a>

        <!-- object tag with classes, not clickable -->
        <span
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          class="bulma-tag tag"
          v-if="!!tags[i].name && !tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </span>

        <!-- object tag with multiple names and classes, clickable -->
        <a
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </a>

        <!-- object tag with multiple names and classes, not clickable -->
        <span
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </span>

        <a
          :class="getDeleteClass(tags[i])"
          @click="$emit('delete', tags[i])"
          class="bulma-tag is-delete tag"
          v-if="!!tags[i].delete">
        </a>
      </div>
    </div>
  </div>
`
  );
  var BulmaTags = createVueComponentWithCSS({
    name: "bulma-tags",
    emits: ["click", "delete"],
    components: {
      "bulma-icon": BulmaIcon
    },
    template: template10,
    props: {
      tags: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        css: css10
      };
    },
    methods: {
      getDeleteClass(tag) {
        if (tag.classes && tag.classes.length > 0) {
          const colorClasses = [
            "is-danger",
            "is-warning",
            "is-success",
            "is-primary",
            "is-info",
            "is-link",
            "is-dark"
          ];
          const classes = tag.classes.filter((c) => colorClasses.includes(c));
          if (classes.length > 0) {
            const lastColorClass = classes.at(-1);
            return { [lastColorClass]: true, "is-light": true };
          } else {
            return {};
          }
        } else {
          return {};
        }
      },
      range
    }
  });
})();
