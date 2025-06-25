import { 
  users, 
  properties, 
  contacts, 
  visits, 
  favorites, 
  aiInteractions,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Contact,
  type InsertContact,
  type Visit,
  type InsertVisit,
  type Favorite,
  type InsertFavorite,
  type AiInteraction,
  type InsertAiInteraction
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Property operations
  getProperties(filters: PropertyFilters): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<Property>): Promise<Property | undefined>;
  getFeaturedProperties(limit?: number): Promise<Property[]>;

  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;

  // Visit operations
  createVisit(visit: InsertVisit): Promise<Visit>;
  getVisitsByProperty(propertyId: number): Promise<Visit[]>;
  getVisitsByContact(contactId: number): Promise<Visit[]>;
  updateVisitStatus(id: number, status: string): Promise<Visit | undefined>;

  // Favorite operations
  createFavorite(favorite: InsertFavorite): Promise<Favorite>;
  getUserFavorites(userId: number): Promise<Favorite[]>;
  removeFavorite(userId: number, propertyId: number): Promise<boolean>;

  // AI Interaction operations
  createAiInteraction(interaction: InsertAiInteraction): Promise<AiInteraction>;
  getAiInteractions(filters: AiInteractionFilters): Promise<AiInteraction[]>;

  // Dashboard and analytics
  getDashboardStats(): Promise<DashboardStats>;
}

export interface PropertyFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  propertyType?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
}

