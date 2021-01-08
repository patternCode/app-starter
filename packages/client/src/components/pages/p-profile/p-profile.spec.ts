import { PProfile } from './p-profile';
import { newSpecPage } from '@stencil/core/testing';

describe('p-profile', () => {
  describe('normalization', () => {
    it('returns a blank string if the name is undefined', async () => {
      const { rootInstance } = await newSpecPage({
        components: [PProfile],
        html: '<p-profile></p-profile>',
      });
      expect(rootInstance.formattedName()).toEqual('');
    });

    it('capitalizes the first letter', async () => {
      const { rootInstance } = await newSpecPage({
        components: [PProfile],
        html: '<p-profile name="quincy"></p-profile>',
      });
      expect(rootInstance.formattedName()).toEqual('Quincy');
    });

    it('lower-cases the following letters', async () => {
      const { rootInstance } = await newSpecPage({
        components: [PProfile],
        html: '<p-profile name="JOSEPH"></p-profile>',
      });
      expect(rootInstance.formattedName()).toEqual('Joseph');
    });

    it('handles single letter names', async () => {
      const { rootInstance } = await newSpecPage({
        components: [PProfile],
        html: '<p-profile name="Q"></p-profile>',
      });
      expect(rootInstance.formattedName()).toEqual('Q');
    });
  });
});
