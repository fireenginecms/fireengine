# FireEngine

FireEngine is a Firebase integration framework for React applications that provides authentication, content management, and configurable data access patterns.

## Features

- Firebase v9+ integration
- Multiple authentication methods (Email, Google)
- User profile management
- Content Management System for Firestore data
- Configurable Firestore access patterns
- Internationalization support with react-intl

## Installation

```bash
yarn add fireengine
```

## Usage

```javascript
const express = require('express');
const app = express();
const fireengine = require('fireengine');
const port = 3000;

app.use('/', fireengine.default({
  adminCredentials: require('./path/to/credentials.json'),
  webappConfig: require('./path/to/webapp-config.json'),
  firestoreDatabase: "my-named-database", // Optional: specify a named Firestore database
  signinMethods: [
    fireengine.SigninMethodEmail({ signInWithEmailLink: true }),
    fireengine.SigninMethodGoogle()
  ],
  googleMapsApiKey: "your-google-maps-api-key", // Optional: Enable Google Maps integration
  useFirestoreAccessRules: false, // Default: false - Uses API endpoints to bypass security rules
  storageMaxUploadSize: "1GB" // Optional: Maximum file upload size (defaults to 5GB or NODE_OPTIONS limit)
}));

app.listen(port, () => { 
  console.log(`App listening at http://localhost:${port}`) 
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `adminCredentials` | Object/String | - | Firebase Admin SDK credentials object or path to JSON file |
| `webappConfig` | Object | - | Firebase web configuration object |
| `firestoreDatabase` | String | - | Optional: specify a named Firestore database (region is automatically determined) |
| `signinMethods` | Array | [] | Authentication methods to enable |
| `schemaOverrides` | Object | - | Override Firestore schema definitions with collection objects containing `fields` arrays, `title`, and `titleTemplate` properties |
| `googleMapsApiKey` | String | '' | API key for Google Maps integration |
| `googleMapsOptions` | Object | {} | Custom Google Maps options to override defaults (MapOptions object) |
| `ignoreCollections` | Array | [] | Array of collection paths to ignore during auto-detection (supports subcollections like "articles/comments") |
| `useFirestoreAccessRules` | Boolean | false | When `true`, uses direct Firestore access with Firebase security rules. When `false`, uses server API endpoints to bypass security rules |
| `ownerEmail` | String | - | Email address of the owner user who gets automatic admin privileges |
| `storageMaxUploadSize` | String/Number | auto-detected | Maximum file upload size. Supports units ("1GB", "500MB", "100KB") or bytes. Defaults to 5GB or NODE_OPTIONS memory limit if constraining. |

## Environment Variables

FireEngine automatically detects and uses environment variables prefixed with `FIREENGINE_`. Environment variables take precedence over configuration options passed to the FireEngine constructor.

### Firebase Admin SDK Configuration

| Environment Variable | Description | Example |
|---------------------|-------------|---------|
| `FIREENGINE_ADMIN_CREDENTIALS_JSON` | Complete Firebase Admin SDK credentials as JSON string | `'{"type":"service_account","project_id":"..."}'` |
| `FIREENGINE_ADMIN_CREDENTIALS_FILE` | Path to Firebase Admin SDK credentials JSON file | `'./path/to/service-account.json'` |
| `FIREENGINE_ADMIN_TYPE` | Credential type (usually "service_account") | `'service_account'` |
| `FIREENGINE_ADMIN_PROJECT_ID` | Firebase project ID | `'my-firebase-project'` |
| `FIREENGINE_ADMIN_PRIVATE_KEY_ID` | Private key ID from service account | `'abc123...'` |
| `FIREENGINE_ADMIN_PRIVATE_KEY` | Private key from service account (use `\n` for newlines) | `'-----BEGIN PRIVATE KEY-----\n...'` |
| `FIREENGINE_ADMIN_CLIENT_EMAIL` | Service account email | `'firebase-adminsdk-abc123@project.iam.gserviceaccount.com'` |
| `FIREENGINE_ADMIN_CLIENT_ID` | Client ID from service account | `'123456789'` |
| `FIREENGINE_ADMIN_AUTH_URI` | Authentication URI | `'https://accounts.google.com/o/oauth2/auth'` |
| `FIREENGINE_ADMIN_TOKEN_URI` | Token URI | `'https://oauth2.googleapis.com/token'` |
| `FIREENGINE_ADMIN_AUTH_PROVIDER_X509_CERT_URL` | Auth provider cert URL | `'https://www.googleapis.com/oauth2/v1/certs'` |
| `FIREENGINE_ADMIN_CLIENT_X509_CERT_URL` | Client cert URL | `'https://www.googleapis.com/robot/v1/metadata/x509/...'` |
| `FIREENGINE_ADMIN_UNIVERSE_DOMAIN` | Universe domain (usually "googleapis.com") | `'googleapis.com'` |

