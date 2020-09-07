import { ExplorerAPI } from '@bloxberg-org/cert-verifier-js';

export function getDisableAutoVerify (state): boolean {
  return state.disableAutoVerify;
}

export function getDisableVerify (state): boolean {
  return state.disableVerify;
}

export function getAllowDownload (state): boolean {
  return state.allowDownload;
}

export function getAllowSocialShare (state): boolean {
  return state.allowSocialShare;
}

export function getShowMetadata (state): boolean {
  return state.showMetadata;
}

export function getDisplayMode (state): string {
  return state.displayMode;
}

export function getTheme (state): string {
  return state.theme;
}

export function getLocale (state): string {
  return state.locale;
}

export function getExplorerAPIs (state): ExplorerAPI[] {
  return state.explorerAPIs;
}

export function getClickableUrls (state): boolean {
  return state.clickableUrls;
}
