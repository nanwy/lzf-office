<template>
  <div class="input" :style="{ width: widthClass }">
    <input
      required
      :tabindex="tabindex"
      v-if="type !== 'textarea'"
      class="el-input__inner"
      v-bind="$attrs"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      ref="input"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordVisible: false,
    };
  },
  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: "text",
    },
    autosize: {
      type: [Boolean, Object],
      default: false,
    },
    autocomplete: {
      type: String,
      default: "off",
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== "production" &&
          console.warn(
            "[Element Warn][Input]'auto-complete' property will be deprecated in next major version. please use 'autocomplete' instead."
          );
        return true;
      },
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    tabindex: String,
    width: Number,
  },
  computed: {
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
    widthClass() {
      return this.width + "%";
    },
  },
  watch: {
    value(val) {
      console.log(val);
      // this.$nextTick(this.resizeTextarea);
      // if (this.validateEvent) {
      //   this.dispatch('ElFormItem', 'el.form.change', [val]);
      // }
    },
  },
  methods: {
    handleFocus(event) {
      this.focused = true;
      this.$emit("focus", event);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || "";
      // this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (this.isComposing) return;
      console.log(this.value);
      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (event.target.value === this.nativeInputValue) return;

      this.$emit("input", event.target.value);

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      // if (this.validateEvent) {
      //   this.dispatch("ElFormItem", "el.form.blur", [this.value]);
      // }
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      console.log(input.value);
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
  },
};
</script>

<style lang='scss' scoped>
.input {
  position: relative;
  margin-top: 15px;
  input:focus ~ .from::before,
  input:valid ~ .from::before {
    top: -18px;
    font-size: 12px;
    left: 0;
    color: #03a9f4;
  }
  input:focus ~ .from::after,
  input:valid ~ .from::after {
    width: 100%;
  }
  span::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 2px;
    transition: all 0.3s;
    background: linear-gradient(120deg, #3498db, #8e44ad);
  }
  .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: none;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 0;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    position: relative;
  }
}
</style>