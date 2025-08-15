# FireEngine

Self-hosted Firebase CMS with automatic schema detection and admin UI generation. Deploy your own professional admin interface in minutes, not months.

## Features

- ⚡ Automatic schema detection from your Firestore collections
- 🔒 Self-hosted on your own infrastructure
- 👥 Role-based access control with granular permissions
- 🎨 Schema customization via code configuration
- 🌐 Multiple authentication methods
- 📱 Responsive admin interface with modern Material UI

## Installation

```bash
yarn add fireenginecms
```

## Quick Start

```javascript
const express = require('express');
const fireengine = require('fireenginecms');
const app = express();

app.use('/admin', fireengine({
  adminCredentials: './firebase-admin-key.json',
  webappConfig: './firebase-config.json',
  ownerEmail: 'admin@yourdomain.com'
}));

app.listen(3000);
```

## Environment Variables

All FireEngine runtime environment variables use the `FIREENGINE_` prefix:

```bash
FIREENGINE_DOMAIN=yourdomain.com
FIREENGINE_FIREBASE_PROJECT_ID=your-project-id  
FIREENGINE_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREENGINE_FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@project.iam.gserviceaccount.com
FIREENGINE_OWNER_EMAIL=admin@yourdomain.com
```

For complete documentation including deployment guides, authentication setup, and advanced configuration, visit [fireengine.dev/docs](https://www.fireengine.dev/docs).

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `adminCredentials` | Object\|String | - | Firebase Admin SDK credentials (object or file path) |
| `webappConfig` | Object\|String | - | Firebase web app configuration (object or file path) |
| `ownerEmail` | String | - | Email of the admin owner |
| `schemaOverrides` | Object | {} | Custom schema definitions |
| `customFields` | Object | {} | Custom field type definitions |
| `googleMapsApiKey` | String | - | API key for Google Maps integration |
| `googleMapsOptions` | Object | {} | Google Maps configuration options |
| `ignoreCollections` | Array | [] | Collections to ignore during auto-detection |
| `useFirestoreAccessRules` | Boolean | false | Use Firebase security rules vs API endpoints |
| `firestoreDatabase` | String | - | Firestore database ID (for multi-database projects) |
| `storageMaxUploadSize` | String\|Number | - | Maximum file upload size (e.g., "100MB", "5GB") |

## Schema Customization

FireEngine automatically detects your Firestore collections and generates admin interfaces. You can customize these schemas:

```javascript
app.use('/', fireengine({
  // ... other config
  schemaOverrides: {
    "users": {
      title: "User Management",
      titleTemplate: "${displayName} (${email})",
      fields: [
        { name: "email", type: "string", required: true },
        { name: "displayName", type: "string", required: true },
        { name: "role", type: "string", options: ["admin", "user", "moderator"] }
      ]
    }
  }
}));
```

## Deployment

FireEngine can be deployed anywhere Node.js runs:

**Express Server:**
```javascript
const express = require('express');
const fireengine = require('fireenginecms');

const app = express();
app.use('/', fireengine(config));
app.listen(3000);
```

**Firebase Functions:**
```javascript
const functions = require('firebase-functions');
const fireengine = require('fireenginecms');

exports.admin = functions.https.onRequest(
  fireengine(config)
);
```

Set your environment variables and deploy normally. FireEngine works on any Node.js hosting platform.

## Links

- **Website:** [fireengine.dev](https://www.fireengine.dev/)
- **Documentation:** [fireengine.dev/docs](https://www.fireengine.dev/docs)
- **NPM Package:** [npmjs.com/package/fireenginecms](https://www.npmjs.com/package/fireenginecms)

## License

MIT License - see [LICENSE](LICENSE) file for details.