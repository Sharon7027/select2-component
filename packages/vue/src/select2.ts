import Vue from 'vue'
import Component from 'vue-class-component'
import * as common from 'select2-component'
export * from 'select2-component'
import { select2TemplateHtml, select2TemplateHtmlStatic } from './variables'

@Component({
  render: select2TemplateHtml,
  staticRenderFns: select2TemplateHtmlStatic,
  props: ['data', 'value', 'disabled', 'minCountForSearch', 'placeholder', 'customSearchEnabled', 'multiple', 'minimumInputLength', 'maximumInputLength', 'keepSearchText']
})
export class Select2 extends Vue {
  data!: common.Select2Data
  value?: common.Select2UpdateValue
  disabled?: boolean
  minCountForSearch?: number
  placeholder?: string
  customSearchEnabled?: boolean
  multiple?: boolean
  minimumInputLength?: number
  maximumInputLength?: number
  keepSearchText?: boolean

  option: common.Select2Option | common.Select2Option[] | null = null
  private hoveringValue?: common.Select2Value | null = null
  private isOpen = false
  private focusoutTimer?: NodeJS.Timer
  private innerSearchText = ''
  private lastScrollTopIndex = 0
  private searchInputElement!: HTMLElement
  private resultsElement!: HTMLElement

  get searchText() {
    return this.innerSearchText
  }
  set searchText(text: string) {
    if (this.customSearchEnabled) {
      this.$emit('search', text)
    }
    this.innerSearchText = text
  }

  get dropdownStyle() {
    return common.getDropdownStyle(this.isOpen)
  }

  get filteredData() {
    const result = this.customSearchEnabled
      || (this.minimumInputLength && this.minimumInputLength > this.searchText.length)
      ? this.data
      : common.getFilteredData(this.data, this.searchText)

    if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
      this.hoveringValue = common.getFirstAvailableOption(result)

      if (this.resultsElement) {
        const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex)
        if (lastScrollTopIndex !== null) {
          this.lastScrollTopIndex = lastScrollTopIndex
        }
      }
    }
    return result
  }

  get containerStyle() {
    return common.getContainerStyle(this.disabled, this.isOpen)
  }

  get selectionStyle() {
    return common.getSelectionStyle(this.multiple)
  }

  private get isSearchboxHidden() {
    return this.customSearchEnabled
      ? false
      : common.isSearchboxHiddex(this.data, this.minCountForSearch)
  }

  private get searchStyle() {
    return common.getSearchStyle(this.isSearchboxHidden)
  }

  beforeMount() {
    const option = common.getOptionsByValue(this.data, this.value, this.multiple)
    if (option !== null) {
      this.option = option
    }
    if (!Array.isArray(option)) {
      this.hoveringValue = this.value as string | undefined
    }
  }

  mounted() {
    this.searchInputElement = this.$refs.searchInput as HTMLElement
    this.resultsElement = this.$refs.results as HTMLElement
  }

  beforeDestroy() {
    this.cancelFocusoutTimer()
  }

  getOptionStyle(option: common.Select2Option) {
    return common.getOptionStyle(option, this.hoveringValue)
  }
  mouseenter(option: common.Select2Option) {
    if (!option.disabled) {
      this.hoveringValue = option.value
    }
  }
  click(option: common.Select2Option) {
    if (!option.disabled) {
      this.select(option)
    }
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  toggleOpenAndClose() {
    if (this.disabled) {
      return
    }
    this.isOpen = !this.isOpen
    if (this.isOpen) {
      if (!this.keepSearchText) {
        this.innerSearchText = ''
      }
      Vue.nextTick(() => {
        this.focusSearchboxOrResultsElement()

        if (this.resultsElement) {
          const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex)
          if (lastScrollTopIndex !== null) {
            this.lastScrollTopIndex = lastScrollTopIndex
          }
        }
      })
      this.$emit('open')
    }
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  focusout() {
    this.focusoutTimer = setTimeout(() => {
      this.isOpen = false
      this.focusoutTimer = undefined
    }, common.timeout)
  }
  select(option: common.Select2Option | null) {
    if (option !== null) {
      if (this.multiple) {
        const options = this.option as common.Select2Option[]
        const index = options.findIndex(op => op.value === option.value)
        if (index === -1) {
          options.push(option)
        } else {
          options.splice(index, 1)
        }
      } else {
        this.option = option
        this.isOpen = false
      }
    }

    this.$emit('update', this.multiple ? (this.option as common.Select2Option[]).map(op => op.value) : (this.option as common.Select2Option).value)
  }

  keyDown(e: KeyboardEvent) {
    this.$emit('keydown', e) 
    if (e.keyCode === 40) {
      this.moveDown()
      e.preventDefault()
    } else if (e.keyCode === 38) {
      this.moveUp()
      e.preventDefault()
    } else if (e.keyCode === 13) {
      this.selectByEnter()
      e.preventDefault()
    }
  }
  keyUp(e: KeyboardEvent) {
    this.$emit('keyup', e) 
  }
  keyPress(e: KeyboardEvent) {
    this.$emit('keypress', e) 
  }
  isSelected(option: common.Select2Option) {
    return common.isSelected(this.option, option, this.multiple)
  }
  isDisabled(option: common.Select2Option) {
    return option.disabled ? 'true' : 'false'
  }
  removeSelection(e: MouseEvent, option: common.Select2Option) {
    common.removeSelection(this.option, option)
    this.$emit('update', (this.option as common.Select2Option[]).map(op => op.value))

    e.preventDefault()
    e.stopPropagation()

    if (this.isOpen) {
      Vue.nextTick(() => {
        this.focusSearchboxOrResultsElement()
      })
    }

    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
  private focusSearchboxOrResultsElement() {
    if (!this.isSearchboxHidden) {
      if (this.searchInputElement) {
        this.searchInputElement.focus()
      }
    } else {
      if (this.resultsElement) {
        this.resultsElement.focus()
      }
    }
  }
  private moveUp() {
    this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue)

    if (this.resultsElement) {
      const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex)
      if (lastScrollTopIndex !== null) {
        this.lastScrollTopIndex = lastScrollTopIndex
      }
    }
  }
  private moveDown() {
    this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue)

    if (this.resultsElement) {
      const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex)
      if (lastScrollTopIndex !== null) {
        this.lastScrollTopIndex = lastScrollTopIndex
      }
    }
  }
  private selectByEnter() {
    if (this.hoveringValue) {
      const option = common.getOptionByValue(this.data, this.hoveringValue)
      this.select(option)
    }
  }
  cancelFocusoutTimer() {
    if (this.focusoutTimer) {
      clearTimeout(this.focusoutTimer)
    }
  }
}

Vue.component('select2', Select2)
