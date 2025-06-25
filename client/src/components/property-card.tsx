import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { scaleIn } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'wouter';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  rating: number;
  image: string;
  badge?: string;
  badgeColor?: 'luxury' | 'gold' | 'gray';
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    trackEvent('toggle_favorite', 'property', property.id);
  };

  const handleAITourClick = () => {
    trackEvent('start_ai_tour', 'property', property.id);
  };

  const handleCustomizeDecorClick = () => {
    trackEvent('customize_decor', 'property', property.id);
  };

  const getBadgeColor = () => {
    switch (property.badgeColor) {
      case 'luxury':
        return 'bg-luxury-red text-pearl-white';
      case 'gold':
        return 'bg-premium-gold text-diamond-black';
      case 'gray':
        default:
        return 'bg-graphite-gray text-pearl-white';
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -20, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card className="property-card glass-morphism rounded-2xl overflow-hidden group bg-transparent border-premium-gold/20">
        <div className="relative overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.title}
            className="property-image w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges and Buttons Overlay */}
          <div className="absolute top-4 left-4">
            {property.badge && (
              <Badge className={`${getBadgeColor()} px-3 py-1 rounded-full text-sm font-poppins font-medium animate-luxury-pulse`}>
                {property.badge}
              </Badge>
            )}
          </div>
          
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
            >
              <i className={`${isFavorite ? 'fas' : 'far'} fa-heart ${isFavorite ? 'text-luxury-red' : ''}`}></i>
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4">
            <Button
              onClick={handleAITourClick}
              className="glass-morphism px-3 py-1 rounded-full text-sm font-poppins font-medium hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 btn-3d"
            >
              <i className="fas fa-robot mr-2"></i>
              Tour IA
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-cinzel text-2xl font-bold text-premium-gold animate-gold-shimmer">
              {property.price}
            </span>
            <div className="flex items-center text-sm text-platinum-gray">
              <i className="fas fa-star text-premium-gold mr-1"></i>
              <span>{property.rating}</span>
            </div>
          </div>

          <h3 className="font-cormorant text-xl font-semibold text-pearl-white mb-2">
            {property.title}
          </h3>
          
          <p className="text-platinum-gray text-sm mb-4 flex items-center">
            <i className="fas fa-map-marker-alt text-premium-gold mr-2"></i>
            <span>{property.location}</span>
          </p>

          <div className="flex items-center justify-between text-sm text-platinum-gray mb-6">
            <div className="flex items-center">
              <i className="fas fa-bed mr-1"></i>
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-bath mr-1"></i>
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-expand-arrows-alt mr-1"></i>
              <span>{property.area}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/imovel/${property.id}`} className="flex-1">
              <Button className="w-full bg-luxury-red hover:bg-premium-gold hover:text-diamond-black py-3 rounded-lg font-poppins font-medium transition-all duration-300 btn-3d">
                Ver Detalhes
              </Button>
            </Link>
            <Button
              onClick={handleCustomizeDecorClick}
              variant="outline"
              className="glass-morphism px-4 py-3 rounded-lg hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 border-premium-gold/30"
            >
              <i className="fas fa-palette"></i>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
