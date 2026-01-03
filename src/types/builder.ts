export type BuilderBlock = {
  id: string;
  type: string;
  data: Record<string, any>;
};

export type BuilderPage = {
  id: string;
  title: string;
  slug?: string;
  blocks: BuilderBlock[];
};

export type SiteMetadata = {
  id: string;
  name?: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  version: number; // incremented on each save
};

export type BuilderState = {
  metadata: SiteMetadata;
  pages: BuilderPage[];
  activePageId?: string;
};

export type BuilderActions = {
  loadSite: (id: string) => Promise<BuilderState | null>;
  saveSite: (id: string, state: BuilderState) => Promise<void>;
  addBlock: (pageId: string, type: string) => void;
  removeBlock: (pageId: string, blockId: string) => void;
  reorderBlock: (
    pageId: string,
    blockId: string,
    direction: "up" | "down"
  ) => void;
  updateBlock: (
    pageId: string,
    blockId: string,
    data: Record<string, any>
  ) => void;
};
