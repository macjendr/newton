// import UIKit scripts if needed
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// or proceed with custom ES6 code
// import test from './test';

// test();

// loads the Icon plugin
UIkit.use(Icons);

// components can be called from the imported UIkit reference
UIkit.notification('Hello world.');