### Firebase Web App Configuration

| Environment Variable | Description | Example |
|---------------------|-------------|---------|
| `FIREENGINE_WEBAPP_CONFIG_JSON` | Complete Firebase web app config as JSON string | `'{"apiKey":"abc123","authDomain":"..."}'` |
| `FIREENGINE_WEBAPP_CONFIG_FILE` | Path to Firebase web app config JSON file | `'./path/to/webapp-config.json'` |
| `FIREENGINE_WEBAPP_API_KEY` | Firebase web app API key | `'AIzaSyAbc123...'` |
| `FIREENGINE_WEBAPP_AUTH_DOMAIN` | Firebase auth domain | `'my-project.firebaseapp.com'` |
| `FIREENGINE_WEBAPP_PROJECT_ID` | Firebase project ID | `'my-firebase-project'` |
| `FIREENGINE_WEBAPP_STORAGE_BUCKET` | Firebase storage bucket | `'my-project.appspot.com'` |
| `FIREENGINE_WEBAPP_MESSAGING_SENDER_ID` | FCM sender ID | `'123456789'` |
| `FIREENGINE_WEBAPP_APP_ID` | Firebase app ID | `'1:123456789:web:abc123'` |
| `FIREENGINE_WEBAPP_MEASUREMENT_ID` | Google Analytics measurement ID | `'G-ABC123DEF'` |

### FireEngine Configuration

| Environment Variable | Description | Example |
|---------------------|-------------|---------|
| `FIREENGINE_FIRESTORE_DATABASE` | Named Firestore database | `'production-db'` |
| `FIREENGINE_OWNER_EMAIL` | Owner email for automatic admin privileges | `'admin@example.com'` |
| `FIREENGINE_USE_FIRESTORE_ACCESS_RULES` | Use Firestore security rules (`true`/`false`) | `'false'` |
| `FIREENGINE_GOOGLE_MAPS_API_KEY` | Google Maps API key | `'AIzaSyAbc123...'` |
| `FIREENGINE_GOOGLE_MAPS_OPTIONS` | Google Maps options as JSON string | `'{"zoom":12,"mapTypeId":"satellite"}'` |
| `FIREENGINE_IGNORE_COLLECTIONS` | Comma-separated list of collections to ignore | `'logs,analytics,temp'` |
| `FIREENGINE_SCHEMA_OVERRIDES` | Schema overrides as JSON string | `'{"users":{"title":"Users","fields":[...]}}'` |
| `FIREENGINE_SIGNIN_METHODS` | Sign-in methods as JSON string | `'[{"type":"email"},{"type":"google"}]'` |
| `FIREENGINE_STORAGE_MAX_UPLOAD_SIZE` | Maximum file upload size with units | `'1GB'`, `'500MB'`, `'100KB'` |

### Environment Variable Examples

#### Using Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    environment:
      # Firebase Admin SDK
      FIREENGINE_ADMIN_PROJECT_ID: my-firebase-project
      FIREENGINE_ADMIN_CLIENT_EMAIL: firebase-adminsdk-abc123@project.iam.gserviceaccount.com
      FIREENGINE_ADMIN_PRIVATE_KEY: |
        -----BEGIN PRIVATE KEY-----
        MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
        -----END PRIVATE KEY-----
      
      # Firebase Web App
      FIREENGINE_WEBAPP_API_KEY: AIzaSyAbc123...
      FIREENGINE_WEBAPP_AUTH_DOMAIN: my-project.firebaseapp.com
      FIREENGINE_WEBAPP_PROJECT_ID: my-firebase-project
      
      # FireEngine Settings
      FIREENGINE_OWNER_EMAIL: admin@example.com
      FIREENGINE_GOOGLE_MAPS_API_KEY: AIzaSyAbc123...
      FIREENGINE_USE_FIRESTORE_ACCESS_RULES: 'false'
      FIREENGINE_IGNORE_COLLECTIONS: 'logs,analytics,temp'
      FIREENGINE_STORAGE_MAX_UPLOAD_SIZE: '1GB'
```

#### Using .env File

```bash
# Firebase Admin SDK (individual fields)
FIREENGINE_ADMIN_PROJECT_ID=my-firebase-project
FIREENGINE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-abc123@project.iam.gserviceaccount.com
FIREENGINE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Or Firebase Admin SDK (as JSON)
FIREENGINE_ADMIN_CREDENTIALS_JSON='{"type":"service_account","project_id":"my-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'

