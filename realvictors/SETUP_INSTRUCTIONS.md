# RealVictors Setup Instructions

This document provides step-by-step instructions to set up the RealVictors mobile app development environment.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- React Native development environment
- Supabase account
- Stripe account (for payments)

## 1. Project Setup

### Clone and Install Dependencies

```bash
cd /Users/victorokenne/Documents/GitHub/RealVictors/realvictors
npm install
```

### Environment Configuration

1. Copy the environment template:
```bash
cp env.example .env.local
```

2. Fill in your actual values in `.env.local`:
   - Supabase URL and anon key
   - Stripe publishable key
   - Google Maps API key
   - Other service credentials

## 2. Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key
4. Add them to `.env.local`

### Run Database Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

### Enable Authentication Providers

1. In Supabase Dashboard, go to Authentication > Settings
2. Enable Email/Password authentication
3. Configure Google OAuth:
   - Add Google Client ID and Secret
   - Set redirect URL: `realvictors://auth`
4. Configure Apple OAuth (for iOS)

### Set Up Row Level Security

The migrations include comprehensive RLS policies. Verify they're applied:

```sql
-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
```

## 3. External Services Setup

### Stripe (Payments)

1. Create Stripe account
2. Get publishable and secret keys
3. Set up webhooks for payment events
4. Configure Stripe Connect for payouts

### Google Maps (Location Services)

1. Go to Google Cloud Console
2. Enable Maps SDK for Android/iOS
3. Create API key
4. Restrict key to your app bundle ID

### Mux (Video Processing) - Optional

1. Create Mux account
2. Get environment key and token
3. Set up webhooks for encoding events

## 4. Development Setup

### Start Development Server

```bash
npm start
```

### Run on Device/Simulator

```bash
# iOS
npm run ios

# Android  
npm run android
```

### Type Checking

```bash
npm run type-check
```

### Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## 5. Database Schema Overview

The app uses a comprehensive PostgreSQL schema with:

- **Users & Profiles**: Extended user information with sports preferences
- **Teams**: Team management with roles and permissions
- **Games**: Unified model for pickup games, exhibitions, leagues, tournaments
- **Social Features**: Posts, likes, comments, follows
- **Messaging**: Real-time chat system
- **Statistics**: Player and team performance tracking
- **Payments**: Transaction management with Stripe integration

## 6. Architecture Overview

### MVC Pattern

- **Models** (`src/models/`): Data structures and business logic
- **Views** (`app/`): React Native screens and components
- **Controllers** (`src/controllers/`): Business logic and API interactions

### Key Technologies

- **Frontend**: React Native + Expo
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **State Management**: Zustand + TanStack Query
- **Styling**: NativeWind (Tailwind for React Native)
- **Navigation**: Expo Router
- **Payments**: Stripe
- **Maps**: Google Maps
- **Video**: Mux

## 7. Development Workflow

### Adding New Features

1. Define types in `src/types/`
2. Create database tables/functions if needed
3. Add controllers in `src/controllers/`
4. Create UI components in `src/components/`
5. Add screens in `app/`
6. Write tests
7. Update documentation

### Database Changes

1. Create new migration file in `supabase/migrations/`
2. Test locally with `supabase db reset`
3. Apply to production with `supabase db push`

### Deployment

1. Build for production: `expo build`
2. Deploy to app stores using EAS Build
3. Update Supabase production environment
4. Configure production environment variables

## 8. Testing Strategy

### Unit Tests
- Component testing with React Native Testing Library
- Controller/service testing with Jest
- Mock Supabase client for isolated testing

### Integration Tests
- API endpoint testing
- Database operation testing
- Authentication flow testing

### E2E Tests
- User journey testing with Detox
- Critical path automation
- Performance testing

## 9. Security Considerations

### Row Level Security (RLS)
- All tables have comprehensive RLS policies
- Users can only access their own data or public data
- Team/game permissions are properly enforced

### Authentication
- Secure token storage with Expo SecureStore
- OAuth integration for social login
- Session management with automatic refresh

### Data Privacy
- User data is encrypted in transit and at rest
- Location data is anonymized when shared
- Users control their profile visibility

## 10. Performance Optimization

### Database
- Proper indexing on frequently queried columns
- PostGIS for efficient location-based queries
- Connection pooling and query optimization

### Frontend
- Lazy loading for screens and components
- Image optimization with Expo Image
- Efficient list rendering with FlashList
- Caching with TanStack Query

### Real-time Features
- Supabase Realtime for live updates
- Efficient subscription management
- Optimistic updates for better UX

## 11. Monitoring and Analytics

### Error Tracking
- Sentry integration for crash reporting
- Custom error boundaries
- Performance monitoring

### Analytics
- User engagement tracking
- Feature usage analytics
- Performance metrics

### Logging
- Structured logging with different levels
- User action tracking
- System health monitoring

## 12. Troubleshooting

### Common Issues

1. **Supabase Connection Issues**
   - Verify URL and anon key in environment
   - Check network connectivity
   - Ensure RLS policies allow access

2. **Build Errors**
   - Clear Metro cache: `npx expo start -c`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Authentication Problems**
   - Verify OAuth configuration
   - Check redirect URLs
   - Ensure proper deep linking setup

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev)
- Review [Supabase guides](https://supabase.com/docs)
- Open issues on the project repository
- Contact the development team

## 13. Contributing

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with detailed description
5. Address review feedback

### Release Process
1. Update version in `package.json`
2. Create release notes
3. Build and test thoroughly
4. Deploy to staging environment
5. Deploy to production after approval

---

This setup guide should get you up and running with the RealVictors app. For additional help, refer to the detailed implementation plan in `IMPLEMENTATION_PLAN.md`.
