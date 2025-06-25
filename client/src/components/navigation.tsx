import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { trackEvent } from '@/lib/analytics';
import logoPath from '@assets/Default_Elegant_circular_logo_for_Imveis_Luxo_Rio_resembling_a_0-removebg-preview_1750876618851.png';

const Navigation = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'contact', 'navigation');
    window.open('https://wa.me/5521999998888', '_blank');
  };

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/imoveis', label: 'Imóveis' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-morphism bg-diamond-black/95' 
          : 'glass-morphism'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden animate-glow">
                <img 
                  src={logoPath} 
                  alt="Imóveis Luxo Rio" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-cinzel text-xl font-bold text-pearl-white animate-elegant-sway">
                  Imóveis Luxo Rio
                </h1>
                <p className="font-poppins text-xs text-premium-gold">
                  Propriedades Exclusivas
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`font-poppins text-sm transition-colors duration-300 relative group cursor-pointer luxury-hover ${
                    location === link.href
                      ? 'text-premium-gold'
                      : 'text-pearl-white hover:text-premium-gold'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-premium-gold transition-all duration-300 ${
                    location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleWhatsAppClick}
            className="hidden md:block glass-morphism px-6 py-2 rounded-full font-poppins text-sm font-medium hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 btn-3d animate-luxury-pulse"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            WhatsApp
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-pearl-white hover:text-premium-gold"
              >
                <i className="fas fa-bars text-xl"></i>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="bg-diamond-black/95 backdrop-blur-xl border-premium-gold/20"
            >
              <div className="flex flex-col space-y-6 mt-12">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      className={`font-montserrat text-lg cursor-pointer ${
                        location === link.href
                          ? 'text-premium-gold'
                          : 'text-pearl-white hover:text-premium-gold'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 10 }}
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                ))}
                <Button
                  onClick={handleWhatsAppClick}
                  className="glass-morphism px-6 py-3 rounded-full font-montserrat font-medium hover:bg-premium-gold hover:text-diamond-black transition-all duration-300 btn-3d"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  WhatsApp
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
