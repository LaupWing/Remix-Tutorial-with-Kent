import { LinksFunction } from "@remix-run/node"
import stylesUrl from "~/styles/index.css"

export default function IndexRoute() {
   return <div>Hello Index Route</div>
}

export const links:LinksFunction = () =>{
   return [
      {
         rel: "stylesheet",
         href: stylesUrl
      }
   ]
}