#!/bin/bash

# RealVictors Environment Setup Script
echo "🚀 Setting up RealVictors environment variables..."

# Create .env.local file
cat > .env.local << 'EOF'
# Supabase Configuration
# Replace these with your actual Supabase project values
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (for payments)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# Google Maps API Key (for location features)
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Mux Configuration (for video processing)
EXPO_PUBLIC_MUX_ENV_KEY=your_mux_environment_key_here
EOF

echo "✅ Created .env.local file"
echo ""
echo "📝 Next steps:"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Click on 'VictorOkenne's Project'"
echo "3. Go to Settings → API"
echo "4. Copy your Project URL and API Key"
echo "5. Replace the placeholder values in .env.local"
echo ""
echo "🔧 Required values:"
echo "   - EXPO_PUBLIC_SUPABASE_URL: Your Supabase project URL"
echo "   - EXPO_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon key"
echo ""
echo "🎉 Once configured, run: npm start"
