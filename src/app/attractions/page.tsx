// src/app/attractions/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "관광지 정보 | DMZ 관광",
  description: "서울 근교 및 전국 주요 관광지 상세 정보와 추천 코스",
};

export default function Attractions() {
  const spots = [
    {
      name: "DMZ 제3터널",
      img: "/images/dmz3.jpg",
      desc: "북한 땅 밑으로 파여든 실제 침투용 터널",
    },
    {
      name: "도라전망대",
      img: "/images/dora.jpg",
      desc: "북한 땅을 가장 가까이에서 볼 수 있는 곳",
    },
    {
      name: "도라산역",
      img: "/images/dorasan.jpg",
      desc: "남북 분단의 상징, 희망의 기차역",
    },
    {
      name: "임진각 평화누리",
      img: "/images/imjingak.jpg",
      desc: "자유의 다리와 평화의 종",
    },
    {
      name: "경복궁",
      img: "/images/gyeongbok.jpg",
      desc: "조선 왕조의 정궁, 서울 대표 궁궐",
    },
    {
      name: "북촌한옥마을",
      img: "/images/bukchon.jpg",
      desc: "전통 한옥이 살아 숨쉬는 골목",
    },
  ];

  return (
    <>
      <section className="relative h-[500px] flex items-center justify-center bg-black/40">
        <Image
          src="/images/attractions-hero.jpg"
          alt="관광지 정보"
          fill
          className="object-cover"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">관광지 정보</h1>
          <p className="text-2xl">서울 & DMZ 주요 명소 한눈에 보기</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-786 mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {spots.map((spot) => (
              <div key={spot.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-64">
                  <Image
                    src={spot.img}
                    alt={spot.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{spot.name}</h3>
                    <p className="text-sm opacity-90">{spot.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-red-700 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">
            원하는 관광지를 조합해서
            <br />
            나만의 투어를 만들어보세요!
          </h2>
          <Link
            href="/private"
            className="inline-block bg-white text-red-700 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition"
          >
            Private 투어 문의하기 →
          </Link>
        </div>
      </section>
    </>
  );
}
