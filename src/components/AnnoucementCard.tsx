// components/AnnoucementCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface AnnouncementCardProps {
  id: number,
  title: string,
  description: string,
  price: number,
  imageUrl: string
};

const AnnoucementCard: React.FC<AnnouncementCardProps> = ({ id, title, description, price, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Contenant avec une hauteur définie pour l'image */}
      <div className="relative w-full h-48">  {/* Ajuste la hauteur ici si nécessaire */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='object-cover'
          priority
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{title}</div>
        <p className="text-gray-700 text-base">{description.substring(0, 48)}...</p>
      </div>
      <div className="px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl text-green-500">{price}€</span>
        <Link href={`/ads/${id}`} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Voir plus
        </Link>
      </div>
    </div>
  )
}

export default AnnoucementCard
