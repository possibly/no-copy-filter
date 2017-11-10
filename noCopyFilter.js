var _lodash = require('lodash');

function noCopyFilter(group, model) {
  /* Ensures that the group and model have mismatched tags */
  if (group.tags.length == 0) return 0;
  var result = group.tags.find(function (groupTag) {
    // Look for a mismatch.
    var matched = model.tags.find(function (modelTag) {
      return modelTag[0] === groupTag[0];
    });
    if (matched === undefined) return true;
    if (compareTags(groupTag, matched) === TAG_COMPARISON.MISMATCH) return true;
    return false;
  });
  if (result === undefined) return null;
  return 0;
}

function compareTags(a, b) {
  /* Returns a TAG_COMPARISON value */
  if ((0, _lodash.isEqual)(a, b)) return TAG_COMPARISON.TOTAL;
  // If the tags are unequal but have the same length, it stands to reason
  // there is a mismatch.
  if (a.length === b.length) return TAG_COMPARISON.MISMATCH;

  var _ref = a < b ? [a, b] : [b, a];

  var _ref2 = _slicedToArray(_ref, 2);

  var shorter = _ref2[0];
  var longer = _ref2[1];

  if (shorter.find(function (x, i) {
    return x !== longer[i];
  })) return TAG_COMPARISON.MISMATCH;
  return TAG_COMPARISON.PARTIAL;
}

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var TAG_COMPARISON = {
  TOTAL: Symbol(),
  PARTIAL: Symbol(),
  MISMATCH: Symbol()
};

module.exports = function(){ return noCopyFilter; }
