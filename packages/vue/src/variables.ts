/**
 * This file is generated by 'file2variable-cli'
 * It is not mean to be edited by hand
 */
// tslint:disable
/* eslint-disable */
import { AutoComplete } from "./auto-complete"
import { Select2 } from "./select2"

// @ts-ignore
export function autoCompleteTemplateHtml(this: AutoComplete) {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.containerStyle},[_c('div',{staticClass:"selection"},[_c('div',{staticClass:"select2-search select2-search--dropdown"},[_c('input',{ref:"searchInput",staticClass:"select2-search__field",attrs:{"type":"search","role":"textbox","autocomplete":"off","autocorrect":"off","autocapitalize":"off","spellcheck":"false"},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.onChange($event)},"keydown":function($event){return _vm.keyDown($event)},"keyup":function($event){return _vm.keyUp($event)},"keypress":function($event){return _vm.keyPress($event)},"focusout":function($event){return _vm.focusout()},"click":function($event){return _vm.toggleOpenAndClose()}}})])]),_vm._v(" "),_c('div',{class:_vm.dropdownStyle},[_c('div',{staticClass:"select2-dropdown"},[_c('div',{staticClass:"select2-results"},[_c('ul',{ref:"results",staticClass:"select2-results__options",attrs:{"role":"tree","tabindex":"-1"},on:{"keydown":function($event){return _vm.keyDown($event)},"focusout":function($event){return _vm.focusout()}}},[_vm._l((_vm.filteredData),function(groupOrOption,i){return [(groupOrOption.options)?_c('li',{staticClass:"select2-results__option",attrs:{"role":"group"}},[_c('strong',{staticClass:"select2-results__group"},[_vm._v(_vm._s(groupOrOption.label))]),_vm._v(" "),_c('ul',{staticClass:"select2-results__options select2-results__options--nested"},_vm._l((groupOrOption.options),function(option,j){return _c('li',{key:j,class:_vm.getOptionStyle(option.value),attrs:{"role":"treeitem","aria-selected":_vm.isSelected(option),"aria-disabled":_vm.isDisabled(option)},on:{"mouseenter":function($event){return _vm.mouseenter(option)},"click":function($event){return _vm.click(option)}}},[(option.component)?_c(option.component,{tag:"component",attrs:{"option":option}}):[_vm._v(_vm._s(option.label))]],2)}),0)]):_c('li',{class:_vm.getOptionStyle(groupOrOption.value),attrs:{"role":"treeitem","aria-selected":_vm.isSelected(groupOrOption),"aria-disabled":_vm.isDisabled(groupOrOption)},on:{"mouseenter":function($event){return _vm.mouseenter(groupOrOption)},"click":function($event){return _vm.click(groupOrOption)}}},[(groupOrOption.component)?_c(groupOrOption.component,{tag:"component",attrs:{"option":groupOrOption}}):[_vm._v(_vm._s(groupOrOption.label))]],2)]})],2)])])])])}
// @ts-ignore
export var autoCompleteTemplateHtmlStatic = [  ]
// @ts-ignore
export function select2TemplateHtml(this: Select2) {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.containerStyle},[_c('div',{staticClass:"selection",on:{"click":function($event){return _vm.toggleOpenAndClose()}}},[_c('div',{class:_vm.selectionStyle,attrs:{"role":"combobox"}},[(!_vm.multiple)?_c('span',{staticClass:"select2-selection__rendered",attrs:{"title":_vm.option ? _vm.option.label : ''}},[(_vm.option)?[(_vm.option.component)?_c(_vm.option.component,{tag:"component",attrs:{"option":_vm.option}}):[_vm._v(_vm._s(_vm.option.label))]]:_c('span',{staticClass:"select2-selection__placeholder"},[_vm._v(_vm._s(_vm.placeholder))])],2):_vm._e(),_vm._v(" "),(!_vm.multiple)?_c('span',{staticClass:"select2-selection__arrow",attrs:{"role":"presentation"}},[_c('b',{attrs:{"role":"presentation"}})]):_vm._e(),_vm._v(" "),(_vm.multiple)?_c('ul',{staticClass:"select2-selection__rendered"},_vm._l((_vm.option),function(op,i){return _c('li',{key:i,staticClass:"select2-selection__choice",attrs:{"title":op.label}},[_c('span',{staticClass:"select2-selection__choice__remove",attrs:{"role":"presentation"},on:{"click":function($event){return _vm.removeSelection($event, op)}}},[_vm._v("×")]),_vm._v("\n                    "+_vm._s(op.label)+"\n                ")])}),0):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.dropdownStyle},[_c('div',{staticClass:"select2-dropdown select2-dropdown--below"},[_c('div',{class:_vm.searchStyle},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchText),expression:"searchText"}],ref:"searchInput",staticClass:"select2-search__field",attrs:{"type":"search","role":"textbox","autocomplete":"off","autocorrect":"off","autocapitalize":"off","spellcheck":"false"},domProps:{"value":(_vm.searchText)},on:{"keydown":function($event){return _vm.keyDown($event)},"keyup":function($event){return _vm.keyUp($event)},"keypress":function($event){return _vm.keyPress($event)},"focusout":function($event){return _vm.focusout()},"input":function($event){if($event.target.composing){ return; }_vm.searchText=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"select2-results"},[_c('ul',{ref:"results",staticClass:"select2-results__options",attrs:{"role":"tree","tabindex":"-1"},on:{"keydown":function($event){return _vm.keyDown($event)},"focusout":function($event){return _vm.focusout()}}},[_vm._l((_vm.filteredData),function(groupOrOption,i){return [(groupOrOption.options)?_c('li',{staticClass:"select2-results__option",attrs:{"role":"group"}},[_c('strong',{staticClass:"select2-results__group"},[_vm._v(_vm._s(groupOrOption.label))]),_vm._v(" "),_c('ul',{staticClass:"select2-results__options select2-results__options--nested"},_vm._l((groupOrOption.options),function(option,j){return _c('li',{key:j,class:_vm.getOptionStyle(option.value),attrs:{"role":"treeitem","aria-selected":_vm.isSelected(option),"aria-disabled":_vm.isDisabled(option)},on:{"mouseenter":function($event){return _vm.mouseenter(option)},"click":function($event){return _vm.click(option)}}},[(option.component)?_c(option.component,{tag:"component",attrs:{"option":option}}):[_vm._v(_vm._s(option.label))]],2)}),0)]):_c('li',{class:_vm.getOptionStyle(groupOrOption.value),attrs:{"role":"treeitem","aria-selected":_vm.isSelected(groupOrOption),"aria-disabled":_vm.isDisabled(groupOrOption)},on:{"mouseenter":function($event){return _vm.mouseenter(groupOrOption)},"click":function($event){return _vm.click(groupOrOption)}}},[(groupOrOption.component)?_c(groupOrOption.component,{tag:"component",attrs:{"option":groupOrOption}}):[_vm._v(_vm._s(groupOrOption.label))]],2)]})],2)])])])])}
// @ts-ignore
export var select2TemplateHtmlStatic = [  ]
/* eslint-enable */
// tslint:enable
