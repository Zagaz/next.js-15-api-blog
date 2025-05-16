// components/AuthorInfo.tsx
import { FaLocationDot } from "react-icons/fa6";
import { PiBuildingApartment } from "react-icons/pi";

type AuthorInfoProps = {
  author: {
    firstName: string;
    lastName: string;
    image: string;
    address: {
      city: string;
      stateCode: string;
      country: string;
    };
    company: {
      name: string;
      title: string;
    };
  };
};

const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    // Author Info 
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md flex flex-col items-center text-center gap-4">
      <img
        src={author.image}
        alt="Author"
        className="w-28 h-28 rounded-full object-cover shadow"
      />
      <h1 className="text-4xl md:text-3xl font-bold text-gray-800">
        {author.firstName} {author.lastName}
      </h1>

      <div className="flex text-4xl items-center justify-center gap-2 text-gray-600 text-sm">
        <FaLocationDot className="text-purple-600 text-2xl" />
        <div className='text-2xl'>
          {author.address.city && <span>{author.address.city}</span>}
          {author.address.stateCode && <span> - {author.address.stateCode}</span>}
          {author.address.country && <span> - {author.address.country}</span>}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
        <PiBuildingApartment className="text-2xl text-purple-600" />
        <div className='text-2xl'>
          {author.company.name && <span>{author.company.name}</span>}
          {author.company.title && <span> - {author.company.title}</span>}
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
