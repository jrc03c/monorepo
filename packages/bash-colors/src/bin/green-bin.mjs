#!/usr/bin/env node
import { fg } from "../index.mjs"
import process from "node:process"

const text = process.argv.slice(2).join(" ")
console.log(fg.green(text))
