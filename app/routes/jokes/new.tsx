import { ActionFunction, redirect } from "@remix-run/node"
import { db } from "~/utils/db.server"

function validateJokeName(name: string){
   if(name.length < 3){
      return "Joke must be at least 3 characters long"
   }
}

function validateJokeContent(content: string){
   if(content.length < 3){
      return "Content must be at least 10 characters long"
   }
}


export const action: ActionFunction = async ({ request }) => {
   const form = await request.formData()
   const name = form.get("name")
   const content = form.get("content")

   if(
      typeof name !== "string" ||
      typeof content !== "string"
   ){
      throw new Error("Form not submitted correctly")
   }

   const joke = await db.joke.create({
      data: {
         name,
         content
      }
   })

   return redirect(`/jokes/${joke.id}`)
}

export default function NewJokeRoute() {
   return (
      <div>
         <p>Add your own hilarious joke</p>
         <form method="post">
            <div>
               <label>
                  Name: <input type="text" name="name" />
               </label>
            </div>
            <div>
               <label>
                  Content: <textarea name="content" />
               </label>
            </div>
            <div>
               <button type="submit" className="button">
                  Add
               </button>
            </div>
         </form>
      </div>
   )
}