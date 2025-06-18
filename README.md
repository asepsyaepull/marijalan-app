# Marijalan App

Marijalan is a travel and tourism platform that helps users discover, plan, and book their perfect trip experiences in Indonesia. The application connects travelers with local guides, attractions, and accommodations to create memorable journeys.

## About the Project

Marijalan (which means "Let's Go" in Javanese) aims to promote local tourism in Indonesia by:

- Connecting travelers with authentic local experiences
- Supporting small tourism businesses and local guides
- Providing comprehensive information about destinations
- Offering a seamless booking experience for accommodations and activities

## Features

- **Destination Discovery**: Browse popular destinations with detailed information
- **Tour Packages**: Explore curated tour packages with flexible options
- **Local Guides**: Connect with knowledgeable local guides
- **Booking System**: Easy reservation and payment processing
- **User Reviews**: Authentic feedback from fellow travelers
- **Personalized Recommendations**: Get suggestions based on your preferences

## Technologies Used

- Next.js for frontend development
- TypeScript for type safety
- Tailwind CSS for styling
- NextAuth.js for authentication
- Prisma for database management
- PostgreSQL for data storage
- Vercel for deployment

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/asepsyaepull/marijalan-app.git
cd marijalan-app
```

Install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
DATABASE_URL="your-database-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
