# The Book of Neumann - AI-Powered Photo Categorization

An intelligent photo management application that automatically categorizes and describes cat photos using Azure Computer Vision AI. Built with React, Azure Functions, and Azure Blob Storage.

## Features

- **Automatic AI Categorization**: Photos are automatically sorted into categories (Sleepy, Playing, Eating, Nature) using Computer Vision API
- **Smart Description Generation**: AI generates natural language descriptions for each photo
- **Serverless Architecture**: Event-driven processing with Azure Functions triggered on upload
- **Custom Scoring Algorithm**: Weighted tag-matching system for accurate categorization
- **Beautiful UI**: Vintage book-themed interface with smooth page transitions

## Technologies Used

### Frontend
- React 18
- Vite
- Azure Storage Blob SDK
- Lucide React (icons)

### Backend
- Azure Functions (Node.js)
- Azure Computer Vision API
- Azure Blob Storage
- Blob Triggers for event-driven processing

## Architecture
```
User uploads photo → Azure Blob Storage → Blob Trigger fires → Azure Function
                                                                      ↓
                                                            Computer Vision API
                                                                      ↓
                                                    Analyze tags & description
                                                                      ↓
                                                      Custom scoring algorithm
                                                                      ↓
                                                    Store metadata on blob
                                                                      ↓
React fetches photos with metadata → Display in categorized UI
```

## How the AI Works

1. **Image Analysis**: Computer Vision API analyzes uploaded images for tags (e.g., "cat", "sleeping", "indoor") and generates descriptions
2. **Smart Scoring**: Custom algorithm matches tags against category keywords:
   - Tags matching keywords: +1 point per match
   - Description matching keywords: +2 points (weighted higher for accuracy)
3. **Category Assignment**: Highest-scoring category wins, defaults to "All" if no strong match

Example:
- Tags: ["cat", "sleeping", "furniture"] 
- Description: "a cat sleeping on a couch"
- Result: Category = "Sleepy" ✓

## Setup & Installation

### Prerequisites
- Node.js 18+
- Azure account
- Azure Storage Account
- Azure Computer Vision resource
- Azure Function App

### Environment Variables

Create a `.env` file:
```env
VITE_AZURE_STORAGE_ACCOUNT_NAME=your-storage-account
VITE_AZURE_CONTAINER_NAME=your-container-name
VITE_AZURE_STORAGE_SAS_TOKEN=your-sas-token
```

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Azure Function Setup

1. Create Function App with Blob Trigger
2. Add application settings:
   - `VISION_ENDPOINT`
   - `VISION_KEY`
   - `AZURE_STORAGE_CONNECTION_STRING`
   - `CONTAINER_NAME`
3. Deploy function code

## Features in Detail

### Category Keywords
The scoring system uses carefully curated keywords for each category:
- **Sleepy**: sleeping, nap, lying, rest, bed, tired, relaxing
- **Playing**: playing, pounce, chase, toy, fun, jump, attack, hunting
- **Eating**: eat, food, meal, snack, bowl, feeding, treat, hungry, kitchen
- **Nature**: nature, outside, window, watching, garden, trees, grass, sunlight

### Metadata Storage
Categories and descriptions are stored as blob metadata for efficient retrieval without requiring a separate database.

## Challenges & Solutions

- **CORS Configuration**: Configured Azure Storage CORS to allow localhost and production origins
- **Metadata Timing**: Implemented refresh-based approach to handle AI processing delay
- **Accurate Categorization**: Weighted scoring system balances tags and descriptions for better accuracy

## Future Enhancements

- [ ] Manual category override option
- [ ] Confidence score display
- [ ] Batch photo upload
- [ ] Additional categories based on common tags
- [ ] User authentication

# Live Demo
Check it out here at https://ambitious-hill-05dc6690f.6.azurestaticapps.net ! 
*Built as a full-stack demonstration of serverless architecture and AI integration*