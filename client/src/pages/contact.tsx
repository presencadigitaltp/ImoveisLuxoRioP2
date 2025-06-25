import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import ContactForm from '@/components/contact-form';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';

const Contact = () => {
  const handleSocialClick = (platform: string) => {
    trackEvent('social_click', 'contact', platform);
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', 'contact', 'phone_number');
    window.open('tel:+552133334444');
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'contact', 'whatsapp_number');
    window.open('https://wa.me/5521999998888', '_blank');
  };

  const handleEmailClick = () => {
    trackEvent('email_click', 'contact', 'email_address');
    window.open('mailto:contato@imoveisluxorio.com.br');
  };

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Telefone',
      value: '(21) 3333-4444',
      description: 'Seg a Sex, 8h às 18h',
      action: handlePhoneClick,
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      value: '(21) 99999-8888',
      description: '24h por dia, 7 dias por semana',
      action: handleWhatsAppClick,
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'contato@imoveisluxorio.com.br',
      description: 'Resposta em até 2 horas',
      action: handleEmailClick,
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Endereço',
      value: 'Av. Atlântica, 1702 - Copacabana',
      description: 'Rio de Janeiro - RJ, CEP: 22021-001',
      action: () => trackEvent('address_click', 'contact', 'office_location'),
    },
  ];

  const officeHours = [
    { day: 'Segunda a Sexta', hours: '8:00 - 18:00' },
    { day: 'Sábados', hours: '9:00 - 15:00' },
    { day: 'Domingos', hours: '10:00 - 14:00' },
    { day: 'Feriados', hours: 'Sob consulta' },
  ];

  const faqs = [
    {
      question: 'Como funciona o agendamento de visitas?',
      answer: 'Você pode agendar visitas através do nosso formulário, WhatsApp ou telefone. Nossa equipe entrará em contato para confirmar horário e organizar todos os detalhes.',
    },
    {
      question: 'Vocês trabalham com financiamento?',
      answer: 'Sim! Temos parcerias com os principais bancos e instituições financeiras para oferecer as melhores condições de financiamento para nossos clientes.',
    },
    {
      question: 'Como funciona a personalização com IA?',
      answer: 'Nossa tecnologia de IA permite visualizar diferentes estilos de decoração nos imóveis instantaneamente, além de tours virtuais com áudio personalizado.',
    },
    {
      question: 'Vocês atendem outros estados?',
      answer: 'Atualmente focamos no Rio de Janeiro, mas estamos expandindo. Entre em contato para verificar disponibilidade em sua região.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-playfair text-4xl md:text-6xl font-bold text-pearl-white mb-6"
              variants={fadeInUp}
            >
              Entre em <span className="text-premium-gold">Contato</span>
            </motion.h1>
            <motion.p
              className="font-montserrat text-xl text-platinum-gray leading-relaxed"
              variants={fadeInUp}
            >
              Estamos prontos para ajudá-lo a encontrar o imóvel perfeito. Nossa equipe 
              especializada oferece atendimento personalizado e consultoria completa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="glass-morphism bg-transparent border-premium-gold/20 h-full cursor-pointer"
                  onClick={info.action}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className={`${info.icon} text-diamond-black text-2xl`}></i>
                    </div>
                    <h3 className="font-montserrat font-semibold text-pearl-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-premium-gold font-medium mb-2">
                      {info.value}
                    </p>
                    <p className="text-platinum-gray text-sm">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Form */}
            <motion.div variants={fadeInLeft}>
              <ContactForm />
            </motion.div>

            {/* Additional Information */}
            <motion.div className="space-y-8" variants={fadeInRight}>
              {/* Office Hours */}
              <Card className="glass-morphism bg-transparent border-premium-gold/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-premium-gold/20 last:border-b-0">
                        <span className="font-montserrat text-platinum-gray">
                          {schedule.day}
                        </span>
                        <span className="font-montserrat font-medium text-premium-gold">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="glass-morphism bg-transparent border-premium-gold/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
                    Redes Sociais
                  </h3>
                  <p className="text-platinum-gray mb-6">
                    Siga-nos para ficar por dentro das novidades e oportunidades exclusivas.
                  </p>
                  <div className="flex space-x-4">
                    {[
                      { platform: 'instagram', icon: 'fab fa-instagram', url: '#' },
                      { platform: 'facebook', icon: 'fab fa-facebook', url: '#' },
                      { platform: 'tiktok', icon: 'fab fa-tiktok', url: '#' },
                      { platform: 'youtube', icon: 'fab fa-youtube', url: '#' },
                    ].map((social, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          onClick={() => handleSocialClick(social.platform)}
                          className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
                        >
                          <i className={social.icon}></i>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="glass-morphism bg-transparent border-premium-gold/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-4">
                    Atendimento de Emergência
                  </h3>
                  <p className="text-platinum-gray mb-4">
                    Para situações urgentes fora do horário comercial:
                  </p>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-luxury-red hover:bg-premium-gold hover:text-diamond-black py-3 rounded-lg font-montserrat font-medium transition-all duration-300"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    WhatsApp 24h: (21) 99999-8888
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6">
              Perguntas <span className="text-premium-gold">Frequentes</span>
            </h2>
            <p className="font-montserrat text-xl text-platinum-gray max-w-3xl mx-auto">
              Encontre respostas para as dúvidas mais comuns dos nossos clientes
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="glass-morphism bg-transparent border-premium-gold/20">
                  <CardContent className="p-8">
                    <h3 className="font-montserrat text-lg font-semibold text-pearl-white mb-4">
                      <i className="fas fa-question-circle text-premium-gold mr-3"></i>
                      {faq.question}
                    </h3>
                    <p className="text-platinum-gray leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-16 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold text-pearl-white mb-4">
              Nossa <span className="text-premium-gold">Localização</span>
            </h2>
            <p className="font-montserrat text-lg text-platinum-gray">
              Visite nosso escritório na orla de Copacabana
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="glass-morphism bg-transparent border-premium-gold/20 overflow-hidden">
              <CardContent className="p-0">
                {/* Map placeholder - in a real app, integrate with Google Maps */}
                <div className="relative h-96 bg-gradient-to-br from-graphite-gray to-diamond-black flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-map-marker-alt text-premium-gold text-6xl mb-4"></i>
                    <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-2">
                      Av. Atlântica, 1702
                    </h3>
                    <p className="text-platinum-gray mb-4">
                      Copacabana, Rio de Janeiro - RJ
                    </p>
                    <Button
                      onClick={() => {
                        trackEvent('directions_click', 'contact', 'google_maps');
                        window.open('https://maps.google.com/?q=Av.+Atlântica,+1702,+Copacabana,+Rio+de+Janeiro', '_blank');
                      }}
                      className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black px-6 py-2 rounded-full font-montserrat font-medium transition-all duration-300"
                    >
                      <i className="fas fa-directions mr-2"></i>
                      Como Chegar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
