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
mv .env.sample .env
```

`.env`

```
RESAS_API_KEY="xxxxx" // Your API KEY
```

### Run Server

```
docker-compose up --build
docker-compose up
```

Server listen http://localhost:4000

# Example

## get broad industries

```
query fetchIndustries {
  industries(pageSize: 20) {
    broadIndustries {
      sicCode
      sicName
    }
  }
}
```