# Firebase Web App (individual fields)
FIREENGINE_WEBAPP_API_KEY=AIzaSyAbc123...
FIREENGINE_WEBAPP_AUTH_DOMAIN=my-project.firebaseapp.com
FIREENGINE_WEBAPP_PROJECT_ID=my-firebase-project
FIREENGINE_WEBAPP_STORAGE_BUCKET=my-project.appspot.com
FIREENGINE_WEBAPP_MESSAGING_SENDER_ID=123456789
FIREENGINE_WEBAPP_APP_ID=1:123456789:web:abc123

# Or Firebase Web App (as JSON)
FIREENGINE_WEBAPP_CONFIG_JSON='{"apiKey":"AIzaSyAbc123...","authDomain":"my-project.firebaseapp.com","projectId":"my-firebase-project","storageBucket":"my-project.appspot.com","messagingSenderId":"123456789","appId":"1:123456789:web:abc123"}'

# FireEngine Configuration
FIREENGINE_OWNER_EMAIL=admin@example.com
FIREENGINE_GOOGLE_MAPS_API_KEY=AIzaSyAbc123...
FIREENGINE_USE_FIRESTORE_ACCESS_RULES=false
FIREENGINE_IGNORE_COLLECTIONS=logs,analytics,temp,users/sessions
FIREENGINE_FIRESTORE_DATABASE=production-db
FIREENGINE_STORAGE_MAX_UPLOAD_SIZE=2GB

# Complex JSON configurations
FIREENGINE_GOOGLE_MAPS_OPTIONS='{"zoom":12,"mapTypeControl":true,"streetViewControl":false}'
FIREENGINE_SCHEMA_OVERRIDES='{"users":{"title":"Application Users","titleTemplate":"${displayName} (${email})","fields":[{"name":"email","type":"string","required":true},{"name":"displayName","type":"string"}]}}'
```

#### Minimal Configuration with Environment Variables

With environment variables configured, you can use a minimal FireEngine setup:

```javascript
const express = require('express');
const app = express();
const fireengine = require('fireengine');

// All configuration comes from environment variables
app.use('/', fireengine.default({
  signinMethods: [
    fireengine.SigninMethodEmail({ signInWithEmailLink: true }),
    fireengine.SigninMethodGoogle()
  ]
}));

app.listen(3000, () => { 
  console.log(`App listening at http://localhost:3000`) 
});
```

### Environment Variable Priority

Environment variables take precedence over configuration options passed to the FireEngine constructor. The merge order is:

1. **Provided Configuration** (lowest priority)
2. **Environment Variables** (highest priority)

This allows you to:
- Set default configurations in code
- Override specific settings with environment variables for different environments
- Keep sensitive credentials out of your codebase

## Authentication Methods

FireEngine supports multiple authentication methods:

```javascript
// Email with Password
fireengine.SigninMethodEmail()

// Email with Magic Link
fireengine.SigninMethodEmail({ signInWithEmailLink: true })

// Google
fireengine.SigninMethodGoogle()
```

## File Upload Configuration

FireEngine automatically determines the optimal maximum file upload size using intelligent defaults that balance performance, memory usage, and Firebase Storage limits.

### Upload Size Priority Order

1. **User Configuration**: `storageMaxUploadSize` option (highest priority)
2. **Environment Variable**: `FIREENGINE_STORAGE_MAX_UPLOAD_SIZE`
3. **NODE_OPTIONS Detection**: Automatically detects `--max-old-space-size` and uses 80% of available memory (only if less than 5GB)
4. **Firebase Default**: 5GB (Firebase Storage's actual limit)

### Configuration Examples

```javascript
// Set via code configuration
app.use('/', fireengine.default({
  // ... other config
  storageMaxUploadSize: "2GB", // String with units
  // or
  storageMaxUploadSize: 2147483648 // Number in bytes
}));
```

```bash
# Set via environment variable
export FIREENGINE_STORAGE_MAX_UPLOAD_SIZE="1GB"

# Automatic detection from Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=512"  # Results in ~400MB upload limit
export NODE_OPTIONS="--max-old-space-size=8192" # No constraint (uses 5GB default)
```

### Supported Size Units

- **GB**: Gigabytes (e.g., "5GB", "2.5GB")
- **MB**: Megabytes (e.g., "500MB", "100.5MB")
- **KB**: Kilobytes (e.g., "1024KB")
- **B**: Bytes (e.g., "1073741824B") or plain numbers (e.g., 1073741824)

### Automatic Memory-Safe Defaults

FireEngine prevents out-of-memory issues by:

- **Memory Detection**: Automatically detects Node.js memory limits from `NODE_OPTIONS`
- **Conservative Allocation**: Uses only 80% of available memory for uploads
- **Smart Constraints**: Only applies memory limits when they're actually constraining (less than Firebase's 5GB limit)
- **Transparent Logging**: Displays the chosen upload size on startup for transparency

### Examples

```bash
# High-memory server - uses Firebase's 5GB limit
NODE_OPTIONS="--max-old-space-size=16384"  # 16GB available, no constraint

