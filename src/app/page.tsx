import { BannerHome } from "@/components/BannerHome/BannerHome";
import { ListItens } from "@/components/Menu/ListItens";

export default async function Home() {

  return (
    <div className="mb-20">
      <BannerHome/>
      <div>
        <h1 className="text-2xl text-center my-10 font-bold">Conheça nosso menu</h1>
        <div className="flex justify-center flex-wrap gap-[26px] max-[1350px]:">
          <ListItens />
        </div>
      </div>
    </div>
  );
}
