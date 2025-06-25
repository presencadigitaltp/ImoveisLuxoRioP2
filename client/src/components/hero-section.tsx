import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer, floatAnimation, parallaxAnimation } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'wouter';

const HeroSection = () => {
  const handleExploreClick = () => {
    trackEvent('explore_properties', 'hero', 'main_cta');
  };

  const handleScheduleClick = () => {
    trackEvent('schedule_visit', 'hero', 'secondary_cta');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/attached_assets/Create_a_visually_202506252236_1750887401969.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-overlay" />
        
        {/* Luxury Overlay Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)`
          }} />
        </div>
      </div>

      {/* Parallax Gold Lines */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-premium-gold to-transparent opacity-30"
          variants={parallaxAnimation}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-premium-gold to-transparent opacity-30"
          variants={parallaxAnimation}
          animate="animate"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center glass-morphism px-4 py-2 rounded-full mb-8"
            variants={floatAnimation}
            animate="animate"
          >
            <i className="fas fa-crown text-premium-gold mr-2"></i>
            <span className="font-poppins text-sm font-medium">
              Propriedades Exclusivas no Rio de Janeiro
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            variants={fadeInUp}
          >
            <span className="text-pearl-white">Luxo</span>
            <span className="text-premium-gold"> & </span>
            <span className="text-pearl-white">Exclusividade</span>
            <br />
            <span className="text-luxury-red">no Rio de Janeiro</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-cormorant text-xl md:text-2xl text-platinum-gray max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            Descubra imóveis únicos com tecnologia IA avançada, tours virtuais imersivos 
            e decoração personalizada instantânea.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            variants={fadeInUp}
          >
            <Link href="/imoveis">
              <Button
                onClick={handleExploreClick}
                className="btn-3d glass-morphism bg-luxury-red hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all duration-500 shine-effect group relative overflow-hidden transform-gpu perspective-1000"
              >
                <i className="fas fa-search mr-3 group-hover:rotate-12 transition-transform duration-300"></i>
                Explorar Imóveis
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </Button>
            </Link>

            <Link href="/contato">
              <Button
                onClick={handleScheduleClick}
                variant="outline"
                className="btn-3d glass-morphism border-2 border-premium-gold hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-poppins font-semibold text-lg transition-all duration-500 group transform-gpu perspective-1000"
              >
                <i className="fas fa-calendar-alt mr-3 group-hover:scale-110 transition-transform duration-300"></i>
                Agendar Visita
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="font-cinzel text-3xl md:text-4xl font-bold text-premium-gold mb-2">
                500+
              </div>
              <div className="font-poppins text-sm text-platinum-gray">
                Propriedades
              </div>
            </div>
            <div className="text-center">
              <div className="font-cinzel text-3xl md:text-4xl font-bold text-premium-gold mb-2">
                1.2K+
              </div>
              <div className="font-poppins text-sm text-platinum-gray">
                Clientes Satisfeitos
              </div>
            </div>
            <div className="text-center">
              <div className="font-cinzel text-3xl md:text-4xl font-bold text-premium-gold mb-2">
                15+
              </div>
              <div className="font-poppins text-sm text-platinum-gray">
                Anos de Experiência
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-premium-gold rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-premium-gold rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