# Low-memory server - automatically constrains uploads
NODE_OPTIONS="--max-old-space-size=512"    # 512MB available, ~400MB upload limit

# Override with specific limit
FIREENGINE_STORAGE_MAX_UPLOAD_SIZE="200MB"  # Force specific limit regardless of memory
```

The upload size is displayed in the asset management interface, so users always know the current limit.

## Schema Overrides

FireEngine automatically generates schema definitions by analyzing your Firestore data types and structure. You can customize these schemas using the `schemaOverrides` configuration option.

### How It Works

1. **Automatic Detection**: FireEngine analyzes your Firestore collections to detect field types (string, number, boolean, geoPoint, reference, etc.)
2. **Override Application**: Your custom schema overrides completely replace the auto-generated schema for specified collections
3. **Enhanced UI**: Reference fields get modal selectors, proper input types are used, and relationships between documents are defined

### Basic Schema Override Examples

```javascript
app.use('/', fireengine.default({
  // ... other config
  schemaOverrides: {
    "users": {
      title: "Users", // Custom display title for collection (used in breadcrumbs and tabs)
      titleTemplate: "${email}", // Template for document titles (supports ${field} variables)
      fields: [
        { name: "email", type: "string", required: true },
        { name: "role", type: "string", options: ["admin", "user", "moderator"] },
        { name: "isActive", type: "boolean", default: true }
      ]
    }
  }
}));
```

### Field Validation Functions

FireEngine supports custom validation functions for form fields that provide real-time validation feedback to users.

```javascript
schemaOverrides: {
  "users": {
    title: "Users",
    fields: [
      { 
        name: "email", 
        type: "string", 
        required: true,
        validate: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return "Please enter a valid email address";
          }
          return true; // Validation passed
        }
      },
      { 
        name: "age", 
        type: "number",
        validate: (value) => {
          if (value < 18) {
            return "Must be 18 years or older";
          }
          if (value > 120) {
            return "Please enter a realistic age";
          }
          return true;
        }
      },
      {
        name: "username",
        type: "string",
        required: true,
        validate: (value) => {
          if (value.length < 3) {
            return "Username must be at least 3 characters";
          }
          if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return "Username can only contain letters, numbers, and underscores";
          }
          return true;
        }
      }
    ]
  }
}
```

#### How Validation Works

- **Return `true`**: Validation passes, no error shown
- **Return a string**: Validation fails, the string is displayed as the error message
- **Validation timing**: Functions run when the user clicks away from the field (onBlur) and when saving the document
- **Error display**: Validation errors appear both next to the field and in toast notifications when saving
- **Backend validation**: Validation functions also run server-side for security

#### Async Validation

For more complex validation that requires API calls:

```javascript
{
  name: "username",
  type: "string",
  validate: async (value) => {
    try {
      const response = await fetch(`/api/check-username/${value}`);
      const available = await response.json();
      if (!available) {
        return "Username is already taken";
      }
      return true;
    } catch (error) {
      return "Unable to validate username";
    }
  }
}
```

### Custom Field Types

Create reusable custom field types with specialized rendering and validation:

```javascript
// Define custom field render functions
const renderFullNameInput = ({ name, value, label }) => [
  function render() {
    const [first, last] = (value || '').split(' ');
    return `
      <div class="full-name-field">
        <label>${label || name}</label>
        <input id="${name}_first" value="${first || ''}" placeholder="First Name" />
        <input id="${name}_last" value="${last || ''}" placeholder="Last Name" />
      </div>
    `;
  },
  function getValue() {
    const first = document.getElementById(`${name}_first`).value;
    const last = document.getElementById(`${name}_last`).value;
    return `${first} ${last}`.trim();
  },
  function cleanup() {
    // Optional cleanup when field is removed
  }
];

// Optional: Custom display rendering for details page
const renderFullNameOutput = ({ name, value, label }) => {
  // Can return just the render function...
  return function render() {
    return `<strong>${value || 'No name provided'}</strong>`;
  };
  
  // Or an array with optional cleanup: [render, cleanup?]
  // return [
  //   function render() {
  //     return `<strong>${value || 'No name provided'}</strong>`;
  //   },
  //   function cleanup() {
  //     // Optional cleanup when field is unmounted
  //   }
  // ];
};

