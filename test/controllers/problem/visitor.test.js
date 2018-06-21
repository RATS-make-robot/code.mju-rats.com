const test = require('ava')
const supertest = require('supertest')
const app = require('../../../app')
const problems = require('../../seed/problems')

const server = app.listen()
const request = supertest.agent(server)

test('Problem list', async t => {
  const res = await request
    .get('/api/problem/list')

  t.is(res.status, 200)
  t.is(res.type, 'application/json')
  t.truthy(Array.isArray(res.body.list.docs))
  t.truthy(Array.isArray(res.body.solved))

  if (res.body.list.docs.length > 0) {
    t.truthy(res.body.list.docs[0].title)
    t.truthy(res.body.list.docs[0].pid)
    t.truthy(res.body.list.docs[0].time)
  }
})

test('Problem find one', async t => {
  const res = await request
    .get('/api/problem/1001')

  t.is(res.status, 200)

  const n = problems.data.find((item) => item.title === res.body.problem.title)

  for (const [key, value] of Object.entries(n)) {
    t.deepEqual(res.body.problem[key], value)
  }
})

test('Problem should fail to find one', async (t) => {
  const res = await request
    .get('/api/problem/10000')

  t.is(res.status, 400)
  t.is(res.type, 'application/json')

  t.truthy(res.body.error)
})

test('Pid is not a number', async (t) => {
  const res = await request
    .get('/api/problem/xx')

  t.is(res.status, 400)
  t.is(res.type, 'application/json')

  t.truthy(res.body.error)
})

test.after.always('close server', t => {
  server.close()
})
