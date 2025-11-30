# RealVictors Tech Stack Documentation

**Last Updated:** 2025-11-25
**Project:** RealVictors - Ultimate Sports Social Platform
**Stack Philosophy:** Supabase-First Hybrid Architecture with Serverless Edge Computing

---

## Table of Contents

1. [Current Tech Stack](#current-tech-stack)
2. [Recommended Additions](#recommended-additions)
3. [Backend Architecture Comparison](#backend-architecture-comparison)
4. [UI & Styling Options](#ui--styling-options)
5. [Performance & Storage](#performance--storage)
6. [Background Jobs & Queues](#background-jobs--queues)
7. [Hosting & Deployment](#hosting--deployment)
8. [Monitoring & Logging](#monitoring--logging)
9. [Complete Architecture Overview](#complete-architecture-overview)
10. [Implementation Roadmap](#implementation-roadmap)
11. [Cost Estimates](#cost-estimates)

---

## Current Tech Stack

### ✅ Already Installed & Working

#### Frontend
- **Framework:** React Native 0.81.4 + Expo ~54.0.0
- **Router:** Expo Router ~6.0.7
- **UI Library:** React Native Paper 5.14.5
- **Icons:** Lucide React Native 0.544.0, @expo/vector-icons 15.0.2
- **Fonts:** Montserrat, Orbitron (via Expo Google Fonts)

#### State Management
- **Global State:** Zustand 5.0.8
- **Server State:** TanStack Query 5.89.0
- **Forms:** React Hook Form 7.62.0

#### Backend & Database
- **Database:** Supabase (PostgreSQL with PostGIS)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Real-time:** Supabase Realtime (WebSocket)
- **SDK:** @supabase/supabase-js 2.57.4

#### Payments
- **Provider:** Stripe
- **SDK:** @stripe/stripe-react-native 0.50.3

#### Media & Camera
- **Image Handling:** Expo Image 3.0.8
- **Image Picker:** Expo Image Picker 17.0.8
- **Camera:** Expo Camera 17.0.8
- **Video:** Expo AV 16.0.7

#### Animations & Gestures
- **Gestures:** React Native Gesture Handler 2.28.0
- **Animations:** React Native Reanimated 4.1.0
- **Worklets:** React Native Worklets 0.5.1

#### Platform Features
- **Maps:** React Native Maps 1.20.1
- **Location:** Expo Location 19.0.7
- **Notifications:** Expo Notifications 0.32.11
- **Secure Storage:** Expo Secure Store 15.0.7
- **AsyncStorage:** @react-native-async-storage/async-storage 2.2.0
- **Haptics:** Expo Haptics 15.0.7

#### Utilities
- **Date Handling:** date-fns 4.1.0
- **Lodash:** lodash 4.17.21
- **Modal:** React Native Modal 14.0.0-rc.1

#### DevTools
- **TypeScript:** 5.8.3
- **Linting:** ESLint (expo config)
- **Testing:** Jest

---

## Recommended Additions

### 🚀 High Priority (Add Before Launch)

#### 1. **React Native MMKV**
```bash
npx expo install react-native-mmkv
```

**Purpose:** Ultra-fast key-value storage
**Use Cases:**
- User preferences
- Auth tokens
- App settings
- Small cached data

**Why:**
- ✅ 30x faster than AsyncStorage
- ✅ Synchronous API (no await needed)
- ✅ Simple migration from AsyncStorage
- ✅ JSI-based (native performance)

**When to Use:**
- MMKV: Frequently accessed data, settings, tokens
- AsyncStorage: Fallback, larger data, non-critical

---

#### 2. **FlashList**
```bash
npx expo install @shopify/flash-list
```

**Purpose:** High-performance list rendering
**Use Cases:**
- Games list page
- Messages/conversations
- Notifications feed
- User search results
- Team roster

**Why:**
- ✅ 10x better performance than FlatList
- ✅ No blank cells while scrolling
- ✅ Lower memory usage
- ✅ Drop-in replacement for FlatList

**Migration Strategy:**
```tsx
// Before
<FlatList data={games} renderItem={...} />

// After
<FlashList data={games} renderItem={...} estimatedItemSize={100} />
```

---

#### 3. **Moti**
```bash
npx expo install moti
```

**Purpose:** Declarative animations (wrapper around Reanimated)
**Use Cases:**
- Fade in/out transitions
- Scale animations
- Color transitions
- Loading states
- Skeleton screens

**Why:**
- ✅ Built on Reanimated (no performance penalty)
- ✅ 10x simpler API for common animations
- ✅ Works alongside Reanimated

**Example:**
```tsx
import { MotiView } from 'moti'

<MotiView
  from={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'timing', duration: 300 }}
>
  <GameCard />
</MotiView>
```

**When to Use:**
- Moti: 80% of animations (simple fade, scale, color)
- Reanimated: Complex gestures, pan, custom curves

---

#### 4. **Sentry**
```bash
npx expo install @sentry/react-native sentry-expo
```

**Purpose:** Production error tracking & crash reporting
**Use Cases:**
- Catch crashes in production
- Monitor app performance
- Track release health
- User session replays

**Why:**
- ✅ See errors you'd never find in testing
- ✅ Source maps for production code
- ✅ User context (which screen crashed)
- ✅ Breadcrumbs (what led to crash)

**Critical For:**
- Production deployments
- Identifying platform-specific issues
- Monitoring app stability

**Cost:** Free tier: 5,000 errors/month

---

### ⚠️ Medium Priority (Add After MVP Launch)

#### 5. **Maestro** (E2E Testing)
```bash
curl -Ls https://get.maestro.mobile.dev | bash
```

**Purpose:** End-to-end testing for mobile
**Use Cases:**
- Test critical flows (signup, create game, payment)
- Regression testing before releases
- CI/CD integration

**Why:**
- ✅ Simpler than Detox/Appium
- ✅ Works with Expo
- ✅ Cloud-based device testing

**When to Add:** After MVP, before scaling to 1000+ users

---

#### 6. **Reactotron** (Development Tool)
```bash
npx expo install reactotron-react-native
```

**Purpose:** Development debugging tool
**Use Cases:**
- Debug API calls
- Inspect AsyncStorage/MMKV
- Monitor state changes
- Network request logging

**Why:**
- ✅ Better than console.log
- ✅ View all API requests/responses
- ✅ Inspect storage in real-time

**Note:** Development only, not for production

---

### ❌ Not Recommended (Don't Add)

#### Libraries to Avoid

| Library | Why Not |
|---------|---------|
| **Tamagui** | Requires complete UI rewrite. Amazing library but too late to switch. |
| **NativeWind** | Creates dual styling paradigm with Paper. Choose one or the other. |
| **React Native Elements** | You already have Paper. Don't mix component libraries. |
| **React Native Vision Camera** | Expo Camera is sufficient unless you need ML features (face detection, QR scanning). |
| **Flipper** | Buggy with Expo. Use Reactotron instead. |

---

## Backend Architecture Comparison

### Option 1: ✅ **Supabase Edge Functions** (RECOMMENDED)

**Stack:** Deno + TypeScript (Serverless)

#### Pros:
- ✅ Serverless (auto-scaling, pay-per-use)
- ✅ Direct PostgreSQL access (no ORM needed)
- ✅ TypeScript native
- ✅ Deploy to edge (low latency globally)
- ✅ Same vendor as database (simpler architecture)
- ✅ Free tier: 500K invocations/month
- ✅ Built-in auth integration
- ✅ No server management

#### Cons:
- ❌ Deno ecosystem smaller than Node.js
- ❌ Some npm packages incompatible
- ❌ Newer technology (less Stack Overflow answers)

#### Use Cases:
- Stripe webhook handlers
- Complex stats calculations
- Notification triggers
- AI integration (OpenAI API calls)
- Image processing
- Background job triggers

#### Cost:
- Free: Up to 500K requests/month
- Pro: $25/month (2M requests)

**Verdict:** ✅ Best fit for your serverless preference and Supabase integration

---

### Option 2: ⚠️ **NestJS + Prisma**

**Stack:** Node.js + TypeScript (Traditional Backend)

#### Pros:
- ✅ Enterprise-grade architecture
- ✅ Dependency injection
- ✅ Great for large teams
- ✅ TypeScript decorators (clean code)
- ✅ Prisma type-safety

#### Cons:
- ❌ Requires managing servers (Railway/Render)
- ❌ Overkill for your app size
- ❌ Prisma generates 2-5MB client code
- ❌ Duplicates Supabase features (auth, realtime, storage)
- ❌ Not serverless (always-on costs)
- ❌ More code to maintain
- ❌ Need to build what Supabase already provides

#### When to Use:
- Large teams (10+ backend developers)
- Microservices architecture
- Complex domain logic
- You don't use Supabase

**Verdict:** ❌ Don't use - You'd be reinventing Supabase

---

### Option 3: ❌ **Express.js + Node.js**

**Stack:** Node.js + JavaScript/TypeScript (Traditional Backend)

#### Pros:
- ✅ Mature ecosystem
- ✅ Huge community
- ✅ Total flexibility
- ✅ Easy to hire developers

#### Cons:
- ❌ No built-in structure (unlike NestJS)
- ❌ Requires server management
- ❌ Build auth, realtime, storage from scratch
- ❌ Not serverless
- ❌ More boilerplate code

**Verdict:** ❌ Don't use - Too much work for what Supabase provides

---

### Option 4: ⚠️ **Hasura** (GraphQL on PostgreSQL)

**Stack:** GraphQL Engine + PostgreSQL

#### Pros:
- ✅ Instant GraphQL API from schema
- ✅ Auto-generates resolvers
- ✅ Real-time subscriptions
- ✅ Great for complex nested queries
- ✅ Permissions at field level

#### Cons:
- ❌ Another vendor/layer on top of Supabase
- ❌ GraphQL learning curve
- ❌ You already have Supabase (similar features)
- ❌ Subscriptions can get expensive
- ❌ Harder to debug than REST
- ❌ TanStack Query is REST-focused

#### When to Use:
- You need GraphQL specifically
- Complex nested queries everywhere
- Team already knows GraphQL

**Verdict:** ⚠️ **Maybe Later** - Only if you desperately need GraphQL. REST + TanStack Query is simpler.

---

### Option 5: ❌ **Fastify**

**Stack:** Node.js + Fastify Framework

#### Pros:
- ✅ 2x faster than Express
- ✅ Better TypeScript support
- ✅ Modern API design
- ✅ Schema validation built-in

#### Cons:
- ❌ Still requires server management
- ❌ Not serverless
- ❌ Same issues as Express

**Verdict:** ❌ Don't use - Better than Express, but still wrong approach for you

---

## UI & Styling Options

### Current: React Native Paper

**Keep Using:** ✅ Yes, it's working well

---

### Alternatives Considered

#### 1. **Tamagui**

**Pros:**
- ✅ Extremely performant (compile-time optimization)
- ✅ Cross-platform (web + native, one codebase)
- ✅ Great DX (variants, tokens, themes)
- ✅ Optimizing compiler

**Cons:**
- ❌ Requires complete buy-in from start
- ❌ You'd need to rebuild ALL existing components
- ❌ Major architectural shift
- ❌ Too late to switch (you have ~20+ screens built)

**Verdict:** ❌ Amazing library, but switching = rewriting your entire UI

---

#### 2. **NativeWind**

**Pros:**
- ✅ Tailwind CSS syntax for React Native
- ✅ Fast development
- ✅ Familiar if you know Tailwind

**Cons:**
- ❌ Creates dual styling paradigm with Paper
- ❌ Paper has its own theming system
- ❌ Would need to migrate all Paper components

**Verdict:** ⚠️ Only add if you commit to migrating away from Paper entirely (not recommended now)

---

#### 3. **UniStyles**

**Pros:**
- ✅ Better StyleSheet with themes
- ✅ TypeScript support

**Cons:**
- ❌ You already have Paper's theming
- ❌ Unnecessary complexity

**Verdict:** ❌ No - Stick with what you have

---

## Performance & Storage

### Storage Comparison

| Solution | Speed | API | Use Case |
|----------|-------|-----|----------|
| **MMKV** (Recommended) | 30x faster | Sync | Settings, tokens, frequently accessed data |
| **AsyncStorage** (Current) | Baseline | Async | Fallback, larger data, non-critical |
| **Expo SecureStore** (Current) | Slower | Async | Sensitive data (passwords, keys) |
| **Zustand** (Current) | RAM | Sync | Temporary UI state |

**Recommendation:**
- Add MMKV for performance-critical storage
- Keep AsyncStorage as fallback
- Keep SecureStore for sensitive data
- Use Zustand for ephemeral state

---

### List Rendering Comparison

| Component | Performance | Use Case |
|-----------|-------------|----------|
| **FlashList** (Recommended) | 10x faster | Lists >20 items, complex items |
| **FlatList** (Current) | Baseline | Simple lists <20 items |
| **ScrollView** | Poor for long lists | Known, small item count |

**Migration Priority:**
1. Games list page (HIGH)
2. Messages/conversations (HIGH)
3. Notifications feed (HIGH)
4. User search results (MEDIUM)
5. Team roster (LOW)

---

## Background Jobs & Queues

### Option 1: ✅ **Inngest** (RECOMMENDED)

**Type:** Event-driven serverless

#### Pros:
- ✅ Event-driven (no polling)
- ✅ Built-in retries, delays, scheduled jobs
- ✅ Great DX (TypeScript, local dev)
- ✅ Free tier: 10K events/month
- ✅ Serverless-native
- ✅ Similar to Vercel (easy deployment)

#### Cons:
- ❌ Newer product (less battle-tested)
- ❌ Smaller community than BullMQ

#### Use Cases:
- Match reminder notifications (scheduled)
- Post-game stats calculation (event-driven)
- Email digests (cron)
- Payment webhooks (event-driven)
- User onboarding workflows

**Cost:**
- Free: 10K events/month
- Pro: $20/month (100K events)

---

### Option 2: ⚠️ **BullMQ + Redis**

**Type:** Traditional queue system

#### Pros:
- ✅ Battle-tested (industry standard)
- ✅ Powerful queue management
- ✅ Great for high-throughput (>100K jobs/mo)
- ✅ Advanced features (rate limiting, priority)

#### Cons:
- ❌ Requires managing Redis server
- ❌ More complex setup
- ❌ Redis hosting costs (Upstash: $10/mo minimum)
- ❌ Not serverless-friendly
- ❌ More code to maintain

**Verdict:** ⚠️ Use if you need >100K jobs/month or complex queue management. Otherwise Inngest is simpler.

---

### Option 3: ✅ **Supabase pg_cron**

**Type:** PostgreSQL extension (built-in)

#### Pros:
- ✅ Free, already installed
- ✅ SQL-based (simple)
- ✅ No external service

#### Cons:
- ❌ Only scheduled jobs (no event-driven)
- ❌ Limited to SQL logic
- ❌ Can't call external APIs easily

#### Use Cases:
- Daily cleanup jobs
- Nightly stats rollup
- Periodic database maintenance

**Verdict:** ✅ Use for simple SQL-based cron jobs. Combine with Inngest for complex workflows.

---

## Hosting & Deployment

### Frontend (Mobile App)

**Current:** Expo Development

**Production:** ✅ **EAS (Expo Application Services)**

- **EAS Build:** iOS/Android builds in the cloud
- **EAS Update:** OTA updates (no app store approval)
- **EAS Submit:** Automated app store deployment

**Cost:**
- Free: Development builds
- Production: $99/month (unlimited builds)

---

### Backend (Serverless Functions)

#### Option 1: ✅ **Vercel** (RECOMMENDED)

**For:** Serverless functions, Next.js (if you add web app)

#### Pros:
- ✅ Best DX in industry
- ✅ Auto-deploy from GitHub
- ✅ Edge functions (low latency)
- ✅ Free tier generous
- ✅ Zero configuration

#### Cons:
- ❌ Expensive at scale (serverless invocations add up)
- ❌ 10s timeout on Hobby plan

**Use Cases:**
- Complex serverless functions not suited for Deno
- Web app hosting (Next.js)
- Long-running processes (with caveats)

**Cost:**
- Hobby: Free (100GB bandwidth)
- Pro: $20/month

---

#### Option 2: ⚠️ **Railway**

**For:** Traditional backend (Docker containers)

#### Pros:
- ✅ Simple Docker deployment
- ✅ Persistent services (not serverless)
- ✅ $5 credit/month free
- ✅ Good for WebSockets, long-running

#### Cons:
- ❌ More expensive than serverless at low usage
- ❌ Need to manage scaling
- ❌ Always-on costs (not pay-per-use)

**Verdict:** ⚠️ Only use if you go with NestJS/Express (which I don't recommend)

---

#### Option 3: ⚠️ **Render**

**For:** Traditional backend (Docker containers)

#### Pros:
- ✅ Free tier for hobby projects
- ✅ Auto-scaling
- ✅ More mature than Railway

#### Cons:
- ❌ Free tier spins down (slow cold starts: 30s+)
- ❌ Slower than Railway
- ❌ Always-on costs on paid tiers

**Verdict:** ⚠️ Same as Railway - only if you need traditional backend

---

#### Option 4: ⚠️ **Fly.io**

**For:** Edge deployment (global distribution)

#### Pros:
- ✅ Edge deployment (fast globally)
- ✅ Good for WebSocket/long-running
- ✅ Reasonable pricing
- ✅ Multi-region

#### Cons:
- ❌ More DevOps than Vercel
- ❌ Billing can be confusing
- ❌ Steeper learning curve

**Verdict:** ⚠️ Only if you need persistent WebSockets (which Supabase Realtime handles)

---

## Monitoring & Logging

### Error Tracking

#### ✅ **Sentry** (MUST HAVE)

**Purpose:** Production error tracking

**Features:**
- Crash reporting
- Source maps (see actual code, not minified)
- User context (which screen, which user)
- Breadcrumbs (actions before crash)
- Release tracking
- Performance monitoring

**Cost:**
- Free: 5K errors/month
- Team: $26/month (50K errors)

**Setup:**
```bash
npx expo install @sentry/react-native sentry-expo
```

---

### Logging

#### Option 1: **Supabase Dashboard** (Free, Built-in)

**Use For:**
- Database queries
- Edge function logs
- Real-time monitoring

**Verdict:** ✅ Start here, upgrade if needed

---

#### Option 2: ⚠️ **Logflare**

**Purpose:** Advanced log analytics

#### Pros:
- ✅ SQL-like queries on logs
- ✅ Supabase integration
- ✅ Real-time log tailing

#### Cons:
- ❌ Expensive at scale

**Verdict:** ⚠️ Only if you need advanced log analytics. Supabase dashboard is enough for MVP.

---

#### Option 3: ⚠️ **Papertrail**

**Purpose:** Simple log aggregation

#### Pros:
- ✅ Simple setup
- ✅ Good search

#### Cons:
- ❌ Limited free tier (48hrs retention)

**Verdict:** ⚠️ Only if you use Railway/Render. Not needed with Supabase.

---

### Development Debugging

#### ⚠️ **Reactotron**

**Purpose:** Development debugging

**Features:**
- API call inspection
- Storage viewer
- State tracking
- Network logging

**Verdict:** ⚠️ Nice to have, try if debugging is painful. TanStack Query DevTools might be enough.

---

## Authentication

### Current: ✅ **Supabase Auth**

**Features:**
- Email/Password
- OAuth (Google, Apple)
- Magic links
- Session management
- RLS integration

**Verdict:** ✅ Keep using it

---

### Alternative: ❌ **Clerk**

#### Pros:
- ✅ Beautiful pre-built UI
- ✅ Great DX
- ✅ More features (organizations, webhooks)

#### Cons:
- ❌ You've already built auth with Supabase
- ❌ Adds another vendor ($25/month vs free)
- ❌ Doesn't integrate as well with Supabase DB
- ❌ Would need to rebuild auth flow

**Verdict:** ❌ Clerk is great for greenfield projects, but you're too far along

---

## Complete Architecture Overview

### Recommended Final Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     MOBILE APP (React Native + Expo)        │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │  UI Layer    │ State Layer  │  Data Layer              │ │
│  │              │              │                          │ │
│  │ Paper        │ Zustand      │ TanStack Query           │ │
│  │ Moti         │ (UI state)   │ (server state)           │ │
│  │ Reanimated   │              │                          │ │
│  │ FlashList    │              │ Supabase Client          │ │
│  │              │              │ - Auth                   │ │
│  │ Storage:     │              │ - Realtime               │ │
│  │ - MMKV       │              │ - Storage                │ │
│  │ - AsyncStore │              │                          │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND LAYER                         │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Supabase (Primary Backend)               │ │
│  │  ┌─────────────┬─────────────┬──────────────────────┐ │ │
│  │  │ PostgreSQL  │ Auth        │ Storage              │ │ │
│  │  │ + PostGIS   │             │                      │ │ │
│  │  │ + pgvector  │ Google/     │ Images/Videos        │ │ │
│  │  │ + pg_cron   │ Apple OAuth │ + Cloudinary CDN     │ │ │
│  │  │             │             │                      │ │ │
│  │  └─────────────┴─────────────┴──────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │        Supabase Edge Functions (Deno)           │ │ │
│  │  │  - Stripe webhooks                              │ │ │
│  │  │  - Complex business logic                       │ │ │
│  │  │  - AI integration                               │ │ │
│  │  │  - Notification triggers                        │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │        Supabase Realtime                        │ │ │
│  │  │  - Live messages                                │ │ │
│  │  │  - Notifications                                │ │ │
│  │  │  - Game updates                                 │ │ │
│  │  │  - Presence (online status)                     │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                         │
│                                                             │
│  ┌──────────────┬──────────────┬────────────────────────┐  │
│  │ Payments     │ Background   │ Monitoring             │  │
│  │              │ Jobs         │                        │  │
│  │ Stripe       │ Inngest      │ Sentry (errors)        │  │
│  │              │ + pg_cron    │ Supabase Dashboard     │  │
│  │              │              │                        │  │
│  └──────────────┴──────────────┴────────────────────────┘  │
│                                                             │
│  ┌──────────────┬──────────────┬────────────────────────┐  │
│  │ Push Notifs  │ Media CDN    │ Deployment             │  │
│  │              │              │                        │  │
│  │ Expo Push    │ Cloudinary   │ EAS (mobile)           │  │
│  │ + FCM/APNs   │ (optional)   │ Vercel (serverless)    │  │
│  │              │              │                        │  │
│  └──────────────┴──────────────┴────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Pre-Launch Optimization (Week 1-2)

**Priority:** Must-Have

1. **Add MMKV**
   - Install package
   - Create storage wrapper
   - Migrate user preferences
   - Migrate auth tokens

2. **Add FlashList**
   - Install package
   - Replace FlatList in games page
   - Replace FlatList in messages page
   - Replace FlatList in notifications page

3. **Add Sentry**
   - Create Sentry account
   - Install SDK
   - Configure source maps
   - Test error reporting

4. **Add Moti**
   - Install package
   - Add to loading states
   - Add to card animations
   - Add to modal transitions

**Estimated Time:** 8-12 hours

---

### Phase 2: Backend Setup (Week 3-4)

**Priority:** Must-Have

1. **Set up Supabase Edge Functions**
   - Create first function (Stripe webhook)
   - Deploy to production
   - Set up environment variables
   - Add error handling

2. **Configure TanStack Query**
   - Create query hooks for all operations
   - Set up optimistic updates
   - Configure stale times
   - Add error handling

3. **Set up Background Jobs**
   - Choose: Inngest vs pg_cron
   - Set up match reminders
   - Set up stats calculation
   - Set up notification batching

**Estimated Time:** 16-20 hours

---

### Phase 3: Monitoring & DevOps (Week 5)

**Priority:** High

1. **Complete Sentry Setup**
   - Add breadcrumbs
   - Add user context
   - Set up release tracking
   - Configure alerts

2. **Set up CI/CD**
   - GitHub Actions for type checking
   - EAS Build automation
   - Automated deployments

3. **Performance Monitoring**
   - Set up performance tracking
   - Monitor slow queries
   - Track API latency

**Estimated Time:** 8-12 hours

---

### Phase 4: Post-Launch Improvements (After MVP)

**Priority:** Nice-to-Have

1. **Add Maestro Testing**
   - Set up E2E tests
   - Test critical flows
   - Add to CI/CD

2. **Optimize Media**
   - Add Cloudinary integration
   - Set up image optimization
   - Configure CDN

3. **Add Advanced Features**
   - Video calling (Agora)
   - AI features (OpenAI)
   - Search (Typesense)

**Estimated Time:** 40-60 hours

---

## Cost Estimates

### MVP Phase (<10K users)

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Free or Pro | $0 - $25/mo |
| Vercel | Hobby | $0/mo |
| Expo EAS | Development | $0/mo |
| Sentry | Free | $0/mo |
| Inngest | Free | $0/mo |
| Stripe | Pay-per-transaction | 2.9% + $0.30 |
| **TOTAL** | | **$0-25/mo** |

---

### Growth Phase (10K-100K users)

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Pro | $25-100/mo |
| Cloudinary | Essential | $89/mo |
| Inngest | Pro | $20/mo |
| Expo EAS | Production | $99/mo |
| Sentry | Team | $26/mo |
| Vercel | Pro | $20/mo |
| Stripe | Pay-per-transaction | 2.9% + $0.30 |
| **TOTAL** | | **~$280-350/mo** |

---

### Scale Phase (100K+ users)

| Service | Tier | Cost |
|---------|------|------|
| Supabase | Pro + Compute | $200-500/mo |
| Cloudinary | Advanced | $224/mo |
| Inngest | Business | $200/mo |
| Expo EAS | Production | $99/mo |
| Sentry | Business | $80/mo |
| Vercel | Pro | $20-100/mo |
| Upstash Redis | Pro | $50/mo |
| Typesense Cloud | Growth | $99/mo |
| **TOTAL** | | **~$1,000-1,500/mo** |

---

## Quick Reference Commands

### Install High Priority Packages

```bash
# Performance
npx expo install react-native-mmkv
npx expo install @shopify/flash-list

# Animations
npx expo install moti

# Monitoring
npx expo install @sentry/react-native sentry-expo
```

---

### Install Medium Priority Packages

```bash
# Development tools
npx expo install reactotron-react-native

# Media optimization
# (Set up Cloudinary account separately)
```

---

### Supabase Edge Function Setup

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Login
supabase login

# Create new function
supabase functions new stripe-webhook

# Deploy function
supabase functions deploy stripe-webhook
```

---

## Key Decisions Summary

### ✅ Confirmed Choices

1. **Backend:** Supabase Edge Functions (not NestJS, Express, or Hasura)
2. **UI Library:** React Native Paper (not Tamagui or NativeWind)
3. **State:** Zustand + TanStack Query (not Redux)
4. **Background Jobs:** Inngest + pg_cron (not BullMQ)
5. **Hosting:** Vercel serverless (not Railway, Render, or Fly)
6. **Auth:** Supabase Auth (not Clerk)
7. **Storage:** MMKV + AsyncStorage (not just AsyncStorage)
8. **Lists:** FlashList (not just FlatList)
9. **Monitoring:** Sentry (must have)

---

### 🎯 Core Philosophy

**"Leverage Supabase's managed services for 90% of backend needs, add minimal serverless functions for complex logic, optimize frontend performance with proven tools."**

---

## FAQ

### Q: Should I use Prisma with Supabase?
**A:** No. You already have type-safe database types from `database.ts`. Prisma adds 2-5MB to your bundle and duplicates what Supabase provides.

### Q: Should I switch to GraphQL with Hasura?
**A:** Not now. REST + TanStack Query is simpler and working well. Only consider GraphQL if you have a specific need.

### Q: Should I use NestJS for better structure?
**A:** No. NestJS is for large teams and complex domains. Supabase Edge Functions are simpler and serverless.

### Q: Should I switch from Paper to Tamagui?
**A:** No, too late. You have 20+ screens built. Tamagui is amazing but requires full buy-in from day one.

### Q: When should I add BullMQ instead of Inngest?
**A:** Only if you need >100K jobs/month or complex queue management (priorities, rate limiting per queue).

### Q: Should I use Railway instead of Vercel?
**A:** Only if you go with traditional backend (NestJS/Express), which I don't recommend.

---

## Additional Resources

### Documentation Links

- **Supabase:** https://supabase.com/docs
- **TanStack Query:** https://tanstack.com/query/latest
- **React Native MMKV:** https://github.com/mrousavy/react-native-mmkv
- **FlashList:** https://shopify.github.io/flash-list/
- **Moti:** https://moti.fyi/
- **Sentry:** https://docs.sentry.io/platforms/react-native/
- **Inngest:** https://www.inngest.com/docs

---

### Learning Resources

- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions
- **TanStack Query Best Practices:** https://tkdodo.eu/blog/practical-react-query
- **React Native Performance:** https://reactnative.dev/docs/performance
- **Expo Deployment:** https://docs.expo.dev/deploy/build-project/

---

**Last Updated:** 2025-11-25
**Next Review:** When adding major features or hitting scale milestones