app.use('/', fireengine({
  // ... other config
  customFields: {
    "full_name": {
      extends: "string",
      label: "Full Name",
      renderInput: renderFullNameInput,
      renderOutput: renderFullNameOutput // Optional - if undefined, uses built-in string rendering
    }
  },
  schemaOverrides: {
    "users": {
      fields: [
        { name: "fullName", type: "full_name", required: true }
      ]
    }
  }
}));
```

#### Custom Field Interface

Custom field definitions support the following properties:

**extends** (required): The base field type to extend (e.g., "string", "number")

**label** (optional): Display label for the custom field type

**inList** (optional): Default visibility in table lists (defaults to `false`)
- When `true`, fields using this custom type will appear in table lists by default
- Can be overridden at the field level in schema overrides
- Custom fields must explicitly opt-in to table display (unlike built-in types)

**renderInput** (required): Used for form input rendering
- Receives props object: `{ name, value, label }`
- Must return array: `[render, getValue, cleanup?]`
- `render()`: Returns HTML string for the field UI
- `getValue()`: Extracts current value from the DOM
- `cleanup()`: Optional cleanup when field is unmounted

**renderOutput** (optional): Used for details page display and table lists (when inList is true)
- Receives props object: `{ name, value, label }`
- Can return either:
  - Single function: `render()` - Returns HTML string for display
  - Array: `[render, cleanup?]` - With optional cleanup function
- If undefined, uses built-in rendering for the field's `extends` type

**Props object contains:**
- `name` (string): Field name for DOM element IDs
- `value` (any): Current field value
- `label` (string): Display label (falls back to name)

### Reference Field Configuration

```javascript
schemaOverrides: {
  "articles": {
    fields: [
      { name: "authorId", type: "reference", referencePath: "users" },
      { name: "categoryId", type: "reference", referencePath: "categories" }
    ]
  },
  "orders": {
    fields: [
      { name: "customerId", type: "reference", referencePath: "users" }
    ]
  }
}
```

### Subcollection References

```javascript
schemaOverrides: {
  "articles": {
    fields: [
      { name: "featuredComment", type: "reference", referencePath: "articles/comments" }
    ]
  },
  "articles/comments": {
    fields: [
      { name: "authorId", type: "reference", referencePath: "users" },
      { name: "parentComment", type: "reference", referencePath: "articles/comments" }
    ]
  }
}
```

### Complex Field Types

```javascript
schemaOverrides: {
  "products": {
    fields: [
      { name: "price", type: "number", format: "currency" },
      { name: "tags", type: "array", itemType: "string" },
      { name: "location", type: "geoPoint", required: false },
      { name: "specifications", type: "map" }
    ]
  }
}
```

### Schema Override Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | String | Custom display title for the collection (used in breadcrumbs and navigation tabs) |
| `titleTemplate` | String | Template for document titles using ${field} variables (e.g., "${email}", "${firstName} ${lastName}") |
| `fields` | Array | Array of field definitions for the collection |
| `ignoreFields` | Array | List of field names to hide from the UI (takes precedence over includeFields) |
| `includeFields` | Array | List of field names to show in the UI (if specified, only these fields will be visible) |
| `download` | Boolean | Controls whether collection data can be exported as CSV (default: true) |

When `titleTemplate` is specified, FireEngine will replace ${field} variables with document field values for document titles in breadcrumbs and detail views. If a field is empty or doesn't exist, it preserves the template variable. If no template is provided, it falls back to common title fields or document ID.

### Download Control

The `download` property controls whether users can export collection data as CSV files. This provides fine-grained control over data access and security.

**Default Behavior:**
- All collections allow CSV downloads by default (`download: true`)
- Download permission is checked before showing the export button
- Works for both root collections and subcollections

**Configuration Examples:**

```javascript
schemaOverrides: {
  "users": {
    title: "Users",
    download: false, // Disable CSV export for sensitive user data
    fields: [
      { name: "email", type: "string", required: true },
      { name: "role", type: "string" }
    ]
  },
  "orders": {
    title: "Orders", 
    download: true, // Explicitly allow downloads (default behavior)
    fields: [
      { name: "customerId", type: "reference", referencePath: "users" },
      { name: "total", type: "number" }
    ]
  },
  "articles/comments": {
    title: "Article Comments",
    download: false, // Disable downloads for subcollections
    fields: [
      { name: "content", type: "string" },
      { name: "authorId", type: "reference", referencePath: "users" }
    ]
  }
}
```

**GUI Management:**
- Use Settings > Schema Management to control download permissions
- Toggle "Allow CSV Downloads" switch for each collection
- Changes are stored in `_fireengineMeta/schemaOverrides` document
- GUI overrides take precedence over code-based configuration

### Field Properties

Individual fields in the `fields` array support the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | Field name (must match database field) |
| `title` | String | Custom display label for the field (overrides auto-detected field name) |
| `type` | String | Field type (automatically detected, but can be overridden) |
| `required` | Boolean | Mark field as required for validation |
| `options` | Array | Array of options for select dropdowns (string[], [value,text][], or objects) |
| `width` | Number | Grid width as fraction from 0.08333333 (1/12) to 1 (12/12) for detail page layout (defaults to 0.5 for most fields, 1 for editors/large arrays) |
| `default` | Any | Default value for new documents |
| `validTypes` | Array | For array fields, array of valid item types (e.g., ["string", "number", "geoPoint", "reference"]) |
| `min` | Number | For array fields, minimum number of items required |
| `max` | Number | For array fields, maximum number of items allowed |
| `inList` | Boolean | Controls visibility in table lists (see Table Display Control below) |

#### Table Display Control (`inList`)

The `inList` property controls whether a field appears in table lists. This provides fine-grained control over which fields are displayed in collection tables vs. detail views.

**Default Behavior:**
- **Built-in types**: Most common types (`string`, `number`, `boolean`, `timestamp`) default to `true`
- **Complex types**: Large or complex types (`geoPoint`, `reference`, `map`, `array`, `editor`, `assets`) default to `false`
- **Custom fields**: All custom field types default to `false` (must explicitly opt-in)

**Setting inList:**

```javascript
schemaOverrides: {
  "products": {
    fields: [
      { name: "name", type: "string", inList: true },           // Explicitly show in table
      { name: "description", type: "string", inList: false },   // Hide from table 
      { name: "price", type: "number" },                        // Uses default (true)
      { name: "specifications", type: "map", inList: true },    // Override default to show
      { name: "customField", type: "my_custom_type", inList: true } // Custom field opts in
    ]
  }
}
```

**Custom Field inList:**

For custom fields, you can set `inList` either at the field level or in the custom field definition:

```javascript
// Option 1: Set at field level (takes precedence)
schemaOverrides: {
  "users": {
    fields: [
      { name: "fullName", type: "full_name", inList: true }
    ]
  }
}

