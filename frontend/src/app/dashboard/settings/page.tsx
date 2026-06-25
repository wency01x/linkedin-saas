"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "@/hooks/useUser";
import { useLinkedIn } from "@/hooks/useAnalytics";
import { DashboardCard } from "@/components/dashboard-card";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  const { user, updateUser, isUpdating, deleteUser, isDeleting } = useUser();
  const { status: linkedinStatus, disconnect, isDisconnecting } = useLinkedIn();

  const [editedData, setEditedData] = useState<{
    full_name?: string;
    industry?: string;
    target_audience?: string;
    tone?: string;
  }>({});

  const formData = {
    full_name: editedData.full_name ?? user?.full_name ?? "",
    industry: editedData.industry ?? user?.industry ?? "",
    target_audience: editedData.target_audience ?? user?.target_audience ?? "",
    tone: editedData.tone ?? user?.tone ?? "Professional & Authoritative",
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser(formData);
    } catch {
      // Error toast is already handled in useUser hook
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Once you delete your account, there is no going back. Please be certain."
      )
    ) {
      deleteUser();
    }
  };

  const handleConnectLinkedIn = () => {
    window.location.href = "http://localhost:8000/api/v1/linkedin/connect";
  };

  return (
    <div className="max-w-[90rem] mx-auto animate-in fade-in zoom-in duration-300 space-y-8">
      <DashboardCard className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <CardHeader className="p-6 border-b border-border bg-muted/30">
          <CardTitle className="text-lg font-semibold font-oswald tracking-tight mb-1 text-foreground">
            Voice Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Update how the AI generates your content.
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
              Full Name / Creator Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setEditedData({ ...editedData, full_name: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-input bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) =>
                  setEditedData({ ...editedData, industry: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-input bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.target_audience}
                onChange={(e) =>
                  setEditedData({ ...editedData, target_audience: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-input bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setEditedData({ ...editedData, tone: e.target.value })}
              className="w-full p-3 rounded-lg border border-input bg-muted/50 text-foreground text-sm focus:ring-2 focus:ring-ring outline-none appearance-none"
            >
              <option>Professional & Authoritative</option>
              <option>Casual & Conversational</option>
              <option>Bold & Direct</option>
              <option>Educational & Helpful</option>
            </select>
          </div>
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveProfile}
              disabled={isUpdating}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </CardContent>
      </DashboardCard>

      <DashboardCard className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        <CardHeader className="p-6 border-b border-border bg-muted/30">
          <CardTitle className="text-lg font-semibold font-oswald tracking-tight mb-1 text-foreground">
            Integrations
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage connected social accounts.
          </p>
        </CardHeader>
        <CardContent className="p-6">
          {linkedinStatus?.is_connected ? (
            <div className="flex items-center justify-between p-4 border border-border bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:linkedin" className="text-3xl text-[#0A66C2]" />
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {linkedinStatus.account?.full_name || "Connected Account"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Connected to LinkedIn
                  </div>
                </div>
              </div>
              <button
                onClick={() => disconnect()}
                disabled={isDisconnecting}
                className="text-xs font-semibold text-muted-foreground border border-border bg-background px-4 py-2 rounded-lg hover:bg-muted/50 disabled:opacity-50"
              >
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-border bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:linkedin" className="text-3xl text-muted-foreground" />
                <div>
                  <div className="font-semibold text-sm text-foreground">LinkedIn</div>
                  <div className="text-xs text-muted-foreground">Not Connected</div>
                </div>
              </div>
              <button
                onClick={handleConnectLinkedIn}
                className="text-xs font-semibold text-white bg-[#0A66C2] px-4 py-2 rounded-lg hover:bg-[#084e96]"
              >
                Connect
              </button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-foreground">Auto-Publishing</div>
              <div className="text-xs text-muted-foreground">
                Automatically post scheduled content
              </div>
            </div>
            {/* Custom Toggle */}
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-background border-4 border-input appearance-none cursor-pointer z-10 top-0 left-0 m-0 focus:outline-none focus:ring-0 checked:right-0 checked:border-primary"
                defaultChecked={true}
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-muted cursor-pointer after:content-[''] after:absolute after:top-0 after:left-0 after:bg-background after:border-4 after:border-input after:h-6 after:w-6 after:rounded-full after:transition-transform after:duration-300 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-primary"
              ></label>
            </div>
          </div>
        </CardContent>
      </DashboardCard>

      <DashboardCard className="bg-red-50/50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden shadow-sm">
        <CardHeader className="p-6 border-b border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30">
          <CardTitle className="text-lg font-semibold font-oswald tracking-tight text-red-600 dark:text-red-500 mb-1">
            Danger Zone
          </CardTitle>
          <p className="text-sm text-red-500/80">Permanent account actions.</p>
        </CardHeader>
        <CardContent className="p-6 flex justify-between items-center">
          <div className="text-sm text-foreground">
            Once you delete your account, there is no going back. Please be
            certain.
          </div>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-red-700 shrink-0 disabled:opacity-50 transition-colors"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </CardContent>
      </DashboardCard>
    </div>
  );
}
