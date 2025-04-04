import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
    country: string;
    capital: string;
}

type validarAPI = {
  capital: string
}[]

export const handler: Handlers = {
  GET:  (_req:Request, ctx: FreshContext) => {

    const country = ctx.params.country
    const capital = ctx.params.capital

    return ctx.render({country,capital})
  }
}

export default function Home(props: PageProps<Data>) {
  return (
    <div>
      {props.data.country && (<a href = {`/country/${props.data.country}`}> {props.data.country}</a>)}
      {props.data.capital && <p>La ciudad es: {props.data.capital}</p>}

    </div>
  )
}