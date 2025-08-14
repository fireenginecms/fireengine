
export interface FireEngineConfig {
  adminCredentials: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
  webappConfig?: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
  };
  ownerEmail: string;
  domain: string;
  signinMethods?: string[];
  schemaOverrides?: Record<string, any>;
  googleMapsApiKey?: string;
  ignoreCollections?: string[];
  useFirestoreAccessRules?: boolean;
}

declare function fireengine(config: FireEngineConfig): any;

export default fireengine;
