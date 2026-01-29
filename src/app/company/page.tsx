import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Quote } from "lucide-react";
import PageHero from "@/components/PageHero";
import { hangameFont } from "@/lib/fonts";

// ✅ [SEO] 검색엔진 최적화 (제목, 설명, 썸네일)
export const metadata: Metadata = {
  title: "About Us | Seoul City Tour",
  description:
    "Since 2004, Seoul City Tour has been Korea's trusted travel partner. Licensed by the government, authorized for DMZ tours. Meet our CEO Do-Young Park and professional team.",
  openGraph: {
    title: "About Seoul City Tour - Trusted Since 2004",
    description:
      "Korea's No.1 Inbound Travel Agency. Official DMZ Tour Operator & Government Certified Partner.",
    images: ["/images/company/dmz-group-photo.jpg"],
  },
};

export default function CompanyPage() {
  const teamMembers = [
    {
      name: "Walter White",
      role: "Chief Executive Officer",
      image: "/images/company/team_01.jpg",
    },
    {
      name: "Sarah Jhonson",
      role: "Product Manager",
      image: "/images/company/team_02.jpg",
    },
    {
      name: "William Anderson",
      role: "CTO",
      image: "/images/company/team_03.jpg",
    },
    {
      name: "Amanda Jepson",
      role: "Accountant",
      image: "/images/company/team_04.jpg",
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
        imageSrc="/images/seoul-palace-stone-wall-background.png"
        alt="Traditional Korean palace stone wall and nature scenery"
      />

      {/* 2. Company Overview */}
      <section className="relative w-full py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Text */}
            <div>
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

            {/* Right: Landscape Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full aspect-[3/2] rounded-[6px] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="/images/company/dmz-group-photo.jpg"
                  alt="Seoul City Tour DMZ Group Photo with tourists"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CEO Message */}
      <section className="relative bg-[#F8F9FA] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/company/typeC_01.png"
            alt="Background Pattern"
            fill
            className="object-cover object-[80%_center] lg:object-center opacity-40 pointer-events-none mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
            {/* 1. 이미지 영역 (Left) */}
            <div className="md:col-span-5 relative">
              <div className="w-full h-full min-h-[350px] rounded-[6px] overflow-hidden shadow-lg bg-white/50 border-white border-4 relative backdrop-blur-sm">
                <Image
                  src="/images/company/park-do-young-ceo.png"
                  alt="Do-Young Park, CEO of Seoul City Tour"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* 2. 텍스트 영역 (Right) */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6 relative">
              <div className="relative">
                <Quote className="block md:hidden w-8 h-8 text-[#4A7C7E] scale-x-[-1] mb-2" />
                <Quote className="hidden md:block absolute -left-12 -top-2 w-10 h-10 text-[#4A7C7E] scale-x-[-1]" />

                <h3
                  className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight relative z-10`}
                >
                  At Seoul City Tour, we believe that great travel is more than
                  visiting places — it is about understanding people, culture,
                  and stories.
                  <Quote className="inline-block w-8 h-8 md:w-10 md:h-10 text-[#4A7C7E] ml-2 align-top opacity-50" />
                </h3>
              </div>

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

              <div className="inline-block">
                <span className="bg-[#4A7C7E] text-white px-3 py-1 font-bold text-sm md:text-base shadow-sm">
                  THIS IS OUR PROMISE TO YOU.
                </span>
              </div>

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

      {/* 4. Company History */}
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

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="min-w-[260px] flex-shrink-0 snap-center lg:min-w-0 lg:w-auto bg-white rounded-[6px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
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
            <Link
              href="/package"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-[#4A7C7E] rounded-lg hover:bg-[#3D6566] transition-colors"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-[#4A7C7E] bg-white border border-[#4A7C7E] rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
