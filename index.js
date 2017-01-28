'use strict';

const postcss = require('postcss');
const parser = require('postcss-selector-parser');

// eslint-disable-next-line prefer-arrow-callback
module.exports = postcss.plugin('split-selectors', function postCssPluginSplitSelectors() {
  return function splitSelectors(css) {
    const rulesToAdd = [];

    css.walkRules((rule) => {
      let remainders;

      rule.selector = parser((selectors) => {
        remainders = selectors.filter((selector, index) => index > 0);
        remainders.forEach((selector) => { selector.remove(); });
        remainders = remainders.map(selector => selector.clone());
      }).process(rule.selector).result;

      // eslint-disable-next-line prefer-spread
      rulesToAdd.push.apply(rulesToAdd, remainders.map(item => Object.assign(rule.clone(), { selector: item })));
    });

    rulesToAdd.forEach((ruleToAdd) => {
      css.append(ruleToAdd);
    });
  };
});
