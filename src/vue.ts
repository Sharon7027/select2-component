import * as Vue from "vue";
import Component from "vue-class-component";
import * as common from "./common";
import { srcVueTemplateHtml } from "./vue-variables";

@Component({
    template: srcVueTemplateHtml,
    props: ["data", "value", "disabled", "minCountForSearch", "placeholder", "customSearchEnabled"],
})
class Select2 extends Vue {
    data: common.Select2Data;
    value?: string;
    disabled?: boolean;
    minCountForSearch?: number;
    placeholder?: string;
    customSearchEnabled?: boolean;

    hoveringValue: string | null | undefined = null;
    option: common.Select2Option | null = null;
    isOpen = false;
    focusoutTimer?: NodeJS.Timer;
    innerSearchText = "";
    lastScrollTopIndex = 0;
    isSearchboxHidden: boolean;
    searchStyle: string;

    searchInputElement: HTMLElement;
    resultsElement: HTMLElement;

    get searchText() {
        return this.innerSearchText;
    }
    set searchText(text: string) {
        if (this.customSearchEnabled) {
            this.$emit("search", text);
        }
        this.innerSearchText = text;
    }

    get dropdownStyle() {
        return common.getDropdownStyle(this.isOpen);
    }

    get filteredData() {
        const result = this.customSearchEnabled
            ? this.data
            : common.getFilteredData(this.data, this.searchText);

        if (common.valueIsNotInFilteredData(result, this.hoveringValue)) {
            this.hoveringValue = common.getFirstAvailableOption(result);

            if (this.resultsElement) {
                const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, result, this.lastScrollTopIndex);
                if (lastScrollTopIndex !== null) {
                    this.lastScrollTopIndex = lastScrollTopIndex;
                }
            }
        }
        return result;
    }

    get containerStyle() {
        return common.getContainerStyle(this.disabled, this.isOpen);
    }

    beforeMount() {
        const option = common.getOptionByValue(this.data, this.value);
        if (option !== null) {
            this.option = option;
        }
        this.hoveringValue = this.value;
        this.isSearchboxHidden = this.customSearchEnabled
            ? false
            : common.isSearchboxHiddex(this.data, this.minCountForSearch);
        this.searchStyle = common.getSearchStyle(this.isSearchboxHidden);
    }

    mounted() {
        this.searchInputElement = this.$refs.searchInput as HTMLElement;
        this.resultsElement = this.$refs.results as HTMLElement;
    }

    getOptionStyle(value: string) {
        return common.getOptionStyle(value, this.hoveringValue);
    }
    mouseenter(option: common.Select2Option) {
        if (!option.disabled) {
            this.hoveringValue = option.value;
        }
    }
    click(option: common.Select2Option) {
        if (!option.disabled) {
            this.option = option;
            this.$emit("update", option.value);
            this.isOpen = false;
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    toggleOpenAndClose() {
        if (this.disabled) {
            return;
        }
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.innerSearchText = "";
            Vue.nextTick(() => {
                if (!this.isSearchboxHidden) {
                    if (this.searchInputElement) {
                        this.searchInputElement.focus();
                    }
                } else {
                    if (this.resultsElement) {
                        this.resultsElement.focus();
                    }
                }

                if (this.resultsElement) {
                    const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.data, this.lastScrollTopIndex);
                    if (lastScrollTopIndex !== null) {
                        this.lastScrollTopIndex = lastScrollTopIndex;
                    }
                }
            });
            this.$emit("open");
        }
        if (this.focusoutTimer) {
            clearTimeout(this.focusoutTimer);
        }
    }
    focusout() {
        this.focusoutTimer = setTimeout(() => {
            this.isOpen = false;
            this.focusoutTimer = undefined;
        }, common.timeout);
    }
    moveUp() {
        this.hoveringValue = common.getPreviousOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
            }
        }
    }
    moveDown() {
        this.hoveringValue = common.getNextOption(this.filteredData, this.hoveringValue);

        if (this.resultsElement) {
            const lastScrollTopIndex = common.getLastScrollTopIndex(this.hoveringValue, this.resultsElement, this.filteredData, this.lastScrollTopIndex);
            if (lastScrollTopIndex !== null) {
                this.lastScrollTopIndex = lastScrollTopIndex;
            }
        }
    }
    selectByEnter() {
        if (this.hoveringValue) {
            this.$emit("update", this.hoveringValue);

            const option = common.getOptionByValue(this.data, this.hoveringValue);
            if (option !== null) {
                this.option = option;
            }

            this.isOpen = false;
        }
    }

    keyDown(e: KeyboardEvent) {
        if (e.keyCode === 40) {
            this.moveDown();
            e.preventDefault();
        } else if (e.keyCode === 38) {
            this.moveUp();
            e.preventDefault();
        } else if (e.keyCode === 13) {
            this.selectByEnter();
            e.preventDefault();
        }
    }
    isSelected(option: common.Select2Option) {
        return this.option && option.value === this.option.value ? "true" : "false";
    }
    isDisabled(option: common.Select2Option) {
        return option.disabled ? "true" : "false";
    }
}

Vue.component("select2", Select2);