// Option 2: Set at custom field definition level
customFields: {
  "full_name": {
    extends: "string",
    inList: true,  // Default for all fields using this type
    renderInput: renderFullNameInput
  }
}
```

#### Title Template Examples

```javascript
// Simple field reference
titleTemplate: "${email}"
// Result: "user@example.com"

// Multiple field combination
titleTemplate: "${firstName} ${lastName}"
// Result: "John Doe"

// With static text
titleTemplate: "User: ${email} (${role})"
// Result: "User: john@example.com (admin)"

// Nested field access
titleTemplate: "${profile.name} - ${company}"
// Result: "John Smith - Acme Corp"
```

### Field Filtering

FireEngine provides flexible field filtering options to control which fields appear in the UI:

#### Using ignoreFields

Hide specific fields from being displayed or edited:

```javascript
schemaOverrides: {
  "users": {
    title: "Users",
    ignoreFields: ["internalId", "createdAt", "lastLogin", "passwordHash"],
    fields: [
      { name: "email", type: "string", required: true },
      { name: "displayName", type: "string" },
      { name: "role", type: "string", options: ["admin", "user"] }
    ]
  }
}
```

#### Using includeFields

Show only specific fields (whitelist approach):

```javascript
schemaOverrides: {
  "products": {
    title: "Products", 
    includeFields: ["name", "price", "description", "category", "inStock"],
    fields: [
      { name: "name", type: "string", required: true },
      { name: "price", type: "number", required: true },
      { name: "description", type: "string" },
      { name: "category", type: "string", options: ["electronics", "clothing", "books"] },
      { name: "inStock", type: "boolean", default: true }
    ]
  }
}
```

#### Combining Both (ignoreFields takes precedence)

```javascript
schemaOverrides: {
  "orders": {
    title: "Orders",
    includeFields: ["orderId", "customerId", "items", "total", "status", "createdAt"],
    ignoreFields: ["createdAt"], // This will be hidden despite being in includeFields
    fields: [
      { name: "orderId", type: "string", required: true },
      { name: "customerId", type: "reference", referencePath: "users" },
      { name: "items", type: "array" },
      { name: "total", type: "number" },
      { name: "status", type: "string", options: ["pending", "shipped", "delivered"] }
    ]
  }
}
```

#### Field Filtering Rules

1. **No filtering specified**: All auto-detected and defined fields are shown
2. **Only ignoreFields**: All fields except ignored ones are shown  
3. **Only includeFields**: Only the specified fields are shown
4. **Both specified**: Only included fields are shown, EXCEPT those that are also ignored (ignoreFields takes precedence)

This is particularly useful for:
- Hiding sensitive fields (passwords, internal IDs, system timestamps)
- Simplifying forms by showing only relevant fields
- Creating different views for different user roles
- Maintaining data integrity while allowing selective editing

### Ignoring Collections During Auto-Detection

FireEngine can ignore specific collections and subcollections during the automatic schema detection process using the `ignoreCollections` configuration:

```javascript
app.use('/', fireengine.default({
  // ... other config
  ignoreCollections: [
    "logs",           // Ignore root collection "logs"
    "analytics",      // Ignore root collection "analytics" 
    "temp",           // Ignore root collection "temp"
    "articles/drafts", // Ignore subcollection "drafts" under "articles"
    "users/sessions", // Ignore subcollection "sessions" under "users"
    "orders/audit"    // Ignore subcollection "audit" under "orders"
  ],
  schemaOverrides: {
    // Your schema overrides here
    "articles": {
      title: "Articles",
      fields: [
        { name: "title", type: "string", required: true },
        { name: "content", type: "string" }
      ]
    }
  }
}));
```

#### How Collection Ignoring Works

1. **Root Collections**: Collections like `"logs"` or `"analytics"` are completely ignored during auto-detection
2. **Subcollections**: Specific subcollections like `"articles/comments"` are ignored while keeping the parent collection
3. **Hierarchy Respect**: If a parent collection is ignored, all its subcollections are automatically ignored
4. **Schema Override Priority**: Collections defined in `schemaOverrides` will still appear even if they're in `ignoreCollections`

#### Use Cases for Ignoring Collections

- **System Collections**: Hide internal collections like logs, analytics, or temporary data
- **Performance**: Skip large collections that don't need admin interface access
- **Security**: Prevent access to sensitive collections through the admin interface
- **Clutter Reduction**: Remove development/testing collections from production admin interface
- **Selective Subcollections**: Keep main collections but hide specific subcollections like drafts or audit trails

#### Example: E-commerce Setup

```javascript
ignoreCollections: [
  "logs",                    // System logs
  "analytics",               // Analytics data  
  "cache",                   // Cached data
  "users/sessions",          // User session data
  "users/loginHistory",      // Login tracking
  "orders/statusHistory",    // Order status audit trail
  "products/viewHistory",    // Product view tracking
  "temp"                     // Temporary data
]
```

This configuration keeps your admin interface clean by showing only the collections that need regular management while hiding system-level data.

### GUI Schema Override Editor

FireEngine includes a built-in GUI editor for schema overrides accessible through **Settings > Schema Management**. This provides a user-friendly way to customize collection properties without modifying code.

#### Features

- **Visual Editor**: Edit collection titles and title templates through a web interface
- **Live Preview**: See changes immediately in the schema view
- **Persistent Storage**: Overrides are stored in the `_fireengineMeta` collection in Firestore
- **Smart Merging**: GUI overrides merge with and override code-based `schemaOverrides`
- **Per-Collection Management**: Add, edit, or remove overrides for individual collections

#### How GUI Overrides Work

1. **Priority System**: GUI overrides take precedence over code-based `schemaOverrides`
2. **Merge Logic**: GUI and code overrides are intelligently merged:
   - GUI collection config (title, titleTemplate) overrides code config
   - GUI field definitions merge with code field definitions
   - Fields with the same name: GUI properties override code properties
3. **Storage**: GUI overrides are stored in `_fireengineMeta/schemaOverrides` document
4. **Auto-Loading**: GUI overrides are automatically loaded and applied when the schema is accessed

#### Using the GUI Editor

1. Navigate to **Settings > Schema Management**
2. Click the edit icon (✏️) next to any collection
3. Modify the collection title and title template
4. Click **Save Override** to persist changes
5. Changes are immediately applied to the admin interface

#### Example: GUI Override Result

```javascript
// Code-based override
schemaOverrides: {
  "users": {
    title: "System Users",
    fields: [
      { name: "email", type: "string", required: true }
    ]
  }
}

