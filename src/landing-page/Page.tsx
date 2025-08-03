import {Outlet, ScrollRestoration} from "react-router"

export const Page = () => {
  return (<>
      <ScrollRestoration/>
      <p>LandingPage</p>
      <Outlet/>
    </>
  )
}