export interface AiInteractionFilters {
  propertyId?: number;
  interactionType?: string;
  sessionId?: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalContacts: number;
  totalVisits: number;
  activeProperties: number;
  newContactsThisMonth: number;
  totalAiInteractions: number;
  averagePropertyPrice: number;
  topLocations: Array<{ location: string; count: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private properties: Map<number, Property> = new Map();
  private contacts: Map<number, Contact> = new Map();
  private visits: Map<number, Visit> = new Map();
  private favorites: Map<number, Favorite> = new Map();
  private aiInteractions: Map<number, AiInteraction> = new Map();
  
  private currentUserId = 1;
  private currentPropertyId = 1;
  private currentContactId = 1;
  private currentVisitId = 1;
  private currentFavoriteId = 1;
  private currentAiInteractionId = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Initialize sample properties
    const sampleProperties: Array<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>> = [
      {
        title: 'Cobertura Luxuosa em Ipanema',
        description: 'Esta magnífica cobertura oferece vistas deslumbrantes da praia de Ipanema e combina luxo contemporâneo com elegância atemporal.',
        price: '4500000.00',
        location: 'Ipanema',
        fullAddress: 'Rua Vieira Souto, 500 - Ipanema, Rio de Janeiro - RJ',
        bedrooms: 4,
        bathrooms: 3,
        area: '320m²',
        parking: 2,
        propertyType: 'cobertura',
        yearBuilt: 2020,
        features: ['Vista panorâmica da praia', 'Piscina privativa', 'Terraço gourmet', 'Ar condicionado central', 'Automação residencial'],
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
        ],
        badge: 'Destaque',
        badgeColor: 'luxury',
        rating: '4.9',
        isActive: true,
        agentId: null,
      },
      {
        title: 'Mansão Moderna na Barra',
        description: 'Mansão contemporânea com arquitetura arrojada e acabamentos de primeira linha na Barra da Tijuca.',
        price: '8200000.00',
        location: 'Barra da Tijuca',
        fullAddress: 'Av. das Américas, 3000 - Barra da Tijuca, Rio de Janeiro - RJ',
        bedrooms: 6,
        bathrooms: 5,
        area: '850m²',
        parking: 4,
        propertyType: 'casa',
        yearBuilt: 2021,
        features: ['Piscina com raia', 'Quadra de tênis', 'Cinema privativo', 'Spa', 'Garagem para 4 carros'],
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
        ],
        badge: 'Novo',
        badgeColor: 'gold',
        rating: '5.0',
        isActive: true,
        agentId: null,
      },
      {
        title: 'Apartamento de Luxo em Copacabana',
        description: 'Elegante apartamento com vista para o mar em uma das localização mais privilegiadas de Copacabana.',
        price: '3100000.00',
        location: 'Copacabana',
        fullAddress: 'Av. Atlântica, 2000 - Copacabana, Rio de Janeiro - RJ',
        bedrooms: 3,
        bathrooms: 2,
        area: '180m²',
        parking: 1,
        propertyType: 'apartamento',
        yearBuilt: 2019,
        features: ['Vista frontal para o mar', 'Varanda ampla', 'Acabamentos de luxo', 'Localização premium'],
        images: [
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800'
        ],
        badge: 'Exclusivo',
        badgeColor: 'gray',
        rating: '4.8',
        isActive: true,
        agentId: null,
      },
    ];

    sampleProperties.forEach(property => {
      const newProperty: Property = {
        ...property,
        id: this.currentPropertyId++,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.properties.set(newProperty.id, newProperty);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: this.currentUserId++,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Property operations
  async getProperties(filters: PropertyFilters): Promise<Property[]> {
    let properties = Array.from(this.properties.values()).filter(p => p.isActive);

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.minPrice !== undefined) {
      properties = properties.filter(p => parseFloat(p.price) >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      properties = properties.filter(p => parseFloat(p.price) <= filters.maxPrice!);
    }

    if (filters.location) {
      properties = properties.filter(p => p.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    if (filters.propertyType) {
      properties = properties.filter(p => p.propertyType === filters.propertyType);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        properties.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        properties.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        properties.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'area':
        properties.sort((a, b) => parseInt(b.area) - parseInt(a.area));
        break;
      default:
        break;
    }

    // Apply pagination
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;
    return properties.slice(offset, offset + limit);
  }

  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const property: Property = {
      ...insertProperty,
      id: this.currentPropertyId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.properties.set(property.id, property);
    return property;
  }

  async updateProperty(id: number, updates: Partial<Property>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;

    const updatedProperty: Property = {
      ...property,
      ...updates,
      updatedAt: new Date(),
    };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async getFeaturedProperties(limit = 3): Promise<Property[]> {
    return Array.from(this.properties.values())
      .filter(p => p.isActive && p.badge)
      .slice(0, limit);
  }

  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      ...insertContact,
      id: this.currentContactId++,
      status: 'new',
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;

    const updatedContact: Contact = { ...contact, status };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  // Visit operations
  async createVisit(insertVisit: InsertVisit): Promise<Visit> {
    const visit: Visit = {
      ...insertVisit,
      id: this.currentVisitId++,
      status: 'scheduled',
      createdAt: new Date(),
    };
    this.visits.set(visit.id, visit);
    return visit;
  }

  async getVisitsByProperty(propertyId: number): Promise<Visit[]> {
    return Array.from(this.visits.values()).filter(v => v.propertyId === propertyId);
  }

  async getVisitsByContact(contactId: number): Promise<Visit[]> {
    return Array.from(this.visits.values()).filter(v => v.contactId === contactId);
  }

  async updateVisitStatus(id: number, status: string): Promise<Visit | undefined> {
    const visit = this.visits.get(id);
    if (!visit) return undefined;

    const updatedVisit: Visit = { ...visit, status };
    this.visits.set(id, updatedVisit);
    return updatedVisit;
  }

  // Favorite operations
  async createFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const favorite: Favorite = {
      ...insertFavorite,
      id: this.currentFavoriteId++,
      createdAt: new Date(),
    };
    this.favorites.set(favorite.id, favorite);
    return favorite;
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(f => f.userId === userId);
  }

  async removeFavorite(userId: number, propertyId: number): Promise<boolean> {
    const favoriteToRemove = Array.from(this.favorites.values())
      .find(f => f.userId === userId && f.propertyId === propertyId);
    
    if (favoriteToRemove) {
      this.favorites.delete(favoriteToRemove.id);
      return true;
    }
    return false;
  }

  // AI Interaction operations
  async createAiInteraction(insertInteraction: InsertAiInteraction): Promise<AiInteraction> {
    const interaction: AiInteraction = {
      ...insertInteraction,
      id: this.currentAiInteractionId++,
      createdAt: new Date(),
    };
    this.aiInteractions.set(interaction.id, interaction);
    return interaction;
  }

  async getAiInteractions(filters: AiInteractionFilters): Promise<AiInteraction[]> {
    let interactions = Array.from(this.aiInteractions.values());

    if (filters.propertyId) {
      interactions = interactions.filter(i => i.propertyId === filters.propertyId);
    }

    if (filters.interactionType) {
      interactions = interactions.filter(i => i.interactionType === filters.interactionType);
    }

    if (filters.sessionId) {
      interactions = interactions.filter(i => i.sessionId === filters.sessionId);
    }

    return interactions;
  }

  // Dashboard and analytics
  async getDashboardStats(): Promise<DashboardStats> {
    const properties = Array.from(this.properties.values());
    const contacts = Array.from(this.contacts.values());
    const visits = Array.from(this.visits.values());
    const interactions = Array.from(this.aiInteractions.values());

    const currentMonth = new Date().getMonth();
    const newContactsThisMonth = contacts.filter(c => 
      c.createdAt.getMonth() === currentMonth
    ).length;

    const totalPrice = properties
      .filter(p => p.isActive)
      .reduce((sum, p) => sum + parseFloat(p.price), 0);
    const averagePropertyPrice = properties.length > 0 ? totalPrice / properties.length : 0;

    const locationCounts = properties.reduce((acc, p) => {
      acc[p.location] = (acc[p.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalProperties: properties.filter(p => p.isActive).length,
      totalContacts: contacts.length,
      totalVisits: visits.length,
      activeProperties: properties.filter(p => p.isActive).length,
      newContactsThisMonth,
      totalAiInteractions: interactions.length,
      averagePropertyPrice,
      topLocations,
    };
  }
}

export const storage = new MemStorage();
