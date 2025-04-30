import React from 'react';
import FooterDomainText from '../../../components/FooterDomainText';

export default function FooterCopyright({copyright}) {
  return (
    <>
      <FooterDomainText />
      <div
        className="footer__copyright"
        // Developer provided the HTML, so assume it's safe.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: copyright}}
      />
    </>
  );
}
