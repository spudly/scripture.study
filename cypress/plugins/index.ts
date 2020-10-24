/// <reference types="cypress" />
import coverage from '@cypress/code-coverage/task';

/**
 * @type {Cypress.PluginConfig}
 */
const pluginConfig = (on, config) => {
  coverage(on, config);
  return config;
};

export default pluginConfig;
