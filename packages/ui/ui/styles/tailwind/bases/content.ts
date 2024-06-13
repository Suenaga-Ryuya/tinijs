import {css} from 'lit';

import {
  text as bootstrapText,
  image as bootstrapImage,
  figure as bootstrapFigure,
  fieldset as bootstrapFieldset,
} from '../../bootstrap/bases/content.js';

export const heading = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: var(--font-title);
    font-weight: 700;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 1.875rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.15rem;
  }

  h6 {
    font-size: 1.1rem;
  }
`;

export const text = bootstrapText;

export const link = css`
  a {
    color: var(--color-primary);
    font-weight: 600;
    text-decoration: none;
  }

  a:hover {
    color: var(--color-primary-less);
  }
`;

export const blockquote = css`
  blockquote {
    padding-left: var(--space-md);
    border-left: 4px solid var(--color-body-semi);
  }

  blockquote,
  blockquote * {
    margin: 0;
    font-style: italic;
    font-weight: 500;
  }
`;

export const list = css`
  ul,
  ol {
    margin: 0;
    padding-left: 2em;
    line-height: 2.25;
  }

  ul li,
  ol li {
    padding-left: 0.5em;
  }

  ul li::marker,
  ol li::marker {
    color: var(--color-medium);
  }

  dl {
    margin: 0;
    padding-left: 1em;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5em;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin-inline-start: 2.5rem;
  }
`;

export const table = css`
  table {
    border-collapse: collapse;
    width: 100%;
    text-align: left;
  }

  th,
  td {
    background: var(--color-body);
    padding: var(--space-sm);
    font-size: 0.9rem;
  }

  th {
    font-weight: bold;
  }

  td {
    border-block-start: var(--border-md) solid var(--color-body-semi);
    color: var(--color-medium);
  }
`;

export const code = css`
  pre,
  code,
  kbd,
  samp,
  var {
    font-family: var(--font-code);
    font-size: 0.85em;
    padding: 0.25rem 0.75rem;
    background: var(--color-body-less);
    border: 1px solid var(--color-body-semi);
    word-wrap: break-word;
    border-radius: 0.25rem;
    font-weight: bold;
  }

  pre > code {
    padding: 0;
    font-weight: normal;
    border: 0;
  }
`;

export const image = bootstrapImage;

export const figure = bootstrapFigure;

export const fieldset = bootstrapFieldset;

export const article = css`
  article h1,
  article h2,
  article h3,
  article h4,
  article h5,
  article h6 {
    margin: 0.75em 0 0.5em;
  }

  article p,
  article ul,
  article ol,
  article dl {
    margin: 1em 0;
  }

  article hr {
    margin: 4rem 0;
  }
`;

export default css`
  ${heading}
  ${text}
  ${link}
  ${blockquote}
  ${list}
  ${table}
  ${code}
  ${image}
  ${figure}
  ${fieldset}
  ${article}
`;