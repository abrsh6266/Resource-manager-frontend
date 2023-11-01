import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue'
import LogingView from './views/LogingView.vue'
import SignupView from './views/SignupView.vue'
import HomeView from './views/HomeView.vue'
import InventoryView from './views/InventoryView.vue'
import HeaderView from './views/HeaderView.vue'
import InsertingMaterialView from './views/InsertingMaterialView.vue'
import InsertingCategoryView from './views/InsertingCategoryView.vue'
import UpdatingMaterialView from './views/UpdatingMaterialView.vue'
import DeletingMaterialView from './views/DeletingMaterialView.vue'
import ServiceView from './views/ServiceView.vue'
import AddingDepartmentView from './views/Department/AddingDepartmentView.vue'
import UpdatingDepartmentView from './views/Department/UpdatingDepartmentView.vue'
import DeletingDepartmentView from './views/Department/DeletingDepartmentView.vue'
import AddingCustodianView from './views/Custodian/AddingCustodianView.vue'
import UpdatingCustodianView from './views/Custodian/UpdatingCustodianView.vue'
import DeletingCustodianView from './views/Custodian/DeletingCustodianView.vue'
import AddingRelationView from './views/Relation/AddingRelationView.vue'
import UpdatingRelationView from './views/Relation/UpdatingRelationView.vue'
import DeletingRelationView from './views/Relation/DeletingRelationView.vue'
import ReportView from './views/ReportView.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/addingdepartment',
    name: 'addingdepartment',
    component: AddingDepartmentView,
  },
  {
    path: '/updatingdepartment',
    name: 'updatingdepartment',
    component: UpdatingDepartmentView,
  },
  {
    path: '/deletingdepartment',
    name: 'deletingdepartment',
    component: DeletingDepartmentView,
  },
  {
    path: '/addingcustodian',
    name: 'addingcustodian',
    component: AddingCustodianView,
  },
  {
    path: '/updatingcustodian',
    name: 'updatingcustodian',
    component: UpdatingCustodianView,
  },
  {
    path: '/deletingcustodian',
    name: 'deletingcustodian',
    component: DeletingCustodianView,
  },
  {
    path: '/addingrelation',
    name: 'addingrelation',
    component: AddingRelationView,
  },
  {
    path: '/updatingrelation',
    name: 'updatingrelation',
    component: UpdatingRelationView,
  },
  {
    path: '/deletingrelation',
    name: 'deletingrelation',
    component: DeletingRelationView,
  },
  {
    path: '/service',
    name: 'service',
    component: ServiceView,
  },  
  {
    path: '/updatingmaterial',
    name: 'updatingmaterial',
    component: UpdatingMaterialView,
  },
  {
    path: '/deletingmaterial',
    name: 'deletingmaterial',
    component: DeletingMaterialView,
  },
  {
    path: '/insertingmaterial',
    name: 'insertingmaterial',
    component: InsertingMaterialView,
  },
  {
    path: '/insertingcategory',
    name: 'insertingcategory',
    component: InsertingCategoryView,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryView,
  },
  {
    path: '/loging',
    name: 'loging',
    component: LogingView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/',
    name: 'header',
    component: HeaderView,
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
