import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertContactSchema, insertPropertySchema, insertVisitSchema, insertAiInteractionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Contact creation error:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError ? "Dados inválidos" : "Erro interno do servidor" 
      });
    }
  });

  // Get all properties with filters
  app.get("/api/properties", async (req, res) => {
    try {
      const { 
        search, 
        minPrice, 
        maxPrice, 
        location, 
        propertyType, 
        sortBy = "price-desc",
        limit = "20",
        offset = "0" 
      } = req.query;

      const filters = {
        search: search as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        location: location as string,
        propertyType: propertyType as string,
        sortBy: sortBy as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const properties = await storage.getProperties(filters);
      res.json({ success: true, properties });
    } catch (error) {
      console.error("Get properties error:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // Get single property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getPropertyById(id);
      
      if (!property) {
        return res.status(404).json({ success: false, message: "Imóvel não encontrado" });
      }

      res.json({ success: true, property });
    } catch (error) {
      console.error("Get property error:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // Create new property (admin only)
  app.post("/api/properties", async (req, res) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.json({ success: true, property });
    } catch (error) {
      console.error("Property creation error:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError ? "Dados inválidos" : "Erro interno do servidor" 
      });
    }
  });

  // Schedule visit
  app.post("/api/visits", async (req, res) => {
    try {
      const validatedData = insertVisitSchema.parse(req.body);
      const visit = await storage.createVisit(validatedData);
      res.json({ success: true, visit });
    } catch (error) {
      console.error("Visit creation error:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError ? "Dados inválidos" : "Erro interno do servidor" 
      });
    }
  });

  // Get visits for a property
  app.get("/api/properties/:id/visits", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      const visits = await storage.getVisitsByProperty(propertyId);
      res.json({ success: true, visits });
    } catch (error) {
      console.error("Get visits error:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // AI Interactions
  app.post("/api/ai/interactions", async (req, res) => {
    try {
      const validatedData = insertAiInteractionSchema.parse(req.body);
      const interaction = await storage.createAiInteraction(validatedData);
      res.json({ success: true, interaction });
    } catch (error) {
      console.error("AI interaction error:", error);
      res.status(400).json({ 
        success: false, 
        message: error instanceof z.ZodError ? "Dados inválidos" : "Erro interno do servidor" 
      });
    }
  });

  // Get AI interactions for analytics
  app.get("/api/ai/interactions", async (req, res) => {
    try {
      const { propertyId, interactionType } = req.query;
      const filters = {
        propertyId: propertyId ? parseInt(propertyId as string) : undefined,
        interactionType: interactionType as string,
      };
      
      const interactions = await storage.getAiInteractions(filters);
      res.json({ success: true, interactions });
    } catch (error) {
      console.error("Get AI interactions error:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // Get dashboard statistics
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json({ success: true, stats });
    } catch (error) {
      console.error("Get dashboard stats error:", error);
      res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "API funcionando corretamente" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
