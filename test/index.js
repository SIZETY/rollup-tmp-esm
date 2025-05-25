import expect from 'expect.js'
import { describe, it } from 'mocha'
import * as tools from '../dist/index.esm.js'

describe('function clone', function () {
	describe('param data', function () {
		it('测试用例', () => {
			const obj = { a: { b: 1 } }
			expect(obj).to.eql(tools.clone(obj))
		})
	})
})
