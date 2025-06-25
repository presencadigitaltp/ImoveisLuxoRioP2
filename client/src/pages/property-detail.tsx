import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { useToast } from '@/hooks/use-toast';

const PropertyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedDecorStyle, setSelectedDecorStyle] = useState('');

  // Mock property data - in a real app, this would come from an API based on the ID
  const property = {
    id: id || '1',
    title: 'Cobertura Luxuosa em Ipanema',
    price: 'R$ 4.500.000',
    location: 'Ipanema, Rio de Janeiro',
    fullAddress: 'Rua Vieira Souto, 500 - Ipanema, Rio de Janeiro - RJ',
    bedrooms: 4,
    bathrooms: 3,
    area: '320m²',
    parking: 2,
    rating: 4.9,
    description: 'Esta magnífica cobertura oferece vistas deslumbrantes da praia de Ipanema e combina luxo contemporâneo com elegância atemporal. Com acabamentos de primeira linha e tecnologia de ponta, este imóvel representa o que há de melhor no mercado imobiliário carioca.',
    features: [
      'Vista panorâmica da praia',
      'Piscina privativa',
      'Terraço gourmet',
      'Ar condicionado central',
      'Automação residencial',
      'Segurança 24h',
      'Academia no prédio',
      'Spa e sauna',
      'Heliponto',
      'Concierge'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
    ],
    badge: 'Destaque',
    badgeColor: 'luxury' as const,
    yearBuilt: 2020,
    propertyType: 'Cobertura',
    agent: {
      name: 'Maria Silva',
      phone: '(21) 99999-8888',
      email: 'maria@imoveisluxorio.com.br',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200'
    }
  };

  const decorStyles = [
    { id: 'minimalista', name: 'Minimalista', preview: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
    { id: 'classico', name: 'Clássico', preview: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
    { id: 'moderno', name: 'Moderno', preview: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' },
    { id: 'industrial', name: 'Industrial', preview: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300' }
  ];

  const handleStartAudioTour = () => {
    setIsPlaying(!isPlaying);
    trackEvent('start_audio_tour', 'property_detail', property.id);
    toast({
      title: isPlaying ? 'Tour pausado' : 'Tour iniciado',
      description: isPlaying ? 'Tour de áudio pausado' : 'Iniciando tour de áudio com IA...',
    });
  };

  const handleDecorCustomization = (style: string) => {
    setSelectedDecorStyle(style);
    trackEvent('customize_decor', 'property_detail', style);
    toast({
      title: 'Decoração personalizada',
      description: `Aplicando estilo ${style} com IA...`,
    });
  };

  const handleScheduleVisit = () => {
    trackEvent('schedule_visit', 'property_detail', property.id);
  };

  const handleContactAgent = () => {
    trackEvent('contact_agent', 'property_detail', property.agent.name);
    window.open(`https://wa.me/5521999998888?text=Olá! Tenho interesse na propriedade: ${property.title}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Property Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            className="mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <nav className="text-sm text-platinum-gray">
              <Link href="/" className="hover:text-premium-gold transition-colors">
                Início
              </Link>
              {' / '}
              <Link href="/imoveis" className="hover:text-premium-gold transition-colors">
                Imóveis
              </Link>
              {' / '}
              <span className="text-pearl-white">{property.title}</span>
            </nav>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="font-playfair text-3xl lg:text-5xl font-bold text-pearl-white">
                  {property.title}
                </h1>
                <Badge className="bg-luxury-red text-pearl-white px-3 py-1">
                  {property.badge}
                </Badge>
              </div>
              <p className="text-platinum-gray flex items-center mb-2">
                <i className="fas fa-map-marker-alt text-premium-gold mr-2"></i>
                {property.fullAddress}
              </p>
              <div className="flex items-center gap-4 text-platinum-gray">
                <span className="flex items-center">
                  <i className="fas fa-star text-premium-gold mr-1"></i>
                  {property.rating}
                </span>
                <span>{property.propertyType}</span>
                <span>Construído em {property.yearBuilt}</span>
              </div>
            </motion.div>

            <motion.div className="text-right" variants={fadeInUp}>
              <div className="font-playfair text-4xl font-bold text-premium-gold mb-4">
                {property.price}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleScheduleVisit}
                  className="btn-3d bg-luxury-red hover:bg-premium-gold hover:text-diamond-black px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-500"
                >
                  <i className="fas fa-calendar-alt mr-2"></i>
                  Agendar Visita
                </Button>
                <Button
                  onClick={handleContactAgent}
                  variant="outline"
                  className="btn-3d border-2 border-premium-gold hover:bg-premium-gold hover:text-diamond-black px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-500"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Contato
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Main Image */}
            <motion.div className="lg:col-span-2" variants={scaleIn}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative cursor-pointer group overflow-hidden rounded-2xl">
                    <motion.img
                      src={property.images[selectedImage]}
                      alt={property.title}
                      className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                      whileHover={{ scale: 1.02 }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <i className="fas fa-expand text-white text-2xl"></i>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-diamond-black/95 border-premium-gold/30">
                  <img
                    src={property.images[selectedImage]}
                    alt={property.title}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Thumbnail Gallery */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              {property.images.slice(1).map((image, index) => (
                <motion.div
                  key={index + 1}
                  className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                    selectedImage === index + 1 ? 'ring-2 ring-premium-gold' : ''
                  }`}
                  onClick={() => setSelectedImage(index + 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Imagem ${index + 2}`}
                    className="w-full h-32 lg:h-36 object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-graphite-gray border border-premium-gold/30">
                  <TabsTrigger value="details" className="text-pearl-white data-[state=active]:bg-luxury-red">
                    Detalhes
                  </TabsTrigger>
                  <TabsTrigger value="features" className="text-pearl-white data-[state=active]:bg-luxury-red">
                    Características
                  </TabsTrigger>
                  <TabsTrigger value="ai-tour" className="text-pearl-white data-[state=active]:bg-luxury-red">
                    Tour IA
                  </TabsTrigger>
                  <TabsTrigger value="decor-ai" className="text-pearl-white data-[state=active]:bg-luxury-red">
                    Decoração IA
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-8">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="glass-morphism bg-transparent border-premium-gold/20">
                      <CardContent className="p-8">
                        <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
                          Sobre o Imóvel
                        </h3>
                        <p className="text-platinum-gray leading-relaxed mb-8">
                          {property.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center">
                            <i className="fas fa-bed text-premium-gold text-2xl mb-2"></i>
                            <div className="font-playfair text-2xl font-bold text-pearl-white">
                              {property.bedrooms}
                            </div>
                            <div className="text-sm text-platinum-gray">Quartos</div>
                          </div>
                          <div className="text-center">
                            <i className="fas fa-bath text-premium-gold text-2xl mb-2"></i>
                            <div className="font-playfair text-2xl font-bold text-pearl-white">
                              {property.bathrooms}
                            </div>
                            <div className="text-sm text-platinum-gray">Banheiros</div>
                          </div>
                          <div className="text-center">
                            <i className="fas fa-expand-arrows-alt text-premium-gold text-2xl mb-2"></i>
                            <div className="font-playfair text-2xl font-bold text-pearl-white">
                              {property.area}
                            </div>
                            <div className="text-sm text-platinum-gray">Área</div>
                          </div>
                          <div className="text-center">
                            <i className="fas fa-car text-premium-gold text-2xl mb-2"></i>
                            <div className="font-playfair text-2xl font-bold text-pearl-white">
                              {property.parking}
                            </div>
                            <div className="text-sm text-platinum-gray">Vagas</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="features" className="mt-8">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="glass-morphism bg-transparent border-premium-gold/20">
                      <CardContent className="p-8">
                        <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
                          Características
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {property.features.map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center p-3 glass-morphism rounded-lg"
                              whileHover={{ x: 10 }}
                            >
                              <i className="fas fa-check text-premium-gold mr-3"></i>
                              <span className="text-pearl-white">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="ai-tour" className="mt-8">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="glass-morphism bg-transparent border-premium-gold/20">
                      <CardContent className="p-8 text-center">
                        <i className="fas fa-headphones text-premium-gold text-6xl mb-6"></i>
                        <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-4">
                          Tour Guiado com Áudio IA
                        </h3>
                        <p className="text-platinum-gray mb-8 leading-relaxed">
                          Experimente nosso tour imersivo com narração inteligente, destacando cada detalhe 
                          e ambiente do imóvel de forma cativante.
                        </p>
                        <Button
                          onClick={handleStartAudioTour}
                          className={`btn-3d px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-500 ${
                            isPlaying 
                              ? 'bg-premium-gold text-diamond-black hover:bg-luxury-red hover:text-pearl-white' 
                              : 'bg-luxury-red hover:bg-premium-gold hover:text-diamond-black'
                          }`}
                        >
                          <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} mr-3`}></i>
                          {isPlaying ? 'Pausar Tour' : 'Iniciar Tour'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="decor-ai" className="mt-8">
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="glass-morphism bg-transparent border-premium-gold/20">
                      <CardContent className="p-8">
                        <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
                          Personalização com IA
                        </h3>
                        <p className="text-platinum-gray mb-8">
                          Visualize diferentes estilos decorativos instantaneamente com nossa IA avançada.
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          {decorStyles.map((style) => (
                            <motion.div
                              key={style.id}
                              className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
                                selectedDecorStyle === style.id ? 'ring-2 ring-premium-gold' : ''
                              }`}
                              onClick={() => handleDecorCustomization(style.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <img
                                src={style.preview}
                                alt={style.name}
                                className="w-full h-32 object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                <span className="text-white font-montserrat font-medium p-3">
                                  {style.name}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Agent Contact */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Card className="glass-morphism bg-transparent border-premium-gold/20 sticky top-24">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-pearl-white mb-6">
                    Corretor Responsável
                  </h3>
                  
                  <div className="text-center mb-6">
                    <img
                      src={property.agent.photo}
                      alt={property.agent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="font-montserrat font-semibold text-pearl-white">
                      {property.agent.name}
                    </h4>
                    <p className="text-platinum-gray text-sm">Especialista em Luxo</p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={handleContactAgent}
                      className="w-full bg-luxury-red hover:bg-premium-gold hover:text-diamond-black py-3 rounded-lg font-montserrat font-medium transition-all duration-300"
                    >
                      <i className="fab fa-whatsapp mr-2"></i>
                      WhatsApp
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-premium-gold/30 text-premium-gold hover:bg-premium-gold hover:text-diamond-black py-3 rounded-lg font-montserrat font-medium transition-all duration-300"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      {property.agent.phone}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full border-premium-gold/30 text-premium-gold hover:bg-premium-gold hover:text-diamond-black py-3 rounded-lg font-montserrat font-medium transition-all duration-300"
                    >
                      <i className="fas fa-envelope mr-2"></i>
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default PropertyDetail;
