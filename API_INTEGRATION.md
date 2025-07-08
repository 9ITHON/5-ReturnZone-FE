# API Integration Documentation

## Overview

This project integrates with the ReturnZone API to provide location-based sorting and filtering of lost/found items.

## Features Implemented

### 1. Location-Based Sorting

- **가까운순 (Closest First)**: Items are sorted by distance from user's current location
- **최신순 (Latest First)**: Items are sorted by creation time
- Distance calculation using Haversine formula for accurate geographic distances

### 2. Location Permission Handling

- Requests user location permission on app startup
- Graceful fallback to default location (Seoul) if permission denied
- User-friendly permission request modal

### 3. API Integration

- Uses axios for HTTP requests
- Mock API service for development/testing
- Real API integration ready for production

## API Endpoints

### Base URL

```
https://chaeb03.github.io/swagger
```

### Available Endpoints

- `GET /items` - Get all items with optional filters
- `GET /items/category/{category}` - Get items by category
- `GET /items/location/{location}` - Get items by location
- `GET /items/nearby` - Get items sorted by distance (requires lat, lng, radius params)

## File Structure

```
src/
├── services/
│   ├── api.js          # Main API service with axios
│   └── mockApi.js      # Mock API for development
├── hooks/
│   └── useLocationData.js  # Custom hook for location and API data
├── components/
│   ├── LocationPermission.jsx  # Location permission modal
│   ├── FilterBar.jsx           # Updated with distance sorting
│   └── ItemCard.jsx            # Updated to show distance
└── pages/
    └── Home.jsx               # Main page with API integration
```

## Usage

### Switching Between Mock and Real API

In `src/services/api.js`, change the `USE_MOCK_API` constant:

```javascript
const USE_MOCK_API = true; // For development
const USE_MOCK_API = false; // For production
```

### Location Permission

The app automatically requests location permission on startup. Users can:

- Allow: Full location-based features
- Deny: Uses default location (Seoul) for sorting

### Distance Display

Items show distance from user location when:

- User has granted location permission
- "가까운순" (closest first) filter is selected
- Distance is calculated and displayed in meters (if < 1km) or kilometers

## Mock Data

The mock API includes sample items with realistic coordinates around Seoul:

- 월계1동, 월계2동, 월계3동
- 상계1동, 상계2동
- Various categories: 전자기기, 지갑, 반려동물, etc.

## Error Handling

- Network errors show retry button
- Location permission denied shows warning message
- Loading states with spinner animation
- Empty state when no items match filters

## Future Enhancements

- Real-time location updates
- Map integration
- Push notifications for nearby items
- Offline support with cached data
