# FireEngine

Self-hosted Firebase CMS with automatic schema detection and admin UI generation.

## Installation

```bash
npm install fireenginecms
```

## Quick Start

```javascript
const express = require('express');
const fireengine = require('fireenginecms');

const app = express();

app.use('/admin', fireengine({
  adminCredentials: {
    projectId: process.env.FIREENGINE_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREENGINE_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREENGINE_FIREBASE_CLIENT_EMAIL,
  },
  ownerEmail: process.env.FIREENGINE_OWNER_EMAIL,
  domain: process.env.FIREENGINE_DOMAIN,
}));

app.listen(3000, () => {
  console.log('FireEngine running at http://localhost:3000/admin');
});
```

## Documentation

Full documentation available at [https://fireengine.dev/docs](https://fireengine.dev/docs)

## License

This is proprietary software. You must purchase a license to use FireEngine in production.
Visit [https://fireengine.dev](https://fireengine.dev) for licensing information.

## Support

- Documentation: [https://fireengine.dev/docs](https://fireengine.dev/docs)
- Email: support@fireengine.dev
