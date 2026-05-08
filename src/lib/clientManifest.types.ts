export interface ClientManifestBrandDTO {
  displayName?: string | null;
  shortName?: string | null;
  companyName?: string | null;
  logoWebLightUrl?: string | null;
  logoWebDarkUrl?: string | null;
  logoMobileLightUrl?: string | null;
  logoMobileDarkUrl?: string | null;
}

export interface ClientManifestLegalPathsDTO {
  termsPath?: string | null;
  privacyPath?: string | null;
}

export interface ClientManifestContactDTO {
  supportEmail?: string | null;
  privacyEmail?: string | null;
}

export interface ClientManifestPublicUrlsDTO {
  signupUrl?: string | null;
  helpCenterUrl?: string | null;
  docsUrl?: string | null;
  statusPageUrl?: string | null;
}

export interface ClientManifestStoresDTO {
  iosAppId?: string | null;
  androidPackage?: string | null;
}

export interface ClientManifestResponseDTO {
  brand?: ClientManifestBrandDTO | null;
  marketingBaseUrl?: string | null;
  defaultLocale?: string | null;
  supportedLocales?: string[] | null;
  legalByLocale?: Record<string, ClientManifestLegalPathsDTO> | null;
  stores?: ClientManifestStoresDTO | null;
  contact?: ClientManifestContactDTO | null;
  publicUrls?: ClientManifestPublicUrlsDTO | null;
  social?: Record<string, string> | null;
}
