import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  business: string;
  rating: number;
  review: string;
  image?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  business,
  rating,
  review,
  image
}) => {
  return (
    <div className="bg-studio-card border border-studio-border/70 p-8 rounded-lg flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Visual background glow indicator */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-indigo/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex space-x-1 mb-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              size={15}
              className={idx < rating ? 'text-yellow-500 fill-yellow-500' : 'text-studio-border'}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm md:text-base text-studio-white italic leading-relaxed mb-8 relative z-10 font-sans">
          "{review}"
        </p>
      </div>

      {/* Author Profile */}
      <div className="flex items-center gap-4 border-t border-studio-border/50 pt-4 mt-auto">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-studio-black border border-studio-border flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display font-semibold text-accent-cyan text-sm bg-gradient-to-br from-studio-card to-studio-black">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-studio-white">{name}</h4>
          <p className="text-xs text-studio-text">{business}</p>
        </div>
      </div>
    </div>
  );
};
