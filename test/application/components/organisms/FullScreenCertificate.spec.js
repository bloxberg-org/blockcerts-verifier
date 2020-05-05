import sinon from 'sinon';
import * as litUnsafeHTML from 'lit-html/lib/unsafe-html.js';
import FullScreenCertificate from '../../../../src/components/organisms/FullScreenCertificate/FullScreenCertificate';
import { assertStringInValues } from '../helpers/assertStringValues';

describe('FullScreenCertificate component test suite', function () {
  describe('given there is no certificate definition', function () {
    it('should return null', function () {
      const instance = FullScreenCertificate({ hasCertificateDefinition: false });
      expect(instance).toBeNull();
    });
  });

  describe('given the certificate has a displayHTML property', function () {
    beforeEach(function () {
      // call through unsafeHTML directive
      sinon.stub(litUnsafeHTML, 'unsafeHTML').callsFake(str => str);
    });

    afterEach(function () {
      sinon.restore();
    });

    it('should render the displayHTML property', function () {
      const fixtureDisplayHTML = '<div>This is a test</div>';
      const instance = FullScreenCertificate({ displayHTML: fixtureDisplayHTML, hasCertificateDefinition: true });
      expect(assertStringInValues(instance, fixtureDisplayHTML)).toBe(true);
    });
  });

  describe('given the certificate does not have a displayHTML property', function () {
    it('should render the certificate as v1', function () {
      const instance = FullScreenCertificate({ hasCertificateDefinition: true });
      const instanceAsString = JSON.stringify(instance);
      expect(instanceAsString).toContain('buv-full-certificate-v1');
    });
  });
});
