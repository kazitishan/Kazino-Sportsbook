import Link from "next/link";
import Image from "next/image";

function CompetitionButton({ competition }) {
  return (
    <Link 
      href={`/${competition.toLowerCase().replace(/\s+/g, '-')}`}
      className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-gray-50 w-[150px]"
    >
      <div className="w-14 h-14 relative mb-1">
        <Image 
          src={`/competitions/${competition}.svg`}
          alt={competition}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <span className="text-xs font-medium text-center text-gray-700"> {competition} </span>
    </Link>
  );
}

export default CompetitionButton;