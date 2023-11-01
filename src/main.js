import { computed, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { provideApolloClient } from '@vue/apollo-composable';
import { api1Client,api2Client,api3Client,api4Client,api5Client,
  api6Client,api7Client,api8Client,api9Client,api10Client,
  api11Client,api12Client,api13Client,api14Client,
  api15Client,api16Client,api17Client,api18Client, api19Client} from './apis/graphqlClients';
const app = createApp(App);
router.beforeEach((to, from, next) => {
  const currentPath = to.path;
  console.log('this is the current path : ',currentPath)
  if(currentPath==='/login'){
    app.provide(provideApolloClient(api1Client));
  }else if(currentPath==='/loging'){
    app.provide(provideApolloClient(api1Client));
  }else if(currentPath==='/signup'){
    app.provide(provideApolloClient(api2Client));
  }else if(currentPath==='/home'){
    app.provide(provideApolloClient(api3Client));
  }else if(currentPath==='/inventory'){
    app.provide(provideApolloClient(api4Client));
  }else if(currentPath==='/insertingmaterial'){
    app.provide(provideApolloClient(api5Client));
  }else if(currentPath==='/updatingmaterial'){
    app.provide(provideApolloClient(api6Client));
  }else if(currentPath==='/deletingmaterial'){
    app.provide(provideApolloClient(api7Client));
  }else if(currentPath==='/insertingcategory'){
    app.provide(provideApolloClient(api8Client));
  }else if(currentPath==='/service'){
    app.provide(provideApolloClient(api9Client));
  }else if(currentPath==='/addingdepartment'){
    app.provide(provideApolloClient(api10Client));
  }else if(currentPath==='/updatingdepartment'){
    app.provide(provideApolloClient(api11Client));
  }else if(currentPath==='/deletingdepartment'){
    app.provide(provideApolloClient(api12Client));
  }else if(currentPath==='/addingcustodian'){
    app.provide(provideApolloClient(api13Client));
  }else if(currentPath==='/deletingcustodian'){
    app.provide(provideApolloClient(api14Client));
  }else if(currentPath==='/updatingcustodian'){
    app.provide(provideApolloClient(api15Client));
  }else if(currentPath==='/addingrelation'){
    app.provide(provideApolloClient(api16Client));
  }else if(currentPath==='/updattingrelation'){
    app.provide(provideApolloClient(api17Client));
  }else if(currentPath==='/deletingrelation'){
    app.provide(provideApolloClient(api18Client));
  }
  else if(currentPath==='/report'){
    app.provide(provideApolloClient(api19Client));
  }
  next();
});
app.use(router).mount('#app');