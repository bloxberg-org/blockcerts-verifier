import { html } from '@polymer/lit-element';
import CSS from './_components.card-css';
import '../../atoms/VerifyButton';
import '../../atoms/FinalVerificationStep';
import getText from '../../../i18n/getText';

function loadImage (props) {
  return new Promise((resolve) => {
    const tester = new Image();
    tester.addEventListener('load', () => {
      resolve(html`<img src='${props.issuerLogo}' alt='${props.issuerName}' class='buv-c-card__img'/>`);
    });
    tester.addEventListener('error', () => {
      resolve(html`<p class='buv-o-text-15'>${props.issuerName}</p>`);
    });
    tester.src = props.issuerLogo;
  });
}

export default function CardCertificate (props) {
  const {
    hasCertificateDefinition,
    recipientName,
    certificateTitle,
    issuedOn,
    issueDate,
    issuerName,
    recordLink,
    hideVerifyButton
  } = props;

  let { hideRecordLink } = props;

  if (!hasCertificateDefinition) {
    return null;
  }

  if (!recordLink && !hideRecordLink) {
    hideRecordLink = true;
  }

  const titleClass = [
    'buv-c-card__title',
    hideRecordLink ? 'buv-c-card__title--no-padding' : ''
  ].join(' ');

  return html`
      ${CSS}
      <section class='buv-c-card'>
        <div class='buv-c-card__img-wrapper'>
          ${loadImage(props)}
        </div>
        <div class='buv-c-card__title-wrapper'>
          <h1 class$=${titleClass}>${certificateTitle}</h1>
          <h2 class$='${titleClass}  buv-c-card__recipient'>${recipientName}</h2>
          <span class='buv-o-text-12'>${getText('text.issued')} <time datetime$='${issuedOn}'>${issueDate}</time> ${getText('text.by')} ${issuerName}</span>
          <span class='buv-o-text-12'>${getText('text.bloxbergCertified')} 
        </div>
      ${
  hideRecordLink
    ? ''
    : html`<a class='buv-o-text-12  buv-o-link  buv-c-card__record-link  qa-card-record-link' href='${recordLink}' target='_blank'>
    <span class='buv-o-link__text--underline'>${getText('text.viewRecord')}</span>
    </a>`
}
      </section>
      ${hideVerifyButton
    ? ''
    : html`<buv-final-verification-step class='buv-c-fullscreen-certificate__verification-status' isVisible hideLink standalone>
      <buv-verify-button type='link'>${getText('text.verifyAgain')}</buv-verify-button>
    </buv-final-verification-step>`
}
    `;
}
