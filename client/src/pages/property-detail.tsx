import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';

const PropertyDetail = () => {
  const [match, params] = useRoute('/imovel/:id');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying360, setIsPlaying360] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showAIDecorator, setShowAIDecorator] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('sala');
  const [decorStyle, setDecorStyle] = useState('moderno');

  // Mock property data - in a real app, this would come from an API
  const property = {
    id: params?.id || '1',
    title: 'Cobertura Luxuosa em Ipanema',
    price: 'R$ 4.500.000',
    numericPrice: 4500000,
    locationShort: 'Ipanema, Rio de Janeiro',
    bedrooms: 4,
    bathrooms: 3,
    suites: 2,
    parking: 3,
    area: '320m²',
    rating: 4.9,
    yearBuilt: 2018,
    propertyType: 'Cobertura',
    status: 'Disponível',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
    ],
    badge: 'Destaque',
    badgeColor: 'luxury',
    description: 'Uma cobertura excepcional com vista panorâmica para o mar de Ipanema. Este imóvel único combina elegância contemporânea com o charme clássico do Rio de Janeiro. Acabamentos de primeira linha, materiais nobres e tecnologia de ponta criam um ambiente sofisticado e acolhedor.',
    fullDescription: 'Localizada em uma das avenidas mais prestigiosas de Ipanema, esta cobertura representa o ápice do luxo residencial carioca. Com 320m² de área privativa e terraço de 150m², oferece espaços generosos e integrados, perfeitos para receber e relaxar. A vista deslumbrante do oceano Atlântico e das montanhas do Rio de Janeiro proporciona um cenário único e inspirador.',
    features: [
      'Vista mar panorâmica de 180°',
      'Terraço com piscina privativa aquecida',
      'Acabamentos em mármore Carrara',
      'Sistema de automação residencial completo',
      'Varanda gourmet com churrasqueira',
      'Home theater com isolamento acústico',
      'Closet master com sistema de climatização',
      'Lavabo social com bancada em ônix',
      'Cozinha gourmet com ilha central',
      'Despensa e área de serviço amplas'
    ],
    amenities: [
      { icon: 'fas fa-swimmer', name: 'Piscina Infinity', description: 'Piscina privativa aquecida no terraço' },
      { icon: 'fas fa-dumbbell', name: 'Academia Completa', description: 'Equipamentos de última geração' },
      { icon: 'fas fa-shield-alt', name: 'Segurança 24h', description: 'Portaria e monitoramento integral' },
      { icon: 'fas fa-car', name: '3 Vagas Cobertas', description: 'Garagem privativa demarcada' },
      { icon: 'fas fa-wifi', name: 'Internet Fibra', description: 'Conexão de alta velocidade' },
      { icon: 'fas fa-snowflake', name: 'Climatização Central', description: 'Ar condicionado em todos ambientes' },
      { icon: 'fas fa-spa', name: 'Spa & Sauna', description: 'Área de relaxamento privativa' },
      { icon: 'fas fa-concierge-bell', name: 'Concierge', description: 'Serviço de concierge 24h' }
    ],
    location: {
      neighborhood: 'Ipanema',
      city: 'Rio de Janeiro',
      state: 'RJ',
      address: 'Avenida Vieira Souto, 123',
      nearbyPlaces: [
        { name: 'Praia de Ipanema', distance: '50m', icon: 'fas fa-umbrella-beach' },
        { name: 'Shopping Leblon', distance: '1.2km', icon: 'fas fa-shopping-bag' },
        { name: 'Metrô Ipanema', distance: '800m', icon: 'fas fa-subway' },
        { name: 'Hospital Copa Star', distance: '2km', icon: 'fas fa-hospital' },
        { name: 'Lagoa Rodrigo de Freitas', distance: '1.8km', icon: 'fas fa-water' }
      ]
    },
    agent: {
      name: 'Carlos Eduardo Silva',
      title: 'Especialista em Imóveis de Luxo',
      experience: '15 anos',
      sales: '200+ propriedades vendidas',
      phone: '(21) 99999-8888',
      email: 'carlos@imoveisluxorio.com',
      whatsapp: '5521999998888',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    specifications: {
      totalArea: '320m²',
      privateArea: '280m²',
      terraceArea: '150m²',
      floors: '1',
      orientation: 'Nascente/Poente',
      ceilingHeight: '3.2m',
      windows: 'Esquadrias em alumínio com vidro duplo',
      flooring: 'Mármore Carrara e madeira de demolição'
    },
    virtualTour: {
      available: true,
      rooms: ['Sala de Estar', 'Sala de Jantar', 'Cozinha Gourmet', 'Master Suite', 'Terraço', 'Piscina']
    },
    aiFeatures: {
      decorationStyles: ['Moderno', 'Clássico', 'Contemporâneo', 'Minimalista', 'Industrial'],
      rooms: ['Sala de Estar', 'Sala de Jantar', 'Cozinha', 'Master Suite', 'Suíte 2', 'Terraço']
    }
  };

  const handleScheduleVisit = () => {
    trackEvent('schedule_visit', 'property_detail', property.id);
  };

  const handleAITour = () => {
    trackEvent('start_ai_tour', 'property_detail', property.id);
    setIsPlaying360(true);
  };

  const handleCustomizeDecor = () => {
    trackEvent('customize_decor', 'property_detail', property.id);
    setShowAIDecorator(true);
  };

  const handle360Tour = () => {
    trackEvent('360_tour', 'property_detail', property.id);
    setShowVirtualTour(true);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    trackEvent('toggle_favorite', 'property_detail', property.id);
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_contact', 'property_detail', property.id);
    window.open(`https://wa.me/${property.agent.whatsapp}?text=Olá! Tenho interesse na ${property.title}`, '_blank');
  };

  const decorationStyles = [
    { id: 'moderno', name: 'Moderno', preview: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
    { id: 'classico', name: 'Clássico', preview: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&h=200&fit=crop' },
    { id: 'contemporaneo', name: 'Contemporâneo', preview: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=300&h=200&fit=crop' },
    { id: 'minimalista', name: 'Minimalista', preview: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' }
  ];

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-2xl font-bold text-pearl-white mb-4">Imóvel não encontrado</h1>
          <Link href="/imoveis">
            <Button className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black">
              Ver Todos os Imóveis
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-4">
        <div className="container mx-auto px-6">
          <nav className="flex items-center text-sm text-platinum-gray">
            <Link href="/" className="hover:text-premium-gold transition-colors">Início</Link>
            <i className="fas fa-chevron-right mx-2"></i>
            <Link href="/imoveis" className="hover:text-premium-gold transition-colors">Imóveis</Link>
            <i className="fas fa-chevron-right mx-2"></i>
            <span className="text-pearl-white">{property.title}</span>
          </nav>
        </div>
      </section>

      {/* Property Images Gallery */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden mb-8 group"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4">
              <div className="glass-morphism px-3 py-1 rounded-full text-sm text-pearl-white">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>

            {/* Favorite Button */}
            <motion.button
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-20 glass-morphism w-12 h-12 rounded-full flex items-center justify-center text-pearl-white hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`${isFavorite ? 'fas' : 'far'} fa-heart ${isFavorite ? 'text-luxury-red' : ''}`}></i>
            </motion.button>
            
            {/* Image Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-premium-gold scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === 0 ? property.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-morphism w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button
              onClick={() => setCurrentImageIndex((prev) => 
                prev === property.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-morphism w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Virtual Tour Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handle360Tour}
                    className="btn-3d glass-morphism px-4 py-2 rounded-full text-sm font-poppins font-medium hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    360°
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-graphite-gray border-premium-gold/30">
                  <DialogHeader>
                    <DialogTitle className="font-cinzel text-xl text-pearl-white">Tour Virtual 360°</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video bg-diamond-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-platinum-gray">
                      <i className="fas fa-play-circle text-6xl text-premium-gold mb-4"></i>
                      <p className="font-cormorant text-lg">Tour Virtual Interativo</p>
                      <p className="text-sm">Navegue pelos ambientes da propriedade</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showAIDecorator} onOpenChange={setShowAIDecorator}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleAITour}
                    className="btn-3d glass-morphism px-4 py-2 rounded-full text-sm font-poppins font-medium hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
                  >
                    <i className="fas fa-robot mr-2"></i>
                    Tour IA
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-graphite-gray border-premium-gold/30">
                  <DialogHeader>
                    <DialogTitle className="font-cinzel text-xl text-pearl-white">Tour Narrado com IA</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="aspect-video bg-diamond-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-platinum-gray">
                        <i className="fas fa-microphone text-4xl text-premium-gold mb-4"></i>
                        <p className="font-cormorant text-lg">Narração Inteligente</p>
                        <p className="text-sm">Tour personalizado com descrições detalhadas</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black">
                        <i className="fas fa-play mr-2"></i>
                        Iniciar Tour IA
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Property Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-luxury-red text-pearl-white px-4 py-2 rounded-full font-poppins font-medium animate-luxury-pulse">
                {property.badge}
              </Badge>
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <motion.div
            className="grid grid-cols-6 gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {property.images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`aspect-video rounded-lg overflow-hidden ${
                  index === currentImageIndex ? 'ring-2 ring-premium-gold' : 'opacity-70 hover:opacity-100'
                } transition-all duration-300`}
                variants={scaleIn}
              >
                <img
                  src={image}
                  alt={`Vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Details */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Property Header */}
                <motion.div className="mb-8" variants={fadeInUp}>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <Badge className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                          {property.status}
                        </Badge>
                        <span className="text-platinum-gray text-sm">{property.propertyType} • {property.yearBuilt}</span>
                      </div>
                      <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-pearl-white mb-2">
                        {property.title}
                      </h1>
                      <p className="text-platinum-gray text-lg mb-4 flex items-center">
                        <i className="fas fa-map-marker-alt text-premium-gold mr-2"></i>
                        <span>{property.location.address}, {property.location.neighborhood}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-cinzel text-3xl md:text-4xl font-bold text-premium-gold mb-2">
                        {property.price}
                      </div>
                      <div className="flex items-center text-sm text-platinum-gray">
                        <i className="fas fa-star text-premium-gold mr-1"></i>
                        <span>{property.rating} • Avaliação Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-6 glass-morphism rounded-2xl border-premium-gold/20">
                    <div className="text-center">
                      <i className="fas fa-bed text-2xl text-premium-gold mb-2"></i>
                      <p className="font-bold text-pearl-white">{property.bedrooms}</p>
                      <p className="text-sm text-platinum-gray">Quartos</p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-bath text-2xl text-premium-gold mb-2"></i>
                      <p className="font-bold text-pearl-white">{property.bathrooms}</p>
                      <p className="text-sm text-platinum-gray">Banheiros</p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-home text-2xl text-premium-gold mb-2"></i>
                      <p className="font-bold text-pearl-white">{property.suites}</p>
                      <p className="text-sm text-platinum-gray">Suítes</p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-car text-2xl text-premium-gold mb-2"></i>
                      <p className="font-bold text-pearl-white">{property.parking}</p>
                      <p className="text-sm text-platinum-gray">Vagas</p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-expand-arrows-alt text-2xl text-premium-gold mb-2"></i>
                      <p className="font-bold text-pearl-white">{property.area}</p>
                      <p className="text-sm text-platinum-gray">Área Total</p>
                    </div>
                  </div>
                </motion.div>

                {/* Property Tabs */}
                <motion.div variants={fadeInUp}>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-graphite-gray rounded-xl">
                      <TabsTrigger value="description" className="font-poppins text-pearl-white data-[state=active]:bg-premium-gold data-[state=active]:text-diamond-black rounded-lg">
                        Descrição
                      </TabsTrigger>
                      <TabsTrigger value="features" className="font-poppins text-pearl-white data-[state=active]:bg-premium-gold data-[state=active]:text-diamond-black rounded-lg">
                        Características
                      </TabsTrigger>
                      <TabsTrigger value="location" className="font-poppins text-pearl-white data-[state=active]:bg-premium-gold data-[state=active]:text-diamond-black rounded-lg">
                        Localização
                      </TabsTrigger>
                      <TabsTrigger value="amenities" className="font-poppins text-pearl-white data-[state=active]:bg-premium-gold data-[state=active]:text-diamond-black rounded-lg">
                        Comodidades
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="mt-6">
                      <Card className="glass-morphism bg-transparent border-premium-gold/20">
                        <CardContent className="p-6">
                          <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">Sobre o Imóvel</h3>
                          <p className="text-platinum-gray leading-relaxed text-lg mb-4 font-cormorant">
                            {property.description}
                          </p>
                          <p className="text-platinum-gray leading-relaxed font-cormorant">
                            {property.fullDescription}
                          </p>
                          
                          <div className="mt-6 p-4 bg-diamond-black/30 rounded-lg">
                            <h4 className="font-cinzel text-lg font-bold text-premium-gold mb-3">Especificações Técnicas</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Área Total:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.totalArea}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Área Privativa:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.privateArea}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Terraço:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.terraceArea}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Orientação:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.orientation}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Pé Direito:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.ceilingHeight}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Pavimentos:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.floors}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Esquadrias:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.windows}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-platinum-gray">Piso:</span>
                                  <span className="text-pearl-white font-medium">{property.specifications.flooring}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="features" className="mt-6">
                      <Card className="glass-morphism bg-transparent border-premium-gold/20">
                        <CardContent className="p-6">
                          <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">Características Premium</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.features.map((feature, index) => (
                              <motion.div 
                                key={index} 
                                className="flex items-center text-platinum-gray p-3 glass-morphism rounded-lg luxury-hover"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <i className="fas fa-check-circle text-premium-gold mr-3 text-lg"></i>
                                <span className="font-cormorant">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="location" className="mt-6">
                      <Card className="glass-morphism bg-transparent border-premium-gold/20">
                        <CardContent className="p-6">
                          <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">Localização Privilegiada</h3>
                          
                          <div className="mb-6">
                            <div className="aspect-video bg-diamond-black rounded-lg flex items-center justify-center mb-4">
                              <div className="text-center text-platinum-gray">
                                <i className="fas fa-map-marked-alt text-4xl text-premium-gold mb-2"></i>
                                <p className="font-cormorant text-lg">Mapa Interativo</p>
                                <p className="text-sm">Localização e pontos de interesse</p>
                              </div>
                            </div>
                          </div>

                          <h4 className="font-cinzel text-lg font-bold text-premium-gold mb-3">Pontos de Interesse Próximos</h4>
                          <div className="space-y-3">
                            {property.location.nearbyPlaces.map((place, index) => (
                              <div key={index} className="flex items-center justify-between p-3 glass-morphism rounded-lg">
                                <div className="flex items-center">
                                  <i className={`${place.icon} text-premium-gold mr-3`}></i>
                                  <span className="text-pearl-white font-cormorant">{place.name}</span>
                                </div>
                                <span className="text-platinum-gray text-sm">{place.distance}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="amenities" className="mt-6">
                      <Card className="glass-morphism bg-transparent border-premium-gold/20">
                        <CardContent className="p-6">
                          <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">Comodidades de Luxo</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {property.amenities.map((amenity, index) => (
                              <motion.div 
                                key={index} 
                                className="text-center p-4 glass-morphism rounded-lg luxury-hover"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <i className={`${amenity.icon} text-3xl text-premium-gold mb-3`}></i>
                                <h4 className="font-cormorant text-lg font-semibold text-pearl-white mb-2">{amenity.name}</h4>
                                <p className="text-platinum-gray text-sm">{amenity.description}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 space-y-6"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                {/* Contact Actions */}
                <Card className="glass-morphism bg-transparent border-premium-gold/20">
                  <CardContent className="p-6">
                    <h3 className="font-cinzel text-2xl font-bold text-pearl-white mb-6">
                      Interessado?
                    </h3>

                    <div className="space-y-4">
                      <Button
                        onClick={handleScheduleVisit}
                        className="w-full btn-3d bg-luxury-red hover:bg-premium-gold hover:text-diamond-black py-3 rounded-xl font-poppins font-medium transition-all duration-300"
                      >
                        <i className="fas fa-calendar-alt mr-2"></i>
                        Agendar Visita
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={handleCustomizeDecor}
                            variant="outline"
                            className="w-full btn-3d border-premium-gold/30 text-premium-gold hover:bg-premium-gold hover:text-diamond-black py-3 rounded-xl font-poppins font-medium transition-all duration-300"
                          >
                            <i className="fas fa-palette mr-2"></i>
                            Personalizar Decoração
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-graphite-gray border-premium-gold/30">
                          <DialogHeader>
                            <DialogTitle className="font-cinzel text-xl text-pearl-white">Decoração Personalizada com IA</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div>
                              <label className="block font-poppins text-sm font-medium text-platinum-gray mb-2">
                                Escolha o Ambiente
                              </label>
                              <select 
                                value={selectedRoom} 
                                onChange={(e) => setSelectedRoom(e.target.value)}
                                className="w-full bg-diamond-black border border-premium-gold/30 rounded-lg px-3 py-2 text-pearl-white"
                              >
                                {property.aiFeatures.rooms.map((room) => (
                                  <option key={room} value={room}>{room}</option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block font-poppins text-sm font-medium text-platinum-gray mb-3">
                                Estilo de Decoração
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                {decorationStyles.map((style) => (
                                  <button
                                    key={style.id}
                                    onClick={() => setDecorStyle(style.id)}
                                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                      decorStyle === style.id 
                                        ? 'border-premium-gold' 
                                        : 'border-transparent hover:border-premium-gold/50'
                                    }`}
                                  >
                                    <img src={style.preview} alt={style.name} className="w-full h-20 object-cover" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                      <span className="text-white text-sm font-medium">{style.name}</span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <Button className="w-full bg-luxury-red hover:bg-premium-gold hover:text-diamond-black">
                              <i className="fas fa-magic mr-2"></i>
                              Gerar Decoração IA
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        onClick={handleWhatsApp}
                        variant="outline"
                        className="w-full btn-3d border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white py-3 rounded-xl font-poppins font-medium transition-all duration-300"
                      >
                        <i className="fab fa-whatsapp mr-2"></i>
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Agent Card */}
                <Card className="glass-morphism bg-transparent border-premium-gold/20">
                  <CardContent className="p-6">
                    <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">
                      Corretor Especialista
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img 
                          src={property.agent.photo} 
                          alt={property.agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-cormorant font-semibold text-pearl-white text-lg">{property.agent.name}</p>
                        <p className="text-sm text-premium-gold">{property.agent.title}</p>
                        <p className="text-xs text-platinum-gray">{property.agent.experience}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-platinum-gray">
                        <i className="fas fa-trophy text-premium-gold mr-2 w-4"></i>
                        <span>{property.agent.sales}</span>
                      </div>
                      <div className="flex items-center text-platinum-gray">
                        <i className="fas fa-phone text-premium-gold mr-2 w-4"></i>
                        <span>{property.agent.phone}</span>
                      </div>
                      <div className="flex items-center text-platinum-gray">
                        <i className="fas fa-envelope text-premium-gold mr-2 w-4"></i>
                        <span className="text-xs">{property.agent.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-premium-gold/20">
                      <Button 
                        onClick={handleWhatsApp}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-poppins"
                      >
                        <i className="fab fa-whatsapp mr-2"></i>
                        Conversar Agora
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Calculator */}
                <Card className="glass-morphism bg-transparent border-premium-gold/20">
                  <CardContent className="p-6">
                    <h3 className="font-cinzel text-xl font-bold text-pearl-white mb-4">
                      Simulação de Financiamento
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-platinum-gray mb-1">Valor do Imóvel</label>
                        <Input 
                          value={property.price}
                          disabled
                          className="bg-diamond-black border-premium-gold/30 text-pearl-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-platinum-gray mb-1">Entrada (%)</label>
                        <Input 
                          placeholder="20"
                          className="bg-diamond-black border-premium-gold/30 text-pearl-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-platinum-gray mb-1">Prazo (anos)</label>
                        <Input 
                          placeholder="25"
                          className="bg-diamond-black border-premium-gold/30 text-pearl-white"
                        />
                      </div>
                      
                      <Button className="w-full bg-luxury-red hover:bg-premium-gold hover:text-diamond-black">
                        <i className="fas fa-calculator mr-2"></i>
                        Calcular Parcelas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default PropertyDetail;