import { combinations, combinationsIterator } from "./combinations.js"
import { copy, decycle } from "./copy.js"
import { DataFrame, Series } from "./dataframe/index.js"
import { permutations, permutationsIterator } from "./permutations.js"
import { random, seed } from "./random.js"
import { timeSync, timeAsync } from "./time.js"

import abs from "./abs.js"
import add from "./add.js"
import apply from "./apply.js"
import arccos from "./arccos.js"
import arcsin from "./arcsin.js"
import arctan from "./arctan.js"
import argmax from "./argmax.js"
import argmin from "./argmin.js"
import assert from "./assert.js"
import cast from "./cast.js"
import ceil from "./ceil.js"
import chop from "./chop.js"
import clamp from "./clamp.js"
import correl from "./correl.js"
import cos from "./cos.js"
import count from "./count.js"
import covariance from "./covariance.js"
import dataTypes from "./helpers/data-types.js"
import diff from "./diff.js"
import distance from "./distance.js"
import divide from "./divide.js"
import dot from "./dot.js"
import dropMissing from "./drop-missing.js"
import dropMissingPairwise from "./drop-missing-pairwise.js"
import dropNaN from "./drop-nan.js"
import dropNaNPairwise from "./drop-nan-pairwise.js"
import dropUndefined from "./drop-undefined.js"
import every from "./every.js"
import exp from "./exp.js"
import factorial from "./factorial.js"
import find from "./find.js"
import findAll from "./find-all.js"
import flatten from "./flatten.js"
import float from "./float.js"
import floor from "./floor.js"
import identity from "./identity.js"
import IndexMatcher from "./index-matcher.js"
import indexOf from "./index-of.js"
import inferType from "./infer-type.js"
import int from "./int.js"
import intersect from "./intersect.js"
import inverse from "./inverse.js"
import isArray from "./is-array.js"
import isBoolean from "./is-boolean.js"
import isBrowser from "./helpers/is-browser.js"
import isDataFrame from "./is-dataframe.js"
import isDate from "./is-date.js"
import isEqual from "./is-equal.js"
import isFunction from "./is-function.js"
import isJagged from "./is-jagged.js"
import isNested from "./is-nested.js"
import isNumber from "./is-number.js"
import isObject from "./is-object.js"
import isSeries from "./is-series.js"
import isString from "./is-string.js"
import isUndefined from "./is-undefined.js"
import lerp from "./lerp.js"
import log from "./log.js"
import MathError from "./math-error.js"
import max from "./max.js"
import mean from "./mean.js"
import median from "./median.js"
import min from "./min.js"
import mod from "./mod.js"
import mode from "./mode.js"
import multiply from "./multiply.js"
import ndarray from "./ndarray.js"
import normal from "./normal.js"
import ones from "./ones.js"
import pow from "./pow.js"
import print from "./print.js"
import product from "./product.js"
import range from "./range.js"
import remap from "./remap.js"
import reshape from "./reshape.js"
import reverse from "./reverse.js"
import round from "./round.js"
import scale from "./scale.js"
import set from "./set.js"
import shape from "./shape.js"
import shuffle from "./shuffle.js"
import sign from "./sign.js"
import sin from "./sin.js"
import some from "./some.js"
import sort from "./sort.js"
import sqrt from "./sqrt.js"
import stats from "./stats.js"
import std from "./std.js"
import stdev from "./stdev.js"
import subtract from "./subtract.js"
import sum from "./sum.js"
import tan from "./tan.js"
import transpose from "./transpose.js"
import union from "./union.js"
import variance from "./variance.js"
import vectorize from "./vectorize.js"
import zeros from "./zeros.js"
import zip from "./zip.js"

export {
  abs,
  add,
  apply,
  arccos,
  arcsin,
  arctan,
  argmax,
  argmin,
  assert,
  cast,
  ceil,
  chop,
  clamp,
  combinations,
  combinationsIterator,
  copy,
  correl,
  cos,
  count,
  covariance,
  DataFrame,
  dataTypes,
  decycle,
  diff,
  distance,
  divide,
  dot,
  dropMissing,
  dropMissingPairwise,
  dropNaN,
  dropNaNPairwise,
  dropUndefined,
  every,
  exp,
  factorial,
  find,
  findAll,
  flatten,
  float,
  floor,
  identity,
  IndexMatcher,
  indexOf,
  inferType,
  int,
  intersect,
  inverse,
  isArray,
  isBoolean,
  isBrowser,
  isDataFrame,
  isDate,
  isEqual,
  isFunction,
  isJagged,
  isNested,
  isNumber,
  isObject,
  isSeries,
  isString,
  isUndefined,
  lerp,
  log,
  MathError,
  max,
  mean,
  median,
  min,
  mod,
  mode,
  multiply,
  ndarray,
  normal,
  ones,
  permutations,
  permutationsIterator,
  pow,
  print,
  product,
  random,
  range,
  remap,
  reshape,
  reverse,
  round,
  scale,
  seed,
  Series,
  set,
  shape,
  shuffle,
  sign,
  sin,
  some,
  sort,
  sqrt,
  stats,
  std,
  stdev,
  subtract,
  sum,
  tan,
  timeAsync,
  timeSync,
  timeSync as time,
  transpose,
  union,
  variance,
  vectorize,
  zeros,
  zip,
}

const out = {
  abs,
  add,
  apply,
  arccos,
  arcsin,
  arctan,
  argmax,
  argmin,
  assert,
  cast,
  ceil,
  chop,
  clamp,
  combinations,
  combinationsIterator,
  copy,
  correl,
  cos,
  count,
  covariance,
  DataFrame,
  dataTypes,
  decycle,
  diff,
  distance,
  divide,
  dot,
  dropMissing,
  dropMissingPairwise,
  dropNaN,
  dropNaNPairwise,
  dropUndefined,
  every,
  exp,
  factorial,
  find,
  findAll,
  flatten,
  float,
  floor,
  identity,
  IndexMatcher,
  indexOf,
  inferType,
  int,
  intersect,
  inverse,
  isArray,
  isBoolean,
  isBrowser,
  isDataFrame,
  isDate,
  isEqual,
  isFunction,
  isJagged,
  isNested,
  isNumber,
  isObject,
  isSeries,
  isString,
  isUndefined,
  lerp,
  log,
  MathError,
  max,
  mean,
  median,
  min,
  mod,
  mode,
  multiply,
  ndarray,
  normal,
  ones,
  permutations,
  permutationsIterator,
  pow,
  print,
  product,
  random,
  range,
  remap,
  reshape,
  reverse,
  round,
  scale,
  seed,
  Series,
  set,
  shape,
  shuffle,
  sign,
  sin,
  some,
  sort,
  sqrt,
  stats,
  std,
  stdev,
  subtract,
  sum,
  tan,
  timeAsync,
  timeSync,
  time: timeSync,
  transpose,
  union,
  variance,
  vectorize,
  zeros,
  zip,

  dump() {
    const context =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof global !== "undefined"
          ? global
          : typeof window !== "undefined"
            ? window
            : typeof self !== "undefined"
              ? self
              : undefined

    if (!context) {
      throw new out.MathError(
        "Cannot dump functions into global scope because none of `globalThis`, `global`, `window`, or `self` exist in the current context!",
      )
    }

    Object.keys(out).forEach(key => {
      try {
        Object.defineProperty(context, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: out[key],
        })
      } catch (e) {
        context[key] = out[key]
      }
    })
  },
}

export default out

if (typeof window !== "undefined") {
  window.JSMathTools = out
}
