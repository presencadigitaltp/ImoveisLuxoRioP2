import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import PropertyCard from '@/components/property-card';
import AIFeatures from '@/components/ai-features';
import ContactForm from '@/components/contact-form';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';

const Home = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('back_to_top_click', 'navigation', 'scroll');
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    trackEvent('property_filter', 'properties', filter);
  };

  const featuredProperties = [
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
    },
  ];

  const filterOptions = [
    { value: 'todos', label: 'Todos' },
    { value: 'apartamentos', label: 'Apartamentos' },
    { value: 'casas', label: 'Casas' },
    { value: 'coberturas', label: 'Coberturas' },
  ];

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Telefone',
      value: '(21) 3333-4444',
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: '(21) 99999-8888',
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'contato@imoveisluxorio.com.br',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Endereço',
      value: 'Av. Atlântica, 1702 - Copacabana',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      {/* Featured Properties Section */}
      <section id="imoveis" className="py-20 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6"
              variants={fadeInUp}
            >
              Propriedades <span className="text-premium-gold">Destacadas</span>
            </motion.h2>
            <motion.p
              className="font-montserrat text-xl text-platinum-gray max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Seleção exclusiva dos imóveis mais luxuosos do Rio de Janeiro, com tecnologia IA para personalização instantânea
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleFilterClick(option.value)}
                className={`glass-morphism px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  activeFilter === option.value
                    ? 'bg-premium-gold text-diamond-black'
                    : 'hover:bg-premium-gold hover:text-diamond-black'
                }`}
              >
                {option.label}
              </Button>
            ))}
          </motion.div>

          {/* Properties Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/imoveis">
              <Button className="btn-3d glass-morphism border-2 border-premium-gold hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-500">
                Ver Todos os Imóveis
                <i className="fas fa-arrow-right ml-3"></i>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <AIFeatures />

      {/* About Section */}
      <section id="sobre" className="py-20 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Content */}
            <motion.div variants={fadeInUp}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6">
                Mais de <span className="text-premium-gold">15 Anos</span><br />
                de Excelência
              </h2>

              <p className="font-montserrat text-lg text-platinum-gray mb-8 leading-relaxed">
                A Imóveis Luxo Rio é referência em propriedades exclusivas no Rio de Janeiro. 
                Nossa expertise combina tradição imobiliária com inovação tecnológica, oferecendo 
                experiências únicas aos nossos clientes.
              </p>

              <div className="space-y-6 mb-8">
                <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                  <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-award text-diamond-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-pearl-white">Missão</h4>
                    <p className="text-platinum-gray text-sm">
                      Conectar pessoas aos imóveis dos seus sonhos com excelência e inovação.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                  <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-eye text-diamond-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-pearl-white">Visão</h4>
                    <p className="text-platinum-gray text-sm">
                      Ser a imobiliária mais inovadora e confiável do mercado de luxo carioca.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center" whileHover={{ x: 10 }}>
                  <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-heart text-diamond-black text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-pearl-white">Valores</h4>
                    <p className="text-platinum-gray text-sm">
                      Transparência, excelência, inovação e compromisso com a satisfação do cliente.
                    </p>
                  </div>
                </motion.div>
              </div>

              <Link href="/sobre">
                <Button className="btn-3d bg-luxury-red hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-500">
                  Conhecer Nossa História
                  <i className="fas fa-arrow-right ml-3"></i>
                </Button>
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div className="relative" variants={fadeInUp}>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Equipe Imóveis Luxo Rio"
                className="rounded-2xl shadow-2xl w-full"
              />

              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-8 -left-8 glass-morphism p-6 rounded-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-premium-gold">98%</div>
                  <div className="font-montserrat text-sm text-platinum-gray">Satisfação</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-8 -right-8 glass-morphism p-6 rounded-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="font-playfair text-3xl font-bold text-premium-gold">25+</div>
                  <div className="font-montserrat text-sm text-platinum-gray">Prêmios</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6">
                Entre em <span className="text-premium-gold">Contato</span>
              </h2>

              <p className="font-montserrat text-lg text-platinum-gray mb-8 leading-relaxed">
                Estamos prontos para ajudá-lo a encontrar o imóvel perfeito. Nossa equipe 
                especializada oferece atendimento personalizado e consultoria completa.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                      <i className={`${info.icon} text-diamond-black`}></i>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-pearl-white">
                        {info.title}
                      </h4>
                      <p className="text-platinum-gray">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {['instagram', 'facebook', 'tiktok', 'youtube'].map((platform) => (
                  <motion.a
                    key={platform}
                    href="#"
                    className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={`fab fa-${platform}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={handleScrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-arrow-up"></i>
        </motion.button>
      )}
    </div>
  );
};

export default Home;
