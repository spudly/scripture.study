import {configure} from '@testing-library/cypress';
import '@cypress/code-coverage/support';
import './commands';

configure({testIdAttribute: 'data-test-id'});
