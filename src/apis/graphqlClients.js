import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
const setAuthHeader = () => {
  const token = localStorage.getItem('Authorization');
  return token ? token : '';
};

const httpOptions = {
  headers: {
    Authorization: setAuthHeader(), // Include the token in the Authorization header
  },
};

// API 1
const api1Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/login',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});

// API 2
const api2Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/register',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});

// API 3
const api3Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/department/get',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});

// API 4
const api4Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/material/get',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 5
const api5Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/material/add',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 6
const api6Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/material/update',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 7
const api7Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/material/remove',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 8
const api8Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/category/add',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 9
const api9Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/getservices',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 10
const api10Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/department/add',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 11
const api11Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/department/update',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 12
const api12Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/department/remove',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 13
const api13Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/custodian/add',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 14
const api14Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/custodian/remove',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 15
const api15Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/custodian/update',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});

// API 16
const api16Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/usermat/add',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 17
const api17Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/usermat/update',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 18
const api18Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/usermat/remove',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 19
const api19Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/report',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
// API 20
const api20Client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8082/api/managers',
    ...httpOptions,
  }),
  cache: new InMemoryCache(),
});
export { api1Client, api2Client,api3Client,api4Client,
  api5Client,api6Client,api7Client,api8Client,
  api9Client,api10Client,api11Client,api12Client,api13Client,
  api14Client,api15Client,api16Client,api17Client,api18Client,api19Client,api20Client};