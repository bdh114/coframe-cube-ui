<template>
  <div :style="style"></div>
</template>

<script>
var debounce = require('lodash.debounce')
var monacoLoader = require('./MonacoLoader')

module.exports = {
  props: {
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '100%' },
    code: { type: String, default: '' },
    originalCode: { type: String, default: '' },
    modifiedCode: { type: String, default: '' },
    mode: { type: String, default: 'normal' },
    srcPath: { type: String, default: 'static/monaco-editor' },
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'vs-dark' }, // vs, hc-black
    options: {
      type: Object,
      default: () => {},
    },
    highlighted: {
      type: Array,
      default: () => [
        {
          number: 0,
          class: '',
        },
      ],
    },
    changeThrottle: { type: Number, default: 0 },
  },
  mounted() {
    this.fetchEditor()
  },
  destroyed() {
    this.destroyMonaco()
  },
  computed: {
    style() {
      const { width, height } = this
      const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`
      const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`
      return {
        width: fixedWidth,
        height: fixedHeight,
      }
    },
    editorOptions() {
      return Object.assign({}, this.defaults, this.options, {
        value: this.code,
        language: this.language,
        theme: this.theme,
        defaultEOL: 0,
      })
    },
  },
  data() {
    return {
      defaults: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: false,
        glyphMargin: true,
      },
    }
  },
  watch: {
    highlighted: {
      handler(lines) {
        this.highlightLines(lines)
      },
      deep: true,
    },
    modifiedCode(val) {
      this.editor.getModifiedEditor().setValue(val)
    },
    originalCode(val) {
      this.editor.getOriginalEditor().setValue(val)
    },
  },
  methods: {
    highlightLines(lines) {
      if (!this.editor) {
        return
      }
      lines.forEach(line => {
        const className = line.class
        const highlighted = this.$el.querySelector(`.${className}`)

        if (highlighted) {
          highlighted.classList.remove(className)
        }

        const number = parseInt(line.number)
        if ((!this.editor && number < 1) || isNaN(number)) {
          return
        }

        const selectedLine = this.$el.querySelector(`.view-lines [linenumber="${number}"]`)
        if (selectedLine) {
          selectedLine.classList.add(className)
        }
      })
    },
    editorHasLoaded(editor, monaco) {
      this.editor = editor
      this.monaco = monaco
      this.editor.onDidChangeModelContent(event => this.codeChangeHandler(editor, event))
      this.$emit('mounted', editor)
    },
    codeChangeHandler: function(editor) {
      if (this.codeChangeEmitter) {
        this.codeChangeEmitter(editor)
      } else {
        this.codeChangeEmitter = debounce(function(editor) {
          this.$emit('codeChange', editor)
        }, this.changeThrottle)
        this.codeChangeEmitter(editor)
      }
    },
    fetchEditor() {
      monacoLoader.load(this.srcPath, this.createMonaco)
    },
    createModel(code) {
      return window.monaco.editor.createModel(code)
    },

    getEditor() {
      return this.editor
    },

    createMonaco() {
      if (this.mode === 'diff') {
        this.editor = window.monaco.editor.createDiffEditor(this.$el, this.editorOptions)
        this.editor.setModel({
          original: this.createModel(this.originalCode),
          modified: this.createModel(this.modifiedCode),
        })
      } else if (this.mode === 'normal') {
        this.editor = window.monaco.editor.create(this.$el, this.editorOptions)
        //        const textModel = this.createModel(this.code)
        //        textModel._EOL = '\n'
        //        textModel._options.defaultEOL = 0
        //        this.editor.setModel(textModel)
      }

      this.editorHasLoaded(this.editor, window.monaco)
    },
    destroyMonaco() {
      if (typeof this.editor !== 'undefined') {
        this.editor.dispose()
      }
    },
  },
}
</script>
