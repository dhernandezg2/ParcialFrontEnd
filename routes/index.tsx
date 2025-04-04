import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  telefono?: string,
  country?: string
}

type validarAPI = {
  valid: boolean,
  country: string
}

export const handler: Handlers<Data> = {
  GET: async (req:Request, ctx: FreshContext) => {
    const url = new URL(req.url)
    const telefono = url.searchParams.get("telefono")
    let country;

    if(telefono) {
      const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": "vL0/f7CiyoN2O8zeskkVjQ==M6qE4kcQsldua5LM"
        }
      })

      const data: validarAPI = await response.json();
      country = data.country
    }

    return ctx.render({telefono, country})
  }
}

export default function Home(props: PageProps<Data>) {
  return (
    <div>
      <form method="GET">
        <input type="text" name="telefono" placeholder="telefono" />
        <button type="submit">enviar</button>
      </form>

      {props.data.telefono && <p>El numero es: {props.data.telefono}</p>}
      {props.data.country && (<a href = {`/country/${props.data.country}`}> {props.data.country}</a>)}
    </div>
  )
}