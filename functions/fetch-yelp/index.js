const fetch = require('cross-fetch');
require('dotenv').config({ path: `.env.development.local` });

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;

  try {
    const resp = await fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await resp.json();
 
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // es-lint-disable-next-line no-console
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};


