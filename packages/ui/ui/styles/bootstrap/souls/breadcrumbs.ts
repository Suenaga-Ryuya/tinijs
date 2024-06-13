import {css} from 'lit';

import {defaultStyles} from '../../../components/breadcrumbs.js';

export const styles = defaultStyles.extends({
  statics: css`
    .item-active,
    .item::before {
      color: var(--color-medium-more);
    }

    .item::before {
      transform: rotate(-15deg);
    }
  `,
});

export default {styles};