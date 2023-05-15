const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let streamFlip = true

app.post('/search', async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'application/json');

  const {query, filters } = req.body

  await wait(1000)

  res.json({
    results: [
      {
        "id": "1",
        "name": ["JIRA doc 2 " + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["JIRA"]
      },
      {
        "id": "2",
        "name": ["JIRA doc 1" + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["JIRA"]
      },
      {
        "id": "3",
        "name": ["How to make a confluence " + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Confluence"]
      },
      {
        "id": "4",
        "name": ["How to make a website" + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Confluence"]

      },
      {
        "id": "5",
        "name": ["How to make a website " + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Bitbucket"]
      },
      {
        "id": "6",
        "name": ["How to make a website" + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Bitbucket"]
      },
      {
        "id": "7",
        "name": ["How to make a website " + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Bitbucket"]
      },
      {
        "id": "8",
        "name": ["How to make a website" + query],
        "content": ["A website is a collection of web pages and related content that is identified by a common domain name and published on at least one web server. Notable examples are wikipedia.org, google.com, and amazon.com."],
        "url": ["https://en.wikipedia.org/wiki/Website"],
        "category": ["Confluence"]
      },
    ].filter((result) => {
      if (Object.keys(filters).length === 0) {
        return true
      }
      return (filters["category"]).includes((filter) => {
        return result["category"]?.includes(filter)
      })
    }),
    facets: [
      {
      "name": "category",
      "entries": [
        {
          value: "JIRA",
          count: 1
        },
        {
          value: "Confluence",
          count: 1
        },
        {
          value: "Bitbucket",
          count: 1
        }
      ]
      }
    ],
    total: 424,
    streaming_id: streamFlip ? 1 : 2 ,
    conversation_id: '1234'
  })
  streamFlip = !streamFlip

});


app.post('/completions', async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // flush the headers to establish SSE with client

  const {streaming_id} = req.body

  const openAiResponse = {
    1: [
    ...([...Array(3).keys()].reduce((sum) => [...sum, "hello",
    "my",
    "name",
    "is",
    "John",
    "and",
    "I",
    "am",
    "a",
    "doctor",
    "",
    "im",
    "here",
    "to",
    "help",
    "hello",
    "my",
    "name",
    "is",
    "John",
    "and",
    "I",
    "am",
    "a",
    "doctor"
    ], [])),
    "",
    '[DONE]'
  ],
  2: [
    "hello",
    "im",
    "a",
    "different",
    "person",
    "and",
    "I",
    "am",
    "a",
    "doctor",
    "",
    "im",
    "here",
    '[DONE]'
  ]
  }

  for (const message of openAiResponse[streaming_id] || openAiResponse[1]) {
    if (message === '[DONE]') {
      res.write(`data: [DONE]\n\n`)
      break
    }
    res.write(`data: ${message} \n\n`)
    await wait(40)
  }

})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})