/**
* knx.js - a KNX protocol stack in pure Javascript
* (C) 2016-2018 Elias Karakoulakis
* (C) 2026 Zacharie Monnet
*/
const fs = require('fs')
const path = require('path')
const test = require('tape')

// This test checks that each DPT module in src/dptlib has a corresponding test file in test/dptlib, and that the test file is not empty and defines at least one test.
test('each dptlib module has a non-empty test file', function (t) {
  const srcDir = path.join(__dirname, '..', '..', 'src', 'dptlib')
  const dptIds = fs.readdirSync(srcDir)
    .map((entry) => entry.match(/^dpt(\d+)\.js$/))
    .filter(Boolean)
    .map((match) => match[1])
    .sort((a, b) => Number(a) - Number(b))

  dptIds.forEach((dptId) => {
    const testFile = path.join(__dirname, `test-dpt${dptId}.js`)
    t.ok(fs.existsSync(testFile), `DPT${dptId} has a test file`)

    if (!fs.existsSync(testFile)) return

    const content = fs.readFileSync(testFile, 'utf8')
    t.ok(content.trim().length > 0, `DPT${dptId} test file is not empty`)
    t.ok(
      /\btest\s*\(|commontest\.do\s*\(|require\(['"]\.\/commontest['"]\)\.do\s*\(/.test(content),
      `DPT${dptId} test file defines at least one test`
    )
  })

  t.end()
})
