var test = require('tape');
var Improv = require('improv');
var noCopyFilter = require('./noCopyFilter.js')

var dog_rng = function(){return 0} // result: dog.
var parrot_rng = function(){return 0.4} // result: parrot.
var else_rng = function(){return 0.9} // result: something else.

const spec = {
  root: {
    groups: [
      {
        tags: [['class', 'else']],
        phrases: ['level 1 [:does_not_mismatch]']
      },
      {
        tags: [['class', 'also']],
        phrases: ['level 1 and nothing else.']
      },
    ]
  },
  does_not_mismatch: {
    groups: [
      {
        tags: [['class', 'mammal']],
        phrases: ['level 2']
      }
    ]
  }
};

const all_results_possible = {};
const first_group_impossible = { tags: [['class', 'mammal']] };

const i = new Improv(spec, {filters: [noCopyFilter()]});

const improv_dog = new Improv(spec, {
  filters: [noCopyFilter()],
  rng: dog_rng
});

const improv_parrot = new Improv(spec, {
  filters: [noCopyFilter()],
  rng: parrot_rng
});

const improv_else = new Improv(spec, {
  filters: [noCopyFilter()],
  rng: else_rng
});

test('noCopyFilter is a function that returns the filter function.', function (t) {
    t.plan(3);
    var test_improv = null
    
    t.equal(typeof noCopyFilter, 'function');
    t.equal(typeof noCopyFilter(), 'function');
    try{
      test_improv = new Improv(spec, {filters: [noCopyFilter()]});
    }catch (e){
      t.fail('Improv was unable to accept noCopyFilter()')
      throw e
    }
    try{
      test_improv.gen('root', all_results_possible)
    }catch (e){
      t.fail('Improv was unable to generate using noCopyFilter()')
      throw e
    }
    t.pass('noCopyFilter returned a valid filter function to Improv.')
});

test('noCopyFilter returns all results for models with no tags.', function (t) {
    t.plan(3);
    
    t.notEqual(improv_dog.gen('root', all_results_possible).indexOf('dog'), -1)
    t.notEqual(improv_parrot.gen('root', all_results_possible).indexOf('parrot'), -1)
    t.notEqual(improv_else.gen('root', all_results_possible).indexOf('something else'), -1)
});

test('noCopyFilter returns results for models with mismatched tags or non-matching tags.', function (t) {
    t.plan(3);
    
    t.equal(improv_dog.gen('root', first_group_impossible).indexOf('dog'), -1)
    t.notEqual(improv_parrot.gen('root', first_group_impossible).indexOf('parrot'), -1)
    t.notEqual(improv_else.gen('root', first_group_impossible).indexOf('something else'), -1)
});
