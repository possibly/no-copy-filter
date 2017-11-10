# noCopyFilter

A filter for Bruno Dias' Improv engine that will choose groups with non-matching tags or mismatched tags. In other words, this filter rejects groups that have tags which copy any one of the model's tags.

99% of this code is originally by Bruno Dias (https://github.com/sequitur)

## Example

```js
const spec = {
  root: {
    groups: [
      {
        tags: [['class', 'mammal']],
        phrases: ['dog']
      },
      {
        tags: [['class', 'bird']],
        phrases: ['parrot']
      },
      {
        tags: [['something', 'else']],
        phrases: ['something else']
      },
    ]
  }
};

const all_results_possible = {};
const first_group_impossible = { tags: [['class', 'mammal']] };

const i = new Improv(spec, {
  filters: [noCopyFilter()]
 });
```

`i.gen('root', all_results_possible)` will return `dog`, `parrot` or `something else`.
`i.gen('root', first_group_impossible)` will return `parrot` or `something else` but never `dog`.

## What is a "mismatch"

First, a `tag` is an array of the shape `['String A', 'String B']`. Two `tag`s `match` if `String A` of Tag 1 and `String A` of Tag 2 are the same. 

 * `['String A', 'String B']` and `['String A', 'String C']` `match`.

Two `tag`s `mismatch` if they `match` but `String B` of Tag 1 and `String B` of Tag 2 are NOT the same. 

* `['String A', 'String B']` and `['String A', 'String C']` `mismatch`.

Two `tag`s are `copies` if both `String A` and `String B` are the same in both tags.

* `['String D', 'String E']` and `['String D', 'String E']` are `copies`.

This filter allows for: 

1) Groups with tags that don't `match`.
2) Groups with tags that `mismatch`

(the first two cases)

This filter blocks:

* Groups with tags that are copies.

(the last case)