// GUI override (stored in _fireengineMeta)
{
  "users": {
    title: "Application Users",
    titleTemplate: "${displayName} (${email})"
  }
}

// Final merged result
{
  "users": {
    title: "Application Users",        // GUI override wins
    titleTemplate: "${displayName} (${email})", // From GUI
    fields: [
      { name: "email", type: "string", required: true } // From code
    ]
  }
}
```

This approach allows developers to set up base schema configurations in code while enabling administrators to customize display properties through the GUI without requiring code deployments.

### Benefits of Schema Overrides

- **Complete Control**: Schema overrides completely replace auto-discovered schemas, giving you exact control over which fields appear
- **Custom Titles**: Use meaningful field values instead of document IDs for better user experience
- **Reference Selection UI**: Reference fields display a modal selector instead of text input
- **Type Validation**: Proper input types and validation for each field
- **Document Relationships**: Navigate between related documents easily
- **Custom Collections**: Define collections that don't exist in Firestore yet
- **Subcollection Support**: Handle complex document relationships and nested collections

### Backwards Compatibility

FireEngine supports both the new object format and the legacy array format for schema overrides:

```javascript
// New format (recommended) - with title and titleTemplate support
schemaOverrides: {
  "users": {
    title: "Users",
    titleTemplate: "${email}",
    fields: [
      { name: "email", type: "string", required: true }
    ]
  }
}

