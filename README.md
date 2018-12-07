# What's this repositry?
- The repo is GraphQL Server of RESAS API.

### RESAS API
- Japanese regions local economy statistcal data API.
- https://opendata.resas-portal.go.jp/

# Motivation
RESAS API is REST API. But, I wanna use elastically this API.

So, GraphQL is optimal solution!

# Use
- GraphQL/Apollo Server

# Setup

### Set environment variable of api key

```
touch .env
```

`.env`

```
RESAS_API_KEY="xxxxx"
```

### Run Server

```
yarn install
yarn start
```
