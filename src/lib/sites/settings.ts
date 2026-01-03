import { kv } from "@/lib/kv";

const SETTINGS_PREFIX = "buildwithai:site:settings:";

export type SiteSettings = {
  general: {
    name: string;
    description: string;
  };
  branding: {
    logo: string;
    primaryColor: string;
    favicon: string;
  };
  seo: {
    title: string;
    description: string;
    image: string;
  };
  domain: {
    customDomain: string;
    status: "unconfigured" | "pending" | "connected";
  };
};

export async function getSiteSettings(siteId: string): Promise<SiteSettings> {
  const key = `${SETTINGS_PREFIX}${siteId}`;
  const existing = (await kv.get(key)) as SiteSettings | null;

  return (
    existing ?? {
      general: { name: "", description: "" },
      branding: { logo: "", primaryColor: "", favicon: "" },
      seo: { title: "", description: "", image: "" },
      domain: { customDomain: "", status: "unconfigured" }
    }
  );
}

export async function saveSiteSettings(
  siteId: string,
  settings: SiteSettings
) {
  const key = `${SETTINGS_PREFIX}${siteId}`;
  await kv.set(key, settings);
}
