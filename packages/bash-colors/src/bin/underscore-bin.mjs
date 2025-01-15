#!/usr/bin/env node
import { fx } from "../index.mjs"
import process from "node:process"

const text = process.argv.slice(2).join(" ")
console.log(fx.underscore(text))
