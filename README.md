# Location distances

Provide a list of locations (strings) and get array of nearest location for each one.

## Requirements

- `node` and `npm`
- `redis` (run ```brew install redis``` to install it on macOS)
- [Mapbox API token](https://account.mapbox.com/). It's used to fetch coordinates for a given location string (query). Create .env file and put it there as MAPBOX_API_TOKEN=your_api_token

## Available scripts

- `npm start` to start the server
- `npm test` to run tests

## Usage

Once server is started, you can make POST requests with array of locations (strings) as a body.

### Request example:

```
curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '["New York", "Statue of Liberty", "San Francisco", "Los Angeles"]' \
  http://localhost:3000
```
