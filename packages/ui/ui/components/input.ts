import {html, nothing, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Scales,
} from '@tinijs/core';

export default class extends TiniElement {
  static readonly componentMetadata = {
    colorOnlyScheme: true,
    mainNonRootSelector: '.input',
  };

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) label?: string;
  @property({type: String, reflect: true}) placeholder?: string;
  @property({type: String, reflect: true}) type?: string;
  @property({type: String, reflect: true}) name?: string;
  @property({type: String, reflect: true}) value?: string;
  @property({type: String, reflect: true}) inputmode?: string;
  @property({type: String, reflect: true}) autocomplete?: string;
  @property({type: Boolean, reflect: true}) disabled?: boolean;
  @property({type: Boolean, reflect: true}) readonly?: boolean;
  @property({type: Boolean, reflect: true}) wrap?: boolean;
  @property({type: Boolean, reflect: true}) block?: boolean;
  @property({type: String, reflect: true}) scheme?: Colors;
  @property({type: String, reflect: true}) scale?: Scales;
  @property({type: String, reflect: true, attribute: 'focus:scheme'}) focusScheme?: this['scheme'];
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // host block
    if (changedProperties.has('block')) {
      if (this.block) {
        this.classList.add('block');
      } else {
        this.classList.remove('block');
      }
    }
    // root classes parts
    this.extendRootClasses({
      raw: {
        wrap: !!this.wrap,
        disabled: !!this.disabled,
        readonly: !!this.readonly,
      },
      pseudo: {
        focus: {
          [VaryGroups.Scheme]: this.focusScheme,
        },
      },
      overridable: {
        [VaryGroups.Scheme]: this.scheme,
        [VaryGroups.Scale]: this.scale,
      },
    });
  }

  protected render() {
    return html`
      <label
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
      >
        ${!this.label
          ? nothing
          : html`<span class="label" part="label">${this.label}</span>`}
        <input
          class="input"
          part="input"
          placeholder=${ifDefined(this.placeholder)}
          type=${ifDefined(this.type) as any}
          name=${ifDefined(this.name)}
          .value=${this.value || ''}
          inputmode=${ifDefined(this.inputmode)}
          autocomplete=${ifDefined(this.autocomplete) as any}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
        />
      </label>
    `;
  }
}
