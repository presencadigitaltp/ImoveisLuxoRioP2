import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'wouter';

const About = () => {
  const handleContactClick = () => {
    trackEvent('contact_click', 'about', 'cta_button');
  };

  const stats = [
    { number: '15+', label: 'Anos de Experiência', icon: 'fas fa-calendar-alt' },
    { number: '500+', label: 'Propriedades Vendidas', icon: 'fas fa-home' },
    { number: '1.2K+', label: 'Clientes Satisfeitos', icon: 'fas fa-users' },
    { number: '25+', label: 'Prêmios Recebidos', icon: 'fas fa-trophy' },
    { number: '98%', label: 'Taxa de Satisfação', icon: 'fas fa-star' },
    { number: 'R$ 2B+', label: 'Volume de Vendas', icon: 'fas fa-chart-line' },
  ];

  const team = [
    {
      name: 'Maria Silva',
      role: 'CEO & Fundadora',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
      bio: 'Especialista em mercado imobiliário de luxo com mais de 20 anos de experiência.',
    },
    {
      name: 'João Santos',
      role: 'Diretor Comercial',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
      bio: 'Expert em negociações de alto valor e relacionamento com clientes VIP.',
    },
    {
      name: 'Ana Costa',
      role: 'Diretora de Tecnologia',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
      bio: 'Responsável pela inovação tecnológica e implementação de soluções com IA.',
    },
    {
      name: 'Carlos Mendes',
      role: 'Diretor de Marketing',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300',
      bio: 'Especialista em marketing digital e estratégias de branding para o mercado de luxo.',
    },
  ];

  const values = [
    {
      icon: 'fas fa-award',
      title: 'Excelência',
      description: 'Comprometidos em oferecer serviços de qualidade excepcional em todos os aspectos do nosso trabalho.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Transparência',
      description: 'Construímos relacionamentos baseados na confiança, honestidade e comunicação clara.',
    },
    {
      icon: 'fas fa-rocket',
      title: 'Inovação',
      description: 'Utilizamos tecnologia de ponta e soluções inovadoras para transformar a experiência imobiliária.',
    },
    {
      icon: 'fas fa-heart',
      title: 'Compromisso',
      description: 'Dedicados a realizar os sonhos dos nossos clientes e superar suas expectativas.',
    },
  ];

  const timeline = [
    {
      year: '2008',
      title: 'Fundação',
      description: 'Início das atividades com foco em imóveis de alto padrão no Rio de Janeiro.',
    },
    {
      year: '2012',
      title: 'Expansão',
      description: 'Abertura de nova filial e especialização em propriedades de luxo.',
    },
    {
      year: '2016',
      title: 'Tecnologia',
      description: 'Implementação de plataforma digital e início dos investimentos em tecnologia.',
    },
    {
      year: '2020',
      title: 'Inovação IA',
      description: 'Lançamento das primeiras soluções com inteligência artificial.',
    },
    {
      year: '2024',
      title: 'Liderança',
      description: 'Consolidação como líder em imóveis de luxo com tecnologia avançada.',
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
              Nossa <span className="text-premium-gold">História</span>
            </motion.h1>
            <motion.p
              className="font-montserrat text-xl text-platinum-gray leading-relaxed"
              variants={fadeInUp}
            >
              Há mais de 15 anos conectando pessoas aos imóveis dos seus sonhos no Rio de Janeiro, 
              combinando tradição, excelência e inovação tecnológica.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-morphism bg-transparent border-premium-gold/20 p-6">
                  <CardContent className="p-0">
                    <i className={`${stat.icon} text-premium-gold text-3xl mb-4`}></i>
                    <div className="font-playfair text-3xl font-bold text-pearl-white mb-2">
                      {stat.number}
                    </div>
                    <div className="font-montserrat text-sm text-platinum-gray">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6">
              Nossos <span className="text-premium-gold">Valores</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <Card className="glass-morphism bg-transparent border-premium-gold/20 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-premium-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className={`${value.icon} text-diamond-black text-2xl`}></i>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-pearl-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-platinum-gray leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission and Vision */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft}>
              <Card className="glass-morphism bg-transparent border-premium-gold/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-luxury-red rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-bullseye text-pearl-white text-xl"></i>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-pearl-white">
                      Nossa Missão
                    </h3>
                  </div>
                  <p className="text-platinum-gray leading-relaxed">
                    Conectar pessoas aos imóveis dos seus sonhos, oferecendo experiências 
                    excepcionais através da combinação de expertise tradicional com 
                    tecnologia inovadora, sempre priorizando a excelência no atendimento 
                    e a satisfação total dos nossos clientes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInRight}>
              <Card className="glass-morphism bg-transparent border-premium-gold/20 h-full">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-eye text-diamond-black text-xl"></i>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-pearl-white">
                      Nossa Visão
                    </h3>
                  </div>
                  <p className="text-platinum-gray leading-relaxed">
                    Ser reconhecida como a imobiliária mais inovadora e confiável do 
                    mercado de luxo no Rio de Janeiro, referência em tecnologia aplicada 
                    ao setor imobiliário e líder em satisfação do cliente, expandindo 
                    nossa presença para outras regiões do Brasil.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
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
              Nossa <span className="text-premium-gold">Jornada</span>
            </h2>
            <p className="font-montserrat text-xl text-platinum-gray max-w-3xl mx-auto">
              Conheça os marcos importantes da nossa trajetória rumo à excelência
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-premium-gold/30 hidden lg:block"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                variants={fadeInUp}
              >
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <Card className="glass-morphism bg-transparent border-premium-gold/20">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-premium-gold rounded-full flex items-center justify-center mr-4">
                          <span className="font-montserrat font-bold text-diamond-black">
                            {item.year.slice(-2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-playfair text-2xl font-bold text-premium-gold">
                            {item.year}
                          </div>
                          <h3 className="font-montserrat text-lg font-semibold text-pearl-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-platinum-gray leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-premium-gold rounded-full border-4 border-diamond-black"></div>
                </div>

                <div className="lg:w-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 luxury-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6">
              Nossa <span className="text-premium-gold">Equipe</span>
            </h2>
            <p className="font-montserrat text-xl text-platinum-gray max-w-3xl mx-auto">
              Profissionais experientes e apaixonados por oferecer o melhor serviço
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-morphism bg-transparent border-premium-gold/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-diamond-black/80 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-playfair text-xl font-bold text-pearl-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-premium-gold font-montserrat font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-platinum-gray text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 marble-texture">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-playfair text-4xl md:text-5xl font-bold text-pearl-white mb-6"
              variants={fadeInUp}
            >
              Pronto para Encontrar seu <span className="text-premium-gold">Imóvel dos Sonhos?</span>
            </motion.h2>
            <motion.p
              className="font-montserrat text-xl text-platinum-gray mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              Nossa equipe está pronta para ajudá-lo a encontrar a propriedade perfeita. 
              Entre em contato conosco e descubra como podemos tornar seus sonhos realidade.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              variants={fadeInUp}
            >
              <Link href="/contato">
                <Button
                  onClick={handleContactClick}
                  className="btn-3d bg-luxury-red hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-500"
                >
                  <i className="fas fa-envelope mr-3"></i>
                  Entre em Contato
                </Button>
              </Link>
              <Link href="/imoveis">
                <Button
                  variant="outline"
                  className="btn-3d border-2 border-premium-gold hover:bg-premium-gold hover:text-diamond-black px-8 py-4 rounded-full font-montserrat font-semibold text-lg transition-all duration-500"
                >
                  <i className="fas fa-search mr-3"></i>
                  Ver Imóveis
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default About;
