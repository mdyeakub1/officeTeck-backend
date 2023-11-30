/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { UserRouter } from '../modules/Users/users.routes'
import { authRoutes } from '../modules/Auth/auth.route'
import { EmployeeRoute } from '../modules/Employees/employee.routes'
import { ProjectRoute } from '../modules/Projects/project.routes'
import { AssetRoute } from '../modules/Assets/asset.routes'
import { EmployeeProjectRoute } from '../modules/EmployeeProject/employeeProject.routes'
import { EmployeeAssetRoute } from '../modules/EmployeeAsset/employeeAsset.routes'

const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/employees',
    route: EmployeeRoute,
  },
  {
    path: '/projects',
    route: ProjectRoute,
  },

  {
    path: '/assets',
    route: AssetRoute,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/employee-project',
    route: EmployeeProjectRoute
  },
  {
    path: '/employee-asset',
    route: EmployeeAssetRoute
  }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
