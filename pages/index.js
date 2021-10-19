import dynamic from "next/dynamic"

const Dashboard = dynamic(() => import('../modules/Dashboard'), {
  loading: () => <div>Loading Content ...</div>
})

export default function Home() {
  return (
      <Dashboard />
  )
}