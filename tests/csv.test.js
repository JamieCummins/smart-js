import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, toCsv } from '../app/engine/csv.js';

test('parses header, CRLF, BOM and quoted fields', () => {
  const rows = parseCsv('﻿a,b,c\r\n1,"x, y",\r\n2,"say ""hi""",z\n\n');
  assert.deepEqual(rows, [{ a: '1', b: 'x, y', c: '' }, { a: '2', b: 'say "hi"', c: 'z' }]);
});

test('round-trips through toCsv', () => {
  const rows = [{ a: '1', b: 'x, y' }, { a: '2', b: '' }];
  assert.deepEqual(parseCsv(toCsv(rows)), rows);
});
