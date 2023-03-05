import type { LoaderFunction } from "@remix-run/node"
import { Joke } from "@prisma/client"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { db } from "~/utils/db.server"

type LoaderData = {
   joke: Joke | null
}

export const loader: LoaderFunction = async ({params}) => {
   const data: LoaderData = {
      joke: await db.joke.findUnique({ where: {
         id: params.jokeId
      } })
   }

   return json(data)
}

export default function JokeRoute() {
   const data = useLoaderData<LoaderData>()

   return (
      <div>
         <p>Here's your hilarious joke:</p>
         <p>
            {data?.joke?.content}
         </p>
      </div>
   )
}
