import { html } from '@polymer/lit-element';
import CSS from './_components.blockcerts-logo-css';
import getText from '../../../i18n/getText';

function simpleLogo () {
  return html`
    <img class='buv-qa-logo--simple  buv-c-logo--small' src="./lg_bxb_rgb_72_dpi_positiv.png">
    
    <span class='buv-u-visually-hidden'>${getText('text.brandname')}</span>
  `;
}

function logoWithBranding () {
  return html`
    <img class='buv-qa-logo--branded  buv-c-logo--medium' src="./lg_bxb_rgb_72_dpi_positiv.png">
    <span class='buv-u-visually-hidden'>${getText('text.motto')}</span>
  `;
}

const BlockcertsLogo = ({ className, showMotto = false } = {}) => {
  return html`
  ${CSS}
  <a href='https://www.bloxberg.org' title='${getText('text.blockcertsHint')}' class$='buv-c-logo  ${className}'>
    ${
  showMotto
    ? logoWithBranding()
    : simpleLogo()
}
  </a>`;
};

export default BlockcertsLogo;
