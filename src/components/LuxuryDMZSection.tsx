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
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <img
          src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&q=80"
          alt="관광지 정보"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center text-white px-6 animate-fade-in">
          <div className="mb-8 inline-block">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-8" />
          </div>
          <h1 className="text-6xl md:text-8xl font-thin tracking-wider mb-8 opacity-90">
            관광지 정보
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-widest opacity-70">
            서울 & DMZ 주요 명소 한눈에 보기
          </p>
        </div>
      </section>

      {/* Spots Grid */}
      <section className="py-32 bg-gradient-to-b from-black via-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-thin text-white tracking-wider mb-4">
              Featured Destinations
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spots.map((spot, idx) => (
              <div
                key={spot.name}
                className="group relative overflow-hidden rounded-sm"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-96 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1567521563759-10b315d1b6c3?w=800&h=1000&fit=crop"
                    alt={spot.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Border Effect */}
                  <div className="absolute inset-0 border border-amber-400/0 group-hover:border-amber-400/40 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-0.5 bg-amber-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <h3 className="text-3xl font-light text-white mb-3 tracking-wide">
                        {spot.name}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {spot.desc}
                      </p>
                    </div>

                    {/* View More Button */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span className="text-amber-400 text-sm tracking-widest uppercase flex items-center gap-2">
                        자세히 보기
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-red-900/20 to-amber-900/20" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-12" />
          </div>

          <h2 className="text-5xl md:text-6xl font-thin text-white mb-6 tracking-wider leading-tight">
            원하는 관광지를 조합해서
            <br />
            <span className="text-amber-400">나만의 투어</span>를 만들어보세요!
          </h2>

          <p className="text-gray-400 text-lg mb-12 tracking-wide">
            맞춤형 프라이빗 투어로 특별한 여행을 경험하세요
          </p>

          <a
            href="/private"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-12 py-5 text-lg font-light tracking-widest uppercase hover:from-amber-500 hover:to-amber-400 transition-all duration-300 group shadow-lg shadow-amber-500/20"
          >
            Private 투어 문의하기
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
