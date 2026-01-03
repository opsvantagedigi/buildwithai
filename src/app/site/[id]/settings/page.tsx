"use client";

import { useEffect, useState } from "react";

export default function SiteSettingsPage({
  params
}: {
  params: { id: string };
}) {
  const siteId = params.id;

  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/sites/${siteId}/settings`);
      const data = await res.json();
      setSettings(data.settings);
      setLoading(false);
    }
    load();
  }, [siteId]);

  async function save() {
    setSaving(true);
    await fetch(`/api/sites/${siteId}/settings`, {
      method: "POST",
      body: JSON.stringify(settings)
    });
    setSaving(false);
  }

  if (loading) {
    return <div className="p-6 text-slate-400">Loading settings…</div>;
  }

  return (
    <div className="p-6 text-slate-200 space-y-6">
      <h1 className="text-xl font-semibold">Site Settings</h1>

      {/* GENERAL */}
      <div className="border border-slate-700 rounded p-4 space-y-2">
        <h2 className="font-semibold">General</h2>

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Site name"
          value={settings.general.name}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, name: e.target.value }
            })
          }
        />

        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Description"
          value={settings.general.description}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, description: e.target.value }
            })
          }
        />
      </div>

      {/* BRANDING */}
      <div className="border border-slate-700 rounded p-4 space-y-2">
        <h2 className="font-semibold">Branding</h2>

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Logo URL"
          value={settings.branding.logo}
          onChange={(e) =>
            setSettings({
              ...settings,
              branding: { ...settings.branding, logo: e.target.value }
            })
          }
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Primary color"
          value={settings.branding.primaryColor}
          onChange={(e) =>
            setSettings({
              ...settings,
              branding: {
                ...settings.branding,
                primaryColor: e.target.value
              }
            })
          }
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Favicon URL"
          value={settings.branding.favicon}
          onChange={(e) =>
            setSettings({
              ...settings,
              branding: { ...settings.branding, favicon: e.target.value }
            })
          }
        />
      </div>

      {/* SEO */}
      <div className="border border-slate-700 rounded p-4 space-y-2">
        <h2 className="font-semibold">SEO Defaults</h2>

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Default title"
          value={settings.seo.title}
          onChange={(e) =>
            setSettings({
              ...settings,
              seo: { ...settings.seo, title: e.target.value }
            })
          }
        />

        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Default description"
          value={settings.seo.description}
          onChange={(e) =>
            setSettings({
              ...settings,
              seo: { ...settings.seo, description: e.target.value }
            })
          }
        />

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Social image URL"
          value={settings.seo.image}
          onChange={(e) =>
            setSettings({
              ...settings,
              seo: { ...settings.seo, image: e.target.value }
            })
          }
        />
      </div>

      {/* DOMAIN */}
      <div className="border border-slate-700 rounded p-4 space-y-2">
        <h2 className="font-semibold">Domain</h2>

        <input
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          placeholder="Custom domain"
          value={settings.domain.customDomain}
          onChange={(e) =>
            setSettings({
              ...settings,
              domain: {
                ...settings.domain,
                customDomain: e.target.value
              }
            })
          }
        />

        <div className="text-xs text-slate-400">
          Status: {settings.domain.status}
        </div>

        <div className="text-xs text-slate-500">
          Add a CNAME record pointing to your deployment URL.
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="bg-blue-600 px-4 py-2 rounded text-sm"
      >
        {saving ? "Saving…" : "Save Settings"}
      </button>
    </div>
  );
}
