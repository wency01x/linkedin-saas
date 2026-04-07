"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "@/hooks/useUser";
import { useLinkedIn } from "@/hooks/useAnalytics";

export default function SettingsPage() {
  const { user, updateUser, isUpdating, deleteUser, isDeleting } = useUser();
  const { status: linkedinStatus, disconnect, isDisconnecting } = useLinkedIn();

  const [editedData, setEditedData] = useState<{
    industry?: string;
    target_audience?: string;
    tone?: string;
  }>({});

  const formData = {
    industry: editedData.industry ?? user?.industry ?? "",
    target_audience: editedData.target_audience ?? user?.target_audience ?? "",
    tone: editedData.tone ?? user?.tone ?? "Professional & Authoritative",
  };

  const handleSaveProfile = async () => {
    await updateUser(formData);
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
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold font-oswald tracking-tight mb-1">
            Voice Profile
          </h3>
          <p className="text-sm text-neutral-500">
            Update how the AI generates your content.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) =>
                  setEditedData({ ...editedData, industry: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.target_audience}
                onChange={(e) =>
                  setEditedData({ ...editedData, target_audience: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-neutral-900 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
              Tone
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setEditedData({ ...editedData, tone: e.target.value })}
              className="w-full p-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:ring-2 focus:ring-neutral-900 outline-none appearance-none"
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
              className="bg-neutral-900 text-white px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="text-lg font-semibold font-oswald tracking-tight mb-1">
            Integrations
          </h3>
          <p className="text-sm text-neutral-500">
            Manage connected social accounts.
          </p>
        </div>
        <div className="p-6">
          {linkedinStatus?.is_connected ? (
            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:linkedin" className="text-3xl text-[#0A66C2]" />
                <div>
                  <div className="font-semibold text-sm">
                    {linkedinStatus.account?.full_name || "Connected Account"}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Connected to LinkedIn
                  </div>
                </div>
              </div>
              <button
                onClick={() => disconnect()}
                disabled={isDisconnecting}
                className="text-xs font-semibold text-neutral-500 border border-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
              >
                {isDisconnecting ? "Disconnecting..." : "Disconnect"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div className="flex items-center gap-4">
                <Icon icon="mdi:linkedin" className="text-3xl text-neutral-400" />
                <div>
                  <div className="font-semibold text-sm">LinkedIn</div>
                  <div className="text-xs text-neutral-500">Not Connected</div>
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
              <div className="font-semibold text-sm">Auto-Publishing</div>
              <div className="text-xs text-neutral-500">
                Automatically post scheduled content
              </div>
            </div>
            {/* Custom Toggle */}
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 top-0 left-0 m-0 focus:outline-none focus:ring-0 checked:right-0 checked:border-neutral-900"
                defaultChecked={true}
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-neutral-200 cursor-pointer after:content-[''] after:absolute after:top-0 after:left-0 after:bg-white after:border-4 after:border-neutral-200 after:h-6 after:w-6 after:rounded-full after:transition-transform after:duration-300 peer-checked:bg-neutral-900 peer-checked:after:translate-x-full peer-checked:after:border-neutral-900"
              ></label>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-red-200 rounded-xl overflow-hidden bg-red-50/50">
        <div className="p-6 border-b border-red-200">
          <h3 className="text-lg font-semibold font-oswald tracking-tight text-red-600 mb-1">
            Danger Zone
          </h3>
          <p className="text-sm text-red-500">Permanent account actions.</p>
        </div>
        <div className="p-6 flex justify-between items-center">
          <div className="text-sm text-neutral-700">
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
        </div>
      </div>
    </div>
  );
}
