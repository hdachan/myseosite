import PageHero from "@/components/PageHero";
import { Building2, Calendar, User, Users, Quote } from "lucide-react";
/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

export default function CompanyPage() {
  const companyInfo = [
    {
      icon: Building2,
      label: "Company",
      value: "Seoul City Tour Co., Ltd.",
    },
    {
      icon: Calendar,
      label: "Established",
      value: "Dec 27, 2004",
    },
    {
      icon: User,
      label: "CEO",
      value: "Do-Young Park",
    },
    {
      icon: Users,
      label: "Team",
      value: "Professional Experts",
    },
  ];

  const teamMembers = [
    {
      name: "Walter White",
      role: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Sarah Jhonson",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1573496359-0933d2768dcd?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "William Anderson",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Amanda Jepson",
      role: "Accountant",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const historyData = [
    {
      year: "2004 – 2008",
      title: "Foundation & Registration",
      desc: "Established as 'Mercury Travel Agency' (2003) and rebranded to 'Seoul City Tour Co., Ltd.' (2008). Officially registered with the Seoul Tourism Association (License No. 229).",
    },
    {
      year: "2009",
      title: "Strategic Expansions",
      desc: "Appointed as the official tour agency for Qantas Airways. Designated as the exclusive agency for China operations by the Ministry of Culture, Sports and Tourism.",
    },
    {
      year: "2010",
      title: "Global Partnerships",
      desc: "Became Korea's first inbound travel wholesaler. Signed strategic partnership agreements with global leaders including Expedia, Gulliver (GTA), and Hyundai Medis.",
    },
    {
      year: "2011 – 2013",
      title: "Excellence in DMZ Tours",
      desc: "Officially authorized to operate regular DMZ tours (3rd Tunnel). Awarded 'Quality Certification' by the Ministry of Culture, Sports and Tourism for 3 consecutive years.",
    },
    {
      year: "2014",
      title: "Major International Events",
      desc: "Successfully operated large-scale events, including the International Congress of Mathematicians (ICM 2014) hosting over 5,800 delegates.",
    },
    {
      year: "2019 – Present",
      title: "Market Leadership",
      desc: "Recognized as a Top Inbound FIT Travel Agency in Korea. Continuously expanding partnerships with global platforms like Viator, TripAdvisor, and Klook.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <PageHero
        title="About Us"
        description="A Trusted Seoul Tour Operator Since 2004"
        imageSrc="/images/background_korea_pt2.png"
      />

      {/* 2. Company Overview */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          {/* 상단: 텍스트 + 원형 이미지 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Text */}
            <div>
              {/* ❌ "ABOUT US" 라벨 삭제됨 */}

              {/* ✅ 제목: Sincerity and Expertise 적용 */}
              <h2
                className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-6 leading-tight`}
              >
                Discover Korea <br />
                with Sincerity and Expertise.
              </h2>

              <div className="space-y-4 text-gray-600 text-[15px] leading-8">
                <p>
                  Since 2004, <strong>Seoul City Tour</strong> has been
                  dedicated to providing reliable and authentic travel
                  experiences for international visitors.
                </p>
                <p>
                  From daily city walks to perfectly tailored private journeys,
                  we treat every guest with the same warmth and highest standard
                  of care.
                </p>
                <p>Plan your trip with a partner who values you like family.</p>
              </div>
            </div>

            {/* Right: Circular Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=800&fit=crop"
                  alt="Seoul City Tour"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 하단: 기업 정보 바 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              {companyInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center py-6 px-4 text-center group hover:bg-gray-50 transition-colors first:rounded-tl-xl md:first:rounded-l-xl last:rounded-br-xl md:last:rounded-r-xl"
                >
                  <div className="mb-3 p-3 bg-gray-50 text-[#4A7C7E] rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-1">
                    {info.label}
                  </h3>
                  <p className="text-base font-bold text-gray-900">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CEO Message Section */}
      <section className="bg-[#F8F9FA] py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* 1. 이미지 영역 (Left) - Pill Shape */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div className="relative w-[300px] h-[400px] rounded-[150px] overflow-hidden shadow-lg border-[6px] border-white">
                <img
                  src="/images/company/park-do-young-ceo.png"
                  alt="Do-Young Park, CEO"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* 2. 텍스트 영역 (Right) */}
            <div className="md:col-span-7 space-y-6">
              <Quote className="w-10 h-10 text-[#4A7C7E]" />

              {/* ✅ 인용구: 제목(2xl)보다 약간 작게 (text-xl) 조정하여 위계 설정 */}
              <h3
                className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
              >
                "At Seoul City Tour, we believe that great travel is more than
                visiting places — it is about understanding people, culture, and
                stories."
              </h3>

              <div className="text-gray-600 text-[15px] leading-7 space-y-4">
                <p>
                  As a Korea-based travel company with deep local expertise, we
                  curate carefully designed experiences that allow travelers to
                  connect with Korea in an authentic, safe, and meaningful way.
                </p>
                <p>
                  From meticulous planning to professional on-site operation,
                  your comfort, safety, and satisfaction remain our highest
                  priorities.
                </p>
              </div>

              {/* 강조 박스 */}
              <div className="inline-block">
                <span className="bg-[#4A7C7E] text-white px-3 py-1 font-bold text-sm md:text-base shadow-sm">
                  THIS IS OUR PROMISE TO YOU.
                </span>
              </div>

              {/* 이름 및 직함 */}
              <div className="pt-2">
                <p className="text-xl font-bold text-gray-900">Do-Young Park</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">
                  Founder & CEO, Seoul City Tour
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Company History - Clean Grid Style */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="mb-12">
            <h2
              className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-3`}
            >
              Company History
            </h2>
            <p className="text-sm text-gray-500">
              Major milestones in our 20-year journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {historyData.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-start border-t border-gray-200 pt-6 hover:border-[#4A7C7E] transition-colors duration-300"
              >
                {/* 연도 - 텍스트로만 심플하게 */}
                <span className="text-3xl font-bold text-gray-200 mb-4 group-hover:text-[#4A7C7E] transition-colors duration-300">
                  {item.year}
                </span>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 5. Our Team Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="mb-12">
            <p className="text-xs font-bold text-[#4A7C7E] uppercase tracking-widest mb-2">
              Our People
            </p>
            {/* ✅ 제목: 기준이 되는 text-2xl 적용 */}
            <h2
              className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-4`}
            >
              Meet the Team
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              We are a team of passionate professionals dedicated to providing
              the best travel experiences in Korea.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Simple CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          {/* ✅ 제목: 기준이 되는 text-2xl 적용 */}
          <h2
            className={`${hangameFont.className} text-2xl font-bold text-gray-900 mb-4`}
          >
            Travel with Confidence
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Plan your Korea trip with a professional team you can trust. Our
            support team is always here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/package"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-[#4A7C7E] rounded-lg hover:bg-[#3D6566] transition-colors"
            >
              View Packages
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-[#4A7C7E] bg-white border border-[#4A7C7E] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
