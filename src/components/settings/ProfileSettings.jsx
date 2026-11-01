import { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Flame,
  Edit3,
  Check,
  X,
  Camera,
  Image as ImageIcon,
} from "lucide-react";

export default function ProfileSettings({ profile, onSaveProfile, showToast }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [useFallbackAvatar, setUseFallbackAvatar] = useState(false);

  // Compute initials from full name
  const getInitials = (name) => {
    if (!name) return "EV";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStartEdit = () => {
    setFormData({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      showToast && showToast("Name cannot be empty.");
      return;
    }
    if (!formData.email.trim()) {
      showToast && showToast("Email cannot be empty.");
      return;
    }

    onSaveProfile && onSaveProfile(formData);
    setIsEditing(false);
    showToast && showToast("Profile settings updated successfully!");
  };

  return (
    <div className="space-y-6 w-full min-w-0 max-w-full">
      {/* Header Card with Avatar & Polymath Badge */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 min-w-0">
            {/* Avatar with Initials Fallback */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/40 bg-surface-container-highest shadow-xl flex items-center justify-center">
                {!useFallbackAvatar && profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover"
                    onError={() => setUseFallbackAvatar(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-primary-container via-secondary-container to-tertiary-container flex items-center justify-center text-2xl font-extrabold text-white tracking-wider">
                    {getInitials(profile.fullName)}
                  </div>
                )}
              </div>

              {/* Avatar Toggle Button */}
              <button
                onClick={() => setUseFallbackAvatar((prev) => !prev)}
                type="button"
                className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-surface-container-highest text-on-surface hover:text-primary transition-all border border-outline-variant/60 shadow-lg cursor-pointer"
                title={useFallbackAvatar ? "Switch to Photo Avatar" : "Switch to Initials Fallback"}
                aria-label="Toggle avatar mode"
              >
                {useFallbackAvatar ? <ImageIcon size={13} /> : <Camera size={13} />}
              </button>
            </div>

            {/* Profile Summary Info */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface break-words">
                  {profile.fullName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-xs font-semibold border border-secondary/30 flex items-center gap-1 shrink-0">
                  <Sparkles size={12} className="text-tertiary" />
                  <span>Pro Polymath</span>
                </span>
              </div>
              <p className="text-sm text-primary font-medium break-words">{profile.role}</p>
              <div className="flex items-center gap-4 text-xs text-outline pt-1 flex-wrap">
                <span className="flex items-center gap-1 min-w-0">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </span>
                <span className="flex items-center gap-1 min-w-0">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-semibold shrink-0">
                  <Flame size={12} />
                  <span>{profile.streakDays} Days Streak</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Edit Action Button */}
          {!isEditing ? (
            <button
              onClick={handleStartEdit}
              className="px-4 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface text-sm font-semibold flex items-center gap-2 transition-all border border-surface-container-highest/80 cursor-pointer self-start md:self-auto shrink-0"
              type="button"
            >
              <Edit3 size={15} className="text-primary" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0 flex-wrap">
              <button
                onClick={handleCancel}
                className="px-3.5 py-2 rounded-xl bg-surface-container text-outline hover:text-on-surface text-sm font-medium transition-all cursor-pointer"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-sm font-semibold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
                type="button"
              >
                <Check size={15} />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Form Details */}
      <div className="rounded-2xl bg-surface-container-high/60 border border-surface-container-highest/40 p-4 sm:p-6 shadow-md backdrop-blur-md min-w-0 max-w-full">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest/40 mb-6 flex-wrap gap-2">
          <div className="min-w-0">
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              Personal Information
            </h4>
            <p className="text-xs text-outline mt-0.5">
              Manage your display details, title, and public polymath bio.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-container text-outline shrink-0">
            {isEditing ? "Editing Mode" : "Read-Only"}
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-5 w-full min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full min-w-0">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  id="fullName"
                  type="text"
                  disabled={!isEditing}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                    isEditing
                      ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                  }`}
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                    isEditing
                      ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                  }`}
                  placeholder="name@domain.com"
                  required
                />
              </div>
            </div>

            {/* Learning Role / Designation */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="role"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Learning Role or Polymath Designation
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  <Briefcase size={16} />
                </span>
                <input
                  id="role"
                  type="text"
                  disabled={!isEditing}
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                    isEditing
                      ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                  }`}
                  placeholder="e.g. Senior Systems Architect · Distributed Computing"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label
                htmlFor="location"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Location
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  <MapPin size={16} />
                </span>
                <input
                  id="location"
                  type="text"
                  disabled={!isEditing}
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                    isEditing
                      ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                  }`}
                  placeholder="e.g. San Francisco, CA"
                />
              </div>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label
                htmlFor="timezone"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Preferred Timezone
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                  <Clock size={16} />
                </span>
                <input
                  id="timezone"
                  type="text"
                  disabled={!isEditing}
                  value={formData.timezone}
                  onChange={(e) => handleInputChange("timezone", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                    isEditing
                      ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                  }`}
                  placeholder="e.g. Pacific Time (PT)"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5 md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-xs font-semibold uppercase tracking-wider text-outline"
              >
                Short Bio & Research Focus
              </label>
              <textarea
                id="bio"
                rows={3}
                disabled={!isEditing}
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all resize-none leading-relaxed ${
                  isEditing
                    ? "bg-surface-container border border-surface-container-highest text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    : "bg-surface-container/50 border border-transparent text-on-surface-variant cursor-not-allowed opacity-90"
                }`}
                placeholder="Write a brief description of your technical focus..."
              />
            </div>
          </div>

          {/* Action Row when in edit mode */}
          {isEditing && (
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-highest/40 flex-wrap">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-highest text-outline hover:text-on-surface text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <X size={15} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all cursor-pointer shrink-0"
              >
                <Check size={16} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