// Legacy format (still supported)
schemaOverrides: {
  "users": [
    { name: "email", type: "string", required: true }
  ]
}
```

## Google Maps Integration

FireEngine includes beautiful Google Maps integration with custom styling and full configuration options for GeoPoint fields.

### Basic Setup

To enable Google Maps integration, simply add your Google Maps API key to the configuration:

```javascript
app.use('/', fireengine.default({
  // ... other config
  googleMapsApiKey: "your-google-maps-api-key"
}));
```

### Default Styling and Behavior

When `googleMapsApiKey` is configured, FireEngine automatically applies:

**Custom Map Styling:**
- Desaturated colors for a clean, professional look
- Simplified road networks and reduced visual clutter
- Better contrast for readability
- Minimalist water and landscape styling

**Clean Interface:**
- No map type selector (satellite/roadmap buttons)
- No street view control (pegman icon) 
- No fullscreen button
- Zoom controls disabled by default
- Dragging disabled (except in edit mode)

### Custom Map Options

You can customize any aspect of the map using `googleMapsOptions`:

```javascript
app.use('/', fireengine.default({
  // ... other config
  googleMapsApiKey: "your-google-maps-api-key",
  googleMapsOptions: {
    // Override default zoom level
    zoom: 12,
    
    // Re-enable controls if desired
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
    
    // Custom map styles (overrides default styling)
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#e9e9e9"}]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"color": "#f5f5f5"}]
      }
    ],
    
    // Any other Google Maps MapOptions
    gestureHandling: "cooperative",
    mapTypeId: "satellite"
  }
}));
```

### GeoPoint Field Configuration

Use GeoPoint fields in your schema to enable map functionality:

```javascript
schemaOverrides: {
  "locations": {
    title: "Locations",
    titleTemplate: "${name} - ${city}",
    fields: [
      { name: "name", type: "string", required: true },
      { name: "coordinates", type: "geoPoint", required: true },
      { name: "address", type: "string" },
      { name: "city", type: "string" }
    ]
  },
  "events": {
    fields: [
      { name: "title", type: "string", required: true },
      { name: "venue", type: "geoPoint", label: "Event Location" },
      { name: "description", type: "string" }
    ]
  }
}
```

### Map Features

**View Mode:**
- Clean, styled map display
- Non-interactive by default
- Shows precise location with marker

**Edit Mode:**
- Interactive map with dragging enabled
- Click to set new location
- Drag marker to adjust position
- Real-time coordinate updates

### Available Google Maps Options

The `googleMapsOptions` object accepts any standard Google Maps `MapOptions`. Common options include:

| Option | Type | Description |
|--------|------|-------------|
| `zoom` | Number | Initial zoom level (1-20) |
| `center` | Object | Initial center position `{lat: number, lng: number}` |
| `mapTypeId` | String | Map type: `'roadmap'`, `'satellite'`, `'hybrid'`, `'terrain'` |
| `mapTypeControl` | Boolean | Show/hide map type selector |
| `streetViewControl` | Boolean | Show/hide street view control |
| `fullscreenControl` | Boolean | Show/hide fullscreen button |
| `zoomControl` | Boolean | Show/hide zoom controls |
| `gestureHandling` | String | Gesture behavior: `'cooperative'`, `'greedy'`, `'none'`, `'auto'` |
| `styles` | Array | Custom map styling array |

For a complete list of options, see the [Google Maps JavaScript API documentation](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions).

## Firestore Access Patterns

FireEngine provides two methods for accessing Firestore data:

1. **Direct access** (useFirestoreAccessRules: true): Uses Firebase's built-in security rules
2. **API-mediated access** (useFirestoreAccessRules: false): Uses server API endpoints to bypass security rules

This allows developers to choose between:
- Client-side enforcement of permissions using Firestore rules
- Server-side enforcement with more flexibility for complex permission logic

## Development

```bash
# Install dependencies
yarn install

# Start development server
yarn watch

# Build for production
yarn build

# Run linting
yarn lint

# Run type checking
yarn type-check
```

## License

MIT