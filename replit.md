# Imóveis Luxo Rio - Real Estate Platform

## Overview

This is a modern luxury real estate web application built for the Rio de Janeiro market. The platform combines traditional property listings with cutting-edge AI features, offering virtual tours, personalized decoration visualization, and intelligent property recommendations. The application serves as a comprehensive solution for luxury property buyers, sellers, and real estate agents.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom luxury theme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **API Design**: RESTful API with JSON responses

### Build System
- **Frontend Build**: Vite with React plugin
- **Backend Build**: esbuild for server bundling
- **Development**: tsx for TypeScript execution
- **Deployment**: Replit with autoscale deployment target

## Key Components

### Database Schema
The application uses a PostgreSQL database with the following main entities:

1. **Users Table**: Stores user accounts with role-based access (user, agent, admin)
2. **Properties Table**: Core property listings with comprehensive details including:
   - Basic info (title, price, location, bedrooms, bathrooms)
   - Enhanced features (parking, property type, year built)
   - Media (images array, virtual tour data)
   - Marketing (badges, ratings, agent assignments)
3. **Contacts Table**: Lead management system for property inquiries
4. **Additional Tables**: Support for visits, favorites, and AI interactions

### AI Features Integration
- **Decoration Visualization**: AI-powered interior design preview
- **Audio Tours**: Intelligent narrated property walkthroughs
- **Smart Recommendations**: Personalized property matching
- **Chatbot Assistant**: Real-time customer support with contextual responses

### Authentication & Authorization
- Role-based user system (users, agents, administrators)
- Secure password handling and session management
- Protected routes and API endpoints based on user roles

## Data Flow

1. **Client Request**: User interactions trigger API calls through TanStack Query
2. **API Processing**: Express.js routes handle requests with validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Delivery**: JSON responses sent back to React components
5. **UI Updates**: React components re-render with new data
6. **Analytics Tracking**: Google Analytics captures user interactions

### Real-time Features
- AI chatbot with simulated typing indicators
- Dynamic property filtering and search
- Instant form validation and submission feedback
- Smooth page transitions and loading states

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connectivity
- **ORM**: `drizzle-orm` with `drizzle-kit` for migrations
- **UI Framework**: Comprehensive Radix UI component suite
- **Validation**: `zod` for schema validation across frontend and backend
- **Forms**: `react-hook-form` with `@hookform/resolvers`
- **State Management**: `@tanstack/react-query` for server state
- **Styling**: `tailwindcss` with PostCSS processing
- **Analytics**: Google Analytics 4 integration
- **Animations**: `framer-motion` for advanced animations

### Development Tools
- **Build Tools**: Vite, esbuild, tsx
- **Type Checking**: TypeScript with strict configuration
- **Replit Integration**: Custom plugins for development environment

## Deployment Strategy

### Environment Configuration
- **Development**: Local development with Vite dev server and tsx
- **Production**: Built with Vite (frontend) + esbuild (backend)
- **Database**: Environment-based DATABASE_URL configuration
- **Analytics**: VITE_GA_MEASUREMENT_ID for Google Analytics

### Replit-Specific Setup
- **Modules**: nodejs-20, web, postgresql-16
- **Auto-deployment**: Configured for autoscale deployment target
- **Port Configuration**: Development on 5000, production on 80
- **Build Process**: Automated build and start scripts

### File Structure
- `client/`: React frontend application
- `server/`: Express.js backend application  
- `shared/`: Common schemas and types
- `migrations/`: Database migration files
- Configuration files in root directory

## Changelog
- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.