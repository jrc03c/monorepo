import { base64Decode } from "./base-64-decode.mjs"
import { base64Encode } from "./base-64-encode.mjs"

import {
  Base64DecodingError,
  Base64EncodingError,
  DecryptionError,
  EncryptionError,
  HashingError,
  RandomStringGenerationError,
} from "./errors.mjs"

import { decrypt } from "./decrypt.mjs"
import { encrypt } from "./encrypt.mjs"
import { hash } from "./hash.mjs"
import { parse, stringify } from "@jrc03c/js-text-tools"
import { randomString } from "./random-string.mjs"

if (typeof window !== "undefined") {
  window.JSCryptoHelpers = {
    base64Decode,
    Base64DecodingError,
    base64Encode,
    Base64EncodingError,
    decrypt,
    DecryptionError,
    encrypt,
    EncryptionError,
    hash,
    HashingError,
    parse,
    randomString,
    RandomStringGenerationError,
    stringify,
  }
}

export {
  base64Decode,
  Base64DecodingError,
  base64Encode,
  Base64EncodingError,
  decrypt,
  DecryptionError,
  encrypt,
  EncryptionError,
  hash,
  HashingError,
  parse,
  randomString,
  RandomStringGenerationError,
  stringify,
}
