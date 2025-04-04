import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    country: string;
    capital: string;
}

type validarAPI = {
  capital: string
}[]

export const handler: Handlers = {
  GET: async (_req:Request, ctx: FreshContext) => {

    const country = ctx.params.country

    const url = `https://api.api-ninjas.com/v1/country?name=` + country

    const API_KEY = Deno.env.get("API_KEY")

    if(!API_KEY) {
      throw new Error("Error de api")
    }

    const response = await fetch(url, {
        headers: {
          "X-Api-Key": API_KEY
        }
      })

    const data:validarAPI = await response.json();

    const capital = data[0].capital

    return ctx.render({country,capital})

   
  }
}

export default function Home(props: PageProps<Data>) {
  return (
    <div>
         {props.data.country && (<a href = {`/city/${props.data.capital}`}> {props.data.capital}</a>)}
    </div>
  )
}