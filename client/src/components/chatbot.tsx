import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { trackEvent } from '@/lib/analytics';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente IA da Imóveis Luxo Rio. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackEvent('chatbot_open', 'chatbot', 'open');
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    trackEvent('chatbot_message_sent', 'chatbot', inputValue);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('preço') || input.includes('valor')) {
      return 'Nossos imóveis variam de R$ 1M a R$ 50M+. Posso ajudá-lo a encontrar opções dentro do seu orçamento. Qual é sua faixa de preço preferida?';
    }
    
    if (input.includes('localização') || input.includes('bairro')) {
      return 'Temos propriedades exclusivas em Ipanema, Copacabana, Leblon, Barra da Tijuca e outros bairros nobres do Rio. Qual região você prefere?';
    }
    
    if (input.includes('visita') || input.includes('agendar')) {
      return 'Ótimo! Posso agendar uma visita para você. Por favor, entre em contato conosco pelo WhatsApp (21) 99999-8888 ou preencha nosso formulário de contato.';
    }
    
    if (input.includes('ia') || input.includes('inteligência')) {
      return 'Nossa IA pode personalizar decoração, criar tours com áudio imersivo e fazer recomendações baseadas no seu perfil. Que funcionalidade te interessa mais?';
    }
    
    return 'Interessante! Para melhor atendê-lo, recomendo falar com nossos especialistas. Entre em contato pelo WhatsApp (21) 99999-8888 ou agende uma consulta.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Button
          onClick={handleToggleChat}
          className="w-16 h-16 bg-luxury-red hover:bg-premium-gold rounded-full shadow-lg group relative overflow-hidden"
        >
          <motion.i
            className="fas fa-robot text-pearl-white group-hover:text-diamond-black text-xl"
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-premium-gold rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-20 right-0 glass-morphism px-4 py-2 rounded-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 3 }}
            >
              <p className="text-sm font-montserrat text-pearl-white whitespace-nowrap">
                Assistente IA
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-morphism bg-diamond-black/95 border-premium-gold/30 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-premium-gold rounded-full flex items-center justify-center">
                      <i className="fas fa-robot text-diamond-black text-sm"></i>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-pearl-white">
                        Assistente IA
                      </h4>
                      <p className="text-xs text-platinum-gray">Online</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleToggleChat}
                    variant="ghost"
                    size="sm"
                    className="text-platinum-gray hover:text-pearl-white"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-80 px-4">
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-luxury-red text-pearl-white'
                              : 'bg-graphite-gray text-pearl-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-graphite-gray p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-premium-gold rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-premium-gold rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-premium-gold rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-premium-gold/20">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-luxury-red hover:bg-premium-gold hover:text-diamond-black"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
