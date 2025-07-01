import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import PropertyCard from '@/components/property-card';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('price-desc');

  // Mock data - in a real app, this would come from an API
  const allProperties = [
    {
      id: '1',
      title: 'Cobertura Luxuosa em Ipanema',
      price: 'R$ 4.5M',
      location: 'Ipanema, Rio de Janeiro',
      bedrooms: 4,
      bathrooms: 3,
      area: '320m²',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Destaque',
      badgeColor: 'luxury' as const,
      type: 'cobertura',
      numericPrice: 4500000,
    },
    {
      id: '2',
      title: 'Mansão Moderna na Barra',
      price: 'R$ 8.2M',
      location: 'Barra da Tijuca, Rio de Janeiro',
      bedrooms: 6,
      bathrooms: 5,
      area: '850m²',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Novo',
      badgeColor: 'gold' as const,
      type: 'casa',
      numericPrice: 8200000,
    },
    {
      id: '3',
      title: 'Apartamento de Luxo em Copacabana',
      price: 'R$ 3.1M',
      location: 'Copacabana, Rio de Janeiro',
      bedrooms: 3,
      bathrooms: 2,
      area: '180m²',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Exclusivo',
      badgeColor: 'gray' as const,
      type: 'apartamento',
      numericPrice: 3100000,
    },
    {
      id: '4',
      title: 'Penthouse Vista Mar em Leblon',
      price: 'R$ 12.5M',
      location: 'Leblon, Rio de Janeiro',
      bedrooms: 5,
      bathrooms: 4,
      area: '450m²',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Premium',
      badgeColor: 'gold' as const,
      type: 'cobertura',
      numericPrice: 12500000,
    },
    {
      id: '5',
      title: 'Casa Colonial em Santa Teresa',
      price: 'R$ 2.8M',
      location: 'Santa Teresa, Rio de Janeiro',
      bedrooms: 4,
      bathrooms: 3,
      area: '280m²',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Histórico',
      badgeColor: 'gray' as const,
      type: 'casa',
      numericPrice: 2800000,
    },
    {
      id: '6',
      title: 'Apartamento Moderno em Botafogo',
      price: 'R$ 1.9M',
      location: 'Botafogo, Rio de Janeiro',
      bedrooms: 2,
      bathrooms: 2,
      area: '120m²',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      badge: 'Oportunidade',
      badgeColor: 'luxury' as const,
      type: 'apartamento',
      numericPrice: 1900000,
    },
  ];

  const handleSearch = () => {
    trackEvent('property_search', 'properties', searchTerm);
  };

  const handleFilterChange = () => {
    trackEvent('property_filter_change', 'properties', 'filters_applied');
  };

  const filteredProperties = allProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = property.numericPrice >= priceRange[0] && property.numericPrice <= priceRange[1];
    const matchesLocation = !selectedLocation || selectedLocation === 'all' || property.location.includes(selectedLocation);
    const matchesType = !selectedType || selectedType === 'all' || property.type === selectedType;

    return matchesSearch && matchesPrice && matchesLocation && matchesType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.numericPrice - b.numericPrice;
      case 'price-desc':
        return b.numericPrice - a.numericPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'area':
        return parseInt(b.area) - parseInt(a.area);
      default:
        return 0;
    }
  });

  const locations = ['Ipanema', 'Copacabana', 'Leblon', 'Barra da Tijuca', 'Botafogo', 'Santa Teresa'];
  const propertyTypes = [
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'cobertura', label: 'Cobertura' },
  ];

  const sortOptions = [
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'rating', label: 'Melhor Avaliação' },
    { value: 'area', label: 'Maior Área' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-pearl-white mb-6">
              Nossos <span className="text-premium-gold">Imóveis</span>
            </h1>
            <p className="font-cormorant text-xl text-platinum-gray max-w-3xl mx-auto">
              Descubra nossa seleção exclusiva de propriedades de luxo no Rio de Janeiro
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="glass-morphism bg-transparent border-premium-gold/20 sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-cinzel text-2xl font-bold text-pearl-white mb-6">
                  Filtros
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block font-poppins text-sm font-medium text-platinum-gray mb-2">
                    Buscar
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite sua busca..."
                      className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold"
                    />
                    <Button
                      onClick={handleSearch}
                      className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black"
                    >
                      <i className="fas fa-search"></i>
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block font-poppins text-sm font-medium text-platinum-gray mb-2">
                    Faixa de Preço
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value);
                      handleFilterChange();
                    }}
                    max={50000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-platinum-gray mt-2">
                    <span>R$ {(priceRange[0] / 1000000).toFixed(1)}M</span>
                    <span>R$ {(priceRange[1] / 1000000).toFixed(1)}M</span>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block font-montserrat text-sm font-medium text-platinum-gray mb-2">
                    Localização
                  </label>
                  <Select value={selectedLocation} onValueChange={(value) => {
                    setSelectedLocation(value);
                    handleFilterChange();
                  }}>
                    <SelectTrigger className="bg-graphite-gray border-premium-gold/30 text-pearl-white">
                      <SelectValue placeholder="Selecione o bairro" />
                    </SelectTrigger>
                    <SelectContent className="bg-graphite-gray border-premium-gold/30">
                      <SelectItem value="all" className="text-pearl-white">Todos os bairros</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location} className="text-pearl-white">
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="mb-6">
                  <label className="block font-montserrat text-sm font-medium text-platinum-gray mb-2">
                    Tipo de Imóvel
                  </label>
                  <Select value={selectedType} onValueChange={(value) => {
                    setSelectedType(value);
                    handleFilterChange();
                  }}>
                    <SelectTrigger className="bg-graphite-gray border-premium-gold/30 text-pearl-white">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-graphite-gray border-premium-gold/30">
                      <SelectItem value="all" className="text-pearl-white">Todos os tipos</SelectItem>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-pearl-white">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 50000000]);
                    setSelectedLocation('all');
                    setSelectedType('all');
                    trackEvent('clear_filters', 'properties', 'filters_cleared');
                  }}
                  variant="outline"
                  className="w-full border-premium-gold/30 text-premium-gold hover:bg-premium-gold hover:text-diamond-black"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results Header */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <div>
                <p className="text-platinum-gray">
                  Encontrados <span className="text-premium-gold font-semibold">{sortedProperties.length}</span> imóveis
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-platinum-gray">Ordenar por:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-graphite-gray border-premium-gold/30 text-pearl-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-graphite-gray border-premium-gold/30">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-pearl-white">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Properties Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </motion.div>

            {/* No Results */}
            {sortedProperties.length === 0 && (
              <motion.div
                className="text-center py-16"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <i className="fas fa-search text-6xl text-premium-gold/30 mb-6"></i>
                <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-4">
                  Nenhum imóvel encontrado
                </h3>
                <p className="text-platinum-gray mb-6">
                  Tente ajustar seus filtros ou entre em contato conosco para encontrar o imóvel perfeito.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 50000000]);
                    setSelectedLocation('');
                    setSelectedType('');
                  }}
                  className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black"
                >
                  Limpar Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Properties;
