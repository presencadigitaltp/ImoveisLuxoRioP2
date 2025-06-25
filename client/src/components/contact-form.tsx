import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { fadeInUp } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().optional(),
  interest: z.string().min(1, 'Selecione um interesse'),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      whatsapp: '',
      interest: '',
      message: '',
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Mensagem enviada com sucesso!',
        description: 'Entraremos em contato em breve.',
      });
      form.reset();
      trackEvent('contact_form_submit', 'contact', 'success');
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: 'Erro ao enviar mensagem',
        description: 'Tente novamente ou entre em contato por WhatsApp.',
        variant: 'destructive',
      });
      trackEvent('contact_form_submit', 'contact', 'error');
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    { value: 'comprar', label: 'Comprar imóvel' },
    { value: 'vender', label: 'Vender imóvel' },
    { value: 'alugar', label: 'Alugar imóvel' },
    { value: 'investimento', label: 'Investimento' },
    { value: 'consultoria', label: 'Consultoria' },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Card className="glass-morphism rounded-2xl bg-transparent border-premium-gold/20">
        <CardContent className="p-8">
          <h3 className="font-playfair text-2xl font-bold text-pearl-white mb-6">
            Solicitar Contato
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                        Nome *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                        Telefone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(21) 99999-9999"
                          className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                        WhatsApp
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(21) 99999-9999"
                          className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                      Interesse
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20">
                          <SelectValue placeholder="Selecione seu interesse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-graphite-gray border-premium-gold/30">
                        {interestOptions.map((option) => (
                          <SelectItem 
                            key={option.value} 
                            value={option.value}
                            className="text-pearl-white hover:bg-premium-gold/20"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-montserrat text-sm font-medium text-platinum-gray">
                      Mensagem
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Conte-nos mais sobre suas necessidades..."
                        className="bg-graphite-gray border-premium-gold/30 text-pearl-white focus:border-premium-gold focus:ring-premium-gold/20 resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-3d bg-luxury-red hover:bg-premium-gold hover:text-diamond-black py-4 rounded-lg font-montserrat font-semibold text-lg transition-all duration-500"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-3"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-3"></i>
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
