import {html, type PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {ref, createRef, type Ref} from 'lit/directives/ref.js';
import {
  TiniElement,
  partAttrMap,
  VaryGroups,
  Colors,
  Gradients,
  Factors,
  FontTypes,
  FontWeights,
  TextTransforms,
} from '@tinijs/core';

export type LinkTargets = '_blank' | '_self' | '_parent' | '_top';

export default class extends TiniElement {
  private readonly ROUTER_CHANGE_EVENT = 'tini:route-change';
  private anchorRef: Ref<HTMLAnchorElement> = createRef();

  /* eslint-disable prettier/prettier */
  @property({type: String, reflect: true}) href?: string;
  @property({type: String, reflect: true}) rel?: string;
  @property({type: String, reflect: true}) target?: LinkTargets;
  @property({type: String, reflect: true}) active?: string;
  @property({type: Boolean, reflect: true}) italic?: boolean;
  @property({type: Boolean, reflect: true}) underline?: boolean;
  @property({type: String, reflect: true}) color?: Colors | Gradients;
  @property({type: String, reflect: true}) fontType?: FontTypes;
  @property({type: String, reflect: true}) fontSize?: Factors;
  @property({type: String, reflect: true}) fontWeight?: FontWeights;
  @property({type: String, reflect: true}) textTransform?: TextTransforms;
  /* eslint-enable prettier/prettier */

  willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties);
    // root classes parts
    this.extendRootClasses({
      raw: {
        italic: !!this.italic,
        underline: !!this.underline,
      },
      overridable: {
        [VaryGroups.Color]: this.color,
        [VaryGroups.FontType]: this.fontType,
        [VaryGroups.FontSize]: this.fontSize,
        [VaryGroups.FontWeight]: this.fontWeight,
        [VaryGroups.TextTransform]: this.textTransform,
      },
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active)
      window.addEventListener(
        this.ROUTER_CHANGE_EVENT,
        this.updateActiveStatus
      );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.active)
      window.removeEventListener(
        this.ROUTER_CHANGE_EVENT,
        this.updateActiveStatus
      );
  }

  updated() {
    if (this.active) this.updateActiveStatus();
  }

  private updateActiveStatus = (e?: Event) => {
    if (!this.active || !this.anchorRef.value) return;
    const currentUrl = new URL(
      !this.href ? '/' : this.href,
      window.location.origin
    );
    const eventUrl = (e as CustomEvent)?.detail.url;
    const currentActive = e
      ? currentUrl.href === `${eventUrl.origin}${eventUrl.pathname}`
      : currentUrl.href ===
        `${window.location.origin}${window.location.pathname}`;
    // anchor tag
    const partList = this.anchorRef.value.getAttribute('part') || '';
    this.anchorRef.value.setAttribute(
      'part',
      (currentActive
        ? `${partList} ${this.active}`
        : partList.replace(this.active, '')
      ).trim()
    );
    // the host
    this.classList[currentActive ? 'add' : 'remove'](this.active);
  };

  private clickLink(e: Event) {
    if (!this.anchorRef.value) return;
    // navigate
    if (this.anchorRef.value.href !== window.location.href) {
      const url = new URL(this.anchorRef.value.href);
      history.pushState({}, '', url.href);
      dispatchEvent(new PopStateEvent('popstate'));
    }
    // default
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  protected render() {
    return html`
      <a
        router-ignore
        ${ref(this.anchorRef)}
        class=${classMap(this.rootClasses)}
        part=${partAttrMap(this.rootClasses)}
        href=${this.href || '/'}
        target=${ifDefined(this.target)}
        rel=${ifDefined(this.rel)}
        @click=${this.clickLink}
      >
        <slot></slot>
      </a>
    `;
  }
}
