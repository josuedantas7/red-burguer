import { BannerHome } from "@/components/BannerHome/BannerHome";
import { CardProduct } from "@/components/Card/CardProduct";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import burguer from '/public/burguer.svg'

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log(session)

  const product = {
    name: 'Hamburguer',
    description: 'Pão, carne, alface, tomate, queijo e maionese',
    price: 15.00,
    image: burguer
  }

  return (
    <div>
      <BannerHome/>
      <div>
        <h1 className="text-2xl text-center my-10 font-bold">Conheça nosso menu</h1>
        <div className="flex justify-center flex-wrap gap-[26px]">
          <CardProduct product={product} />
          <CardProduct product={product} />
          <CardProduct product={product} />
          <CardProduct product={product} />
        </div>
      </div>
    </div>
  );
}
