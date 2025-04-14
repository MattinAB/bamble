import { Outlet } from "react-router"
import { Layout } from "./component/Layout"






function App(){
  return (
    <Layout>
      <Outlet/>
    </Layout>
  )
}


export default App