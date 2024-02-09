interface Window {
  __Zone_disable_customElements: boolean;
}

/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
// eslint-disable-next-line no-underscore-dangle
(window as Window).__Zone_disable_customElements = true;
