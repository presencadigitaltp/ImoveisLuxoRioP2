import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import logoPath from '@assets/Default_Elegant_circular_logo_for_Imveis_Luxo_Rio_resembling_a_0-removebg-preview_1750876618851.png';

const Footer = () => {
  const handleSocialClick = (platform: string) => {
    trackEvent('social_click', 'footer', platform);
  };

  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { href: '/', label: 'Início' },
    { href: '/imoveis', label: 'Imóveis' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  const services = [
    { href: '#', label: 'Compra' },
    { href: '#', label: 'Venda' },
    { href: '#', label: 'Locação' },
    { href: '#', label: 'Investimento' },
    { href: '#', label: 'Consultoria IA' },
  ];

  const socialLinks = [
    { icon: 'fab fa-instagram', url: '#', platform: 'instagram' },
    { icon: 'fab fa-facebook', url: '#', platform: 'facebook' },
    { icon: 'fab fa-tiktok', url: '#', platform: 'tiktok' },
    { icon: 'fab fa-youtube', url: '#', platform: 'youtube' },
  ];

  return (
    <footer className="bg-diamond-black py-12 border-t border-premium-gold/20">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div className="col-span-1 md:col-span-2" variants={fadeInUp}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={logoPath} 
                  alt="Imóveis Luxo Rio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-pearl-white">
                  Imóveis Luxo Rio
                </h3>
                <p className="font-montserrat text-xs text-premium-gold">
                  Propriedades Exclusivas
                </p>
              </div>
            </div>

            <p className="text-platinum-gray mb-6 leading-relaxed">
              Especialistas em imóveis de luxo no Rio de Janeiro, combinando tradição 
              e inovação tecnológica para oferecer experiências únicas aos nossos clientes.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSocialClick(social.platform)}
                    className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-diamond-black transition-all duration-300"
                  >
                    <i className={social.icon}></i>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-montserrat font-semibold text-pearl-white mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      className="text-platinum-gray hover:text-premium-gold transition-colors duration-300 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="font-montserrat font-semibold text-pearl-white mb-4">
              Serviços
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.a
                    href={service.href}
                    className="text-platinum-gray hover:text-premium-gold transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    {service.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-premium-gold/20 pt-8 mt-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-platinum-gray text-sm mb-4 md:mb-0">
              © {currentYear} Imóveis Luxo Rio. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-platinum-gray hover:text-premium-gold transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Política de Privacidade
              </motion.a>
              <motion.a
                href="#"
                className="text-platinum-gray hover:text-premium-gold transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Termos de Uso
              </motion.a>
              <motion.a
                href="#"
                className="text-platinum-gray hover:text-premium-gold transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                LGPD
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
