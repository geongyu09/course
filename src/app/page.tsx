import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            코스 크리에이터
          </h1>
          <p className="text-lg text-gray-600">
            지도에서 경로를 그리고 좌표 데이터를 관리하는 도구
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            href="/draw"
            title="경로 그리기"
            description="지도에 클릭으로 경로를 그려서 좌표 배열을 생성합니다"
            icon="🎨"
            features={[
              "지도 클릭으로 경로 생성",
              "실시간 좌표 배열 확인",
              "뒤로가기 기능",
              "지도 타입 변경"
            ]}
          />

          <FeatureCard
            href="/path"
            title="경로 표시하기"
            description="좌표 배열을 입력하여 지도에 경로를 표시합니다"
            icon="🗺️"
            features={[
              "좌표 배열로 경로 표시",
              "자동 지도 영역 조정",
              "폴리라인 렌더링",
              "경로 미리보기"
            ]}
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const FeatureCard = ({ href, title, description, icon, features }: FeatureCardProps) => {
  return (
    <Link href={href} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200 hover:border-indigo-300 group-hover:scale-105">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">{icon}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 mb-3">주요 기능:</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 text-center">
          <span className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300">
            시작하기 →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Page;
