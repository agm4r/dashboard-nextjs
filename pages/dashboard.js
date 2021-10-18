import ModuleDashboard from '../modules/Dashboard'
import { Fragment } from 'react'
import Head from 'next/head'

const Dashboard = () => {
  return (
      <Fragment>
          <Head><title>Dashboard Page</title></Head>
            <ModuleDashboard />
      </Fragment>
  )
}

export default Dashboard