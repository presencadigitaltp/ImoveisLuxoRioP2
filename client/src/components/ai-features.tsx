import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';

const AIFeatures = () => {
  const features = [
    {
      icon: 'fas fa-palette',
      title: 'Decoração IA Personalizada',
      description: 'Visualize diferentes estilos decorativos instantaneamente. Escolha entre minimalista, clássico, moderno ou industrial com nossa IA avançada.',
      action: 'try_decoration',
      buttonText: 'Experimentar Agora'
    },
    {
      icon: 'fas fa-headphones',
      title: 'Tour Guiado com Áudio IA',
      description: 'Experimente tours imersivos com narração inteligente, destacando cada detalhe e ambiente do imóvel de forma cativante.',
      action: 'start_audio_tour',
      buttonText: 'Iniciar Tour'
    },
    {
      icon: 'fas fa-brain',
      title: 'Recomendações Inteligentes',
      description: 'Nossa IA analisa suas preferências e comportamento para sugerir os imóveis perfeitos para seu perfil e necessidades.',
      action: 'view_recommendations',
      buttonText: 'Ver Sugestões'
    }
  ];

  const handleFeatureClick = (action: string) => {
    trackEvent('ai_feature_click', 'features', action);
  };

  return (
    <section className="py-20 luxury-gradient">
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
            Tecnologia <span className="text-premium-gold">IA Avançada</span>
          </motion.h2>
          <motion.p
            className="font-montserrat text-xl text-platinum-gray max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Revolucione sua experiência imobiliária com inteligência artificial de última geração
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-morphism p-8 rounded-2xl bg-transparent border-premium-gold/20 h-full">
                <CardContent className="p-0">
                  <motion.div
                    className="w-16 h-16 bg-premium-gold rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <i className={`${feature.icon} text-diamond-black text-2xl`}></i>
                  </motion.div>

                  <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-platinum-gray mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <Button
                    onClick={() => handleFeatureClick(feature.action)}
                    variant="ghost"
                    className="text-premium-gold font-montserrat font-medium hover:text-pearl-white transition-colors duration-300 group p-0"
                  >
                    {feature.buttonText}
                    <motion.i
                      className="fas fa-arrow-right ml-2"
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIFeatures;
