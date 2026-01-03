export type PublishMetadata = {
  siteId: string;
  lastPublishedAt: number | null;
  lastPublishedVersion: number | null;
  lastPublishedUrl: string | null;
};

export type PublishResult = {
  ok: boolean;
  url?: string;
  error?: string;
};

export type PublishHistoryEntry = {
  version: number;
  timestamp: number;
  url: string | null;
  rollback?: boolean;
};

export type PublishHistory = PublishHistoryEntry[];

// Full snapshot of builder state for rollback
export type VersionSnapshot = {
  version: number;
  timestamp: number;
  state: any; // stored as raw JSON; validated on load
  changelog?: string | null;
};

