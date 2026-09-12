import React, { useState } from 'react';
import { PortfolioHeader } from '../PortfolioHeader';
import { AppMode, ProfileData, EducationExperienceItem, SkillCategory } from '../../types';
import { loadProfileData, saveProfileData, fileToDataUrl } from '../../utils/portfolioStorage';
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  Heart, 
  Upload, 
  Check, 
  Edit3, 
  Mail, 
  Phone, 
  Plus,
  Trash2,
  X,
  Briefcase,
  Scissors,
  Laptop,
  Layers,
  FileCheck,
  Camera,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

interface ProfilePageProps {
  onBackToMenu: () => void;
  onNavigateToCategory: (mode: AppMode) => void;
  onBackToLanding: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onBackToMenu,
  onNavigateToCategory,
  onBackToLanding,
}) => {
  const [profile, setProfile] = useState<ProfileData>(() => loadProfileData());
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProfileData>(profile);
  const [savedAlert, setSavedAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState('Profile Changes Saved to Storage');

  // Independent About Me Section States
  const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);
  const [aboutMeDraft, setAboutMeDraft] = useState(profile.aboutMe || '');
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);

  // Independent Design Philosophy State
  const [isEditingPhilosophy, setIsEditingPhilosophy] = useState(false);
  const [philosophyDraft, setPhilosophyDraft] = useState(profile.designPhilosophy || '');

  // Education & Experience Modal / Form State
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [editingEduId, setEditingEduId] = useState<string | null>(null);
  const [eduFormData, setEduFormData] = useState<Omit<EducationExperienceItem, 'id'>>({
    type: 'education',
    title: '',
    organization: '',
    duration: '',
    details: '',
  });

  // Skills Management State
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [skillFormData, setSkillFormData] = useState({
    categoryId: '',
    skillName: '',
  });
  const [editingSkillInfo, setEditingSkillInfo] = useState<{
    categoryId: string;
    index: number;
    name: string;
  } | null>(null);
  const [quickSkillInputs, setQuickSkillInputs] = useState<Record<string, string>>({});

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  // Design Philosophy handlers
  const handleStartEditPhilosophy = () => {
    setPhilosophyDraft(profile.designPhilosophy || '');
    setIsEditingPhilosophy(true);
  };

  const handleSavePhilosophy = () => {
    const updated = { ...profile, designPhilosophy: philosophyDraft };
    setProfile(updated);
    setEditData(updated);
    saveProfileData(updated);
    setIsEditingPhilosophy(false);
    triggerToast('Design Philosophy Saved');
  };

  const handleCancelPhilosophy = () => {
    setPhilosophyDraft(profile.designPhilosophy || '');
    setIsEditingPhilosophy(false);
  };

  // Reorder Education & Experience items
  const handleMoveEduItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= profile.educationAndExperience.length) return;
    const newList = [...profile.educationAndExperience];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIdx, 0, moved);

    const updatedProfile = { ...profile, educationAndExperience: newList };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    triggerToast('Entries Reordered');
  };

  // Reorder Skills inside Category
  const handleMoveSkill = (categoryId: string, skillIdx: number, direction: 'up' | 'down') => {
    const updatedCategories = profile.skillCategories.map(cat => {
      if (cat.id === categoryId) {
        const newSkills = [...cat.skills];
        const targetIdx = direction === 'up' ? skillIdx - 1 : skillIdx + 1;
        if (targetIdx < 0 || targetIdx >= newSkills.length) return cat;
        const [moved] = newSkills.splice(skillIdx, 1);
        newSkills.splice(targetIdx, 0, moved);
        return { ...cat, skills: newSkills };
      }
      return cat;
    });

    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
  };

  // Reorder Categories
  const handleMoveCategory = (catIdx: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? catIdx - 1 : catIdx + 1;
    if (targetIdx < 0 || targetIdx >= profile.skillCategories.length) return;
    const newCategories = [...profile.skillCategories];
    const [moved] = newCategories.splice(catIdx, 1);
    newCategories.splice(targetIdx, 0, moved);

    const updatedProfile = { ...profile, skillCategories: newCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
  };


  // Profile hero photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const dataUrl = await fileToDataUrl(file);
      const updated = { ...profile, profilePhoto: dataUrl };
      setProfile(updated);
      setEditData(updated);
      saveProfileData(updated);
      triggerToast('Profile Portrait Updated');
    }
  };

  // About Me section photo upload
  const handleAboutMePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const dataUrl = await fileToDataUrl(file);
      const updated = { ...profile, aboutMePhoto: dataUrl };
      setProfile(updated);
      setEditData(updated);
      saveProfileData(updated);
      triggerToast('About Me Photograph Updated');
    }
  };

  // About Me photo remove
  const handleRemoveAboutMePhoto = () => {
    const updated = { ...profile, aboutMePhoto: '' };
    setProfile(updated);
    setEditData(updated);
    saveProfileData(updated);
    triggerToast('About Me Photograph Removed');
  };

  // About Me photo drag & drop
  const handlePhotoDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const dataUrl = await fileToDataUrl(file);
      const updated = { ...profile, aboutMePhoto: dataUrl };
      setProfile(updated);
      setEditData(updated);
      saveProfileData(updated);
      triggerToast('About Me Photograph Updated');
    }
  };

  // Independent About Me text editing handlers
  const handleStartEditAboutMe = () => {
    setAboutMeDraft(profile.aboutMe || '');
    setIsEditingAboutMe(true);
  };

  const handleSaveAboutMeText = () => {
    const updated = { ...profile, aboutMe: aboutMeDraft };
    setProfile(updated);
    setEditData(updated);
    saveProfileData(updated);
    setIsEditingAboutMe(false);
    triggerToast('About Me Description Saved');
  };

  const handleCancelAboutMeText = () => {
    setAboutMeDraft(profile.aboutMe || '');
    setIsEditingAboutMe(false);
  };

  // Save all text changes in hero / about me / philosophy
  const handleSaveTextEdits = () => {
    const finalAboutMe = isEditingAboutMe ? aboutMeDraft : editData.aboutMe;
    const updated = { ...editData, aboutMe: finalAboutMe };
    setProfile(updated);
    saveProfileData(updated);
    setIsEditing(false);
    setIsEditingAboutMe(false);
    triggerToast('Profile Content Saved');
  };

  // ==================== EDUCATION & EXPERIENCE HANDLERS ====================
  const handleOpenAddEdu = () => {
    setEditingEduId(null);
    setEduFormData({
      type: 'education',
      title: '',
      organization: '',
      duration: '',
      details: '',
    });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (item: EducationExperienceItem) => {
    setEditingEduId(item.id);
    setEduFormData({
      type: item.type,
      title: item.title,
      organization: item.organization,
      duration: item.duration,
      details: item.details,
    });
    setIsEduModalOpen(true);
  };

  const handleSaveEduItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduFormData.title.trim() || !eduFormData.organization.trim()) {
      return;
    }

    let updatedList: EducationExperienceItem[];
    if (editingEduId) {
      updatedList = profile.educationAndExperience.map(item => 
        item.id === editingEduId ? { ...item, ...eduFormData } : item
      );
    } else {
      const newItem: EducationExperienceItem = {
        id: `edu-exp-${Date.now()}`,
        ...eduFormData,
      };
      updatedList = [...profile.educationAndExperience, newItem];
    }

    const updatedProfile = { ...profile, educationAndExperience: updatedList };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    setIsEduModalOpen(false);
    triggerToast(editingEduId ? 'Entry Updated' : 'New Entry Added');
  };

  const handleDeleteEduItem = (id: string) => {
    const updatedList = profile.educationAndExperience.filter(item => item.id !== id);
    const updatedProfile = { ...profile, educationAndExperience: updatedList };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    triggerToast('Entry Removed');
  };

  // ==================== SKILLS HANDLERS ====================
  const handleQuickAddSkill = (categoryId: string) => {
    const val = (quickSkillInputs[categoryId] || '').trim();
    if (!val) return;

    const updatedCategories = profile.skillCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: [...cat.skills, val],
        };
      }
      return cat;
    });

    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    setQuickSkillInputs({ ...quickSkillInputs, [categoryId]: '' });
    triggerToast(`Added skill to ${profile.skillCategories.find(c => c.id === categoryId)?.name || 'category'}`);
  };

  const handleDeleteSkill = (categoryId: string, skillIdx: number) => {
    const updatedCategories = profile.skillCategories.map(cat => {
      if (cat.id === categoryId) {
        const newSkills = [...cat.skills];
        newSkills.splice(skillIdx, 1);
        return { ...cat, skills: newSkills };
      }
      return cat;
    });

    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    triggerToast('Skill Deleted');
  };

  const handleSaveEditedSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkillInfo || !editingSkillInfo.name.trim()) return;

    const updatedCategories = profile.skillCategories.map(cat => {
      if (cat.id === editingSkillInfo.categoryId) {
        const newSkills = [...cat.skills];
        newSkills[editingSkillInfo.index] = editingSkillInfo.name.trim();
        return { ...cat, skills: newSkills };
      }
      return cat;
    });

    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    setEditingSkillInfo(null);
    triggerToast('Skill Updated');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim().toUpperCase(),
      skills: [],
    };

    const updatedCategories = [...profile.skillCategories, newCategory];
    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    setNewCategoryName('');
    setIsCategoryModalOpen(false);
    triggerToast('New Skill Category Created');
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = profile.skillCategories.filter(c => c.id !== categoryId);
    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    triggerToast('Skill Category Removed');
  };

  const handleAddSkillModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillFormData.skillName.trim() || !skillFormData.categoryId) return;

    const updatedCategories = profile.skillCategories.map(cat => {
      if (cat.id === skillFormData.categoryId) {
        return {
          ...cat,
          skills: [...cat.skills, skillFormData.skillName.trim()],
        };
      }
      return cat;
    });

    const updatedProfile = { ...profile, skillCategories: updatedCategories };
    setProfile(updatedProfile);
    setEditData(updatedProfile);
    saveProfileData(updatedProfile);
    setSkillFormData({ categoryId: '', skillName: '' });
    setIsSkillModalOpen(false);
    triggerToast('Skill Added');
  };

  const getCategoryIcon = (index: number) => {
    switch (index % 4) {
      case 0:
        return <Scissors className="w-4 h-4 text-pink-600" />;
      case 1:
        return <Laptop className="w-4 h-4 text-pink-600" />;
      case 2:
        return <Layers className="w-4 h-4 text-pink-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-pink-600" />;
    }
  };

  const getTypeBadgeStyle = (type: EducationExperienceItem['type']) => {
    switch (type) {
      case 'education':
        return 'bg-pink-100 text-pink-900 border-pink-300';
      case 'internship':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'experience':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-purple-100 text-purple-900 border-purple-300';
    }
  };

  const getTypeLabel = (type: EducationExperienceItem['type']) => {
    switch (type) {
      case 'education':
        return 'EDUCATION';
      case 'internship':
        return 'INTERNSHIP';
      case 'experience':
        return 'WORK EXPERIENCE';
      default:
        return 'EXPERIENCE';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-zinc-900 flex flex-col font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Editorial Header Navigation */}
      <PortfolioHeader
        currentCategory="profile"
        categoryTitle="PROFILE"
        categorySubtitle="PAGE 01 — ANUSKA PRATAP"
        onBackToMenu={onBackToMenu}
        onNavigateToCategory={onNavigateToCategory}
        onBackToLanding={onBackToLanding}
        actionButton={
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                handleSaveTextEdits();
              } else {
                setIsEditing(true);
              }
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xs ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            }`}
          >
            {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save Profile' : 'Edit Text'}</span>
          </button>
        }
      />

      {/* Main Profile Editorial Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Save Toast Notification */}
        {savedAlert && (
          <div className="fixed bottom-6 right-6 z-50 bg-pink-950 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs font-mono font-bold border border-pink-400 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Hero Dossier: Photo + Introduction + Contact */}
        <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          {/* Subtle Pink Corner Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Profile Photo Area (with Replace / Upload) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-xl bg-pink-50">
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Upload Overlay */}
                <label className="absolute inset-0 bg-pink-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center">
                  <Upload className="w-8 h-8 mb-2 text-pink-300" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider">
                    Replace Profile Photo
                  </span>
                  <span className="text-[10px] text-pink-200 mt-1 font-mono">
                    Target: /images/profile/
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {/* Permanent Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-pink-200 flex items-center justify-between text-[10px] font-mono text-pink-950">
                  <span className="font-bold uppercase tracking-wider">PORTRAIT</span>
                  <span className="text-pink-600 font-bold">/images/profile/</span>
                </div>
              </div>

              {/* Upload trigger button below photo */}
              <label className="mt-3 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer border border-pink-300 transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Introduction & Bio Details */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-pink-100 text-pink-900 text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-pink-300">
                  ANUSKA PRATAP
                </span>
                <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-pink-200">
                  SS 2026 ARCHIVE
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Designer Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full text-2xl font-black text-pink-950 p-2 rounded border border-pink-300 bg-pink-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Professional Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full text-sm font-bold text-pink-700 p-2 rounded border border-pink-300 bg-pink-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Short Introduction</label>
                    <textarea
                      rows={2}
                      value={editData.shortIntroduction}
                      onChange={(e) => setEditData({ ...editData, shortIntroduction: e.target.value })}
                      className="w-full text-xs text-zinc-800 p-2 rounded border border-pink-300 bg-pink-50/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Email Contact</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="w-full text-xs font-medium text-zinc-800 p-2 rounded border border-pink-300 bg-pink-50/50"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold text-pink-900 uppercase">Contact Number</label>
                      <input
                        type="text"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full text-xs font-medium text-zinc-800 p-2 rounded border border-pink-300 bg-pink-50/50 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black text-pink-950 uppercase tracking-tight font-sans">
                    {profile.name}
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-pink-700 font-mono tracking-wider uppercase mt-1">
                    {profile.title}
                  </p>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans mt-3 border-l-2 border-pink-400 pl-4 py-1 italic bg-pink-50/40 rounded-r-lg">
                    "{profile.shortIntroduction}"
                  </p>
                </div>
              )}

              {/* Contact Meta Strip: Exactly Email + Contact Number (Studio Location & Specialization completely removed) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-pink-50/70 border border-pink-200 shadow-2xs">
                  <Mail className="w-4 h-4 text-pink-600 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-mono font-bold text-pink-900 uppercase">Email Contact</p>
                    <p className="text-xs font-medium text-zinc-800 truncate">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-pink-50/70 border border-pink-200 shadow-2xs">
                  <Phone className="w-4 h-4 text-pink-600 shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-[9px] font-mono font-bold text-pink-900 uppercase">Contact</p>
                    <p className="text-xs font-bold text-zinc-900 font-mono tracking-wide">{profile.phone || '9668886970'}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== UPDATED ABOUT ME SECTION (2-COLUMN LAYOUT) ==================== */}
        <section id="about-me-section" className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 lg:p-10 shadow-md relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Independent Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-pink-100 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-pink-950 uppercase tracking-wide">ABOUT ME</h3>
                <p className="text-xs font-mono text-pink-700 uppercase tracking-widest">
                  BIOGRAPHY & DESIGN PRACTICE
                </p>
              </div>
            </div>

            {/* Independent Text Edit Controls */}
            <div className="flex items-center space-x-2">
              {isEditingAboutMe || isEditing ? (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCancelAboutMeText}
                    className="px-3.5 py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAboutMeText}
                    className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Description</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStartEditAboutMe}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Description</span>
                </button>
              )}
            </div>
          </div>

          {/* Two-Column Side-by-Side Grid (Desktop) / Vertical Stack (Mobile & Tablet) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE: Dedicated Image / Photo Placeholder (Upload / Change / Remove) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {profile.aboutMePhoto ? (
                /* Uploaded Photograph View (Preserves original proportions & resolution, no auto-cropping) */
                <div className="w-full flex flex-col items-center">
                  <div className="relative group w-full rounded-2xl overflow-hidden border-2 border-pink-300 shadow-md bg-pink-50/60 p-2 sm:p-3 flex items-center justify-center min-h-[320px] max-h-[560px]">
                    <img
                      src={profile.aboutMePhoto}
                      alt="About Me Photograph"
                      className="w-auto h-auto max-w-full max-h-[520px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                      style={{ objectFit: 'contain' }}
                    />

                    {/* Quick Hover Replace Overlay */}
                    <label className="absolute inset-0 bg-pink-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center rounded-2xl">
                      <Upload className="w-8 h-8 mb-2 text-pink-300" />
                      <span className="text-xs font-bold font-mono uppercase tracking-wider">
                        Change Photograph
                      </span>
                      <span className="text-[10px] text-pink-200 mt-1 font-mono">
                        Preserves original resolution & proportions
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutMePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Permanent Quality Badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-pink-200 flex items-center justify-between text-[10px] font-mono text-pink-950">
                      <span className="font-bold uppercase tracking-wider">PHOTOGRAPH</span>
                      <span className="text-pink-600 font-bold">ORIGINAL RATIO</span>
                    </div>
                  </div>

                  {/* Dedicated Action Controls: Change & Remove Buttons */}
                  <div className="w-full flex items-center justify-between gap-3 mt-3.5">
                    <label className="flex-1 flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer border border-pink-300 transition-all shadow-2xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAboutMePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={handleRemoveAboutMePhoto}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-xs font-mono font-bold tracking-wider uppercase border border-pink-200 hover:border-red-300 transition-all shadow-2xs"
                      title="Remove current photograph"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Placeholder State (Click or Drag & Drop to Upload) */
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingPhoto(true);
                  }}
                  onDragLeave={() => setIsDraggingPhoto(false)}
                  onDrop={handlePhotoDrop}
                  className={`w-full rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[360px] max-h-[520px] ${
                    isDraggingPhoto 
                      ? 'border-pink-500 bg-pink-100/70 scale-[1.01]' 
                      : 'border-pink-300 bg-pink-50/40 hover:bg-pink-100/40'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-600 mb-4 shadow-inner group-hover:scale-105 transition-transform">
                    <Camera className="w-8 h-8" />
                  </div>
                  
                  <span className="text-sm font-black font-sans text-pink-950 uppercase tracking-wide">
                    ADD YOUR PHOTOGRAPH
                  </span>
                  
                  <p className="text-xs text-zinc-600 font-sans mt-2 max-w-[260px] leading-relaxed">
                    Upload your portrait, studio photograph, or editorial visual here.
                  </p>

                  <span className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photograph</span>
                  </span>

                  <span className="text-[10px] font-mono text-pink-700 mt-3">
                    Preserves original resolution & aspect ratio • No cropping
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAboutMePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}

              <p className="text-[10px] font-mono text-pink-700 mt-2.5 text-center">
                Visual assets are preserved in local portfolio storage.
              </p>
            </div>

            {/* RIGHT SIDE: Large, Clearly Visible Editable Text Area */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
              
              {isEditingAboutMe || isEditing ? (
                /* Editable Mode: Roomy multi-paragraph textarea */
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-pink-950 uppercase tracking-wider flex items-center space-x-1.5">
                      <Edit3 className="w-3.5 h-3.5 text-pink-600" />
                      <span>EDIT ABOUT ME DESCRIPTION</span>
                    </label>

                    <div className="flex items-center space-x-3 text-[11px] font-mono text-pink-800">
                      <span>{(aboutMeDraft.trim().match(/\S+/g) || []).length} words</span>
                      <span>•</span>
                      <span>{aboutMeDraft.length} chars</span>
                    </div>
                  </div>

                  <textarea
                    rows={14}
                    value={aboutMeDraft}
                    onChange={(e) => {
                      setAboutMeDraft(e.target.value);
                      setEditData({ ...editData, aboutMe: e.target.value });
                    }}
                    placeholder="Write your comprehensive About Me description here...&#10;&#10;Detail your background, design approach, creative journey, textile heritage interests, craftsmanship, architectural tailoring, and professional aspirations across multiple paragraphs."
                    className="w-full flex-1 min-h-[380px] sm:min-h-[440px] text-sm sm:text-base leading-relaxed text-zinc-900 p-5 rounded-2xl border-2 border-pink-300 bg-pink-50/30 focus:bg-white focus:border-pink-500 focus:outline-none transition-all shadow-inner font-sans resize-y"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    <p className="text-[11px] font-mono text-pink-700">
                      Tip: Press <kbd className="px-1.5 py-0.5 bg-pink-100 rounded border border-pink-300 text-pink-950 font-bold">Enter</kbd> twice to create clean paragraph breaks.
                    </p>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={handleCancelAboutMeText}
                        className="px-3.5 py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveAboutMeText}
                        className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Description</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* View Mode: Editorial Multi-Paragraph Typography */
                <div 
                  onClick={handleStartEditAboutMe}
                  className="group flex-1 flex flex-col justify-between cursor-pointer rounded-2xl p-6 sm:p-7 bg-pink-50/40 hover:bg-pink-50/70 border border-pink-200/80 transition-all relative min-h-[380px] sm:min-h-[440px]"
                  title="Click to edit About Me description"
                >
                  <div className="space-y-4">
                    {profile.aboutMe ? (
                      profile.aboutMe.split(/\n+/).map((paragraph, pIdx) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;
                        return (
                          <p 
                            key={pIdx} 
                            className={`text-sm sm:text-base leading-relaxed font-sans ${
                              pIdx === 0 
                                ? 'text-zinc-900 font-medium' 
                                : 'text-zinc-700'
                            }`}
                          >
                            {trimmed}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-sm font-sans text-zinc-500 italic">
                        No description provided yet. Click here or "Edit Description" above to write your story.
                      </p>
                    )}
                  </div>

                  {/* Subtle Footer Information Strip */}
                  <div className="mt-8 pt-4 border-t border-pink-200/60 flex items-center justify-between text-[11px] font-mono text-pink-800">
                    <span className="flex items-center space-x-1 text-pink-700 group-hover:text-pink-950 transition-colors">
                      <Edit3 className="w-3 h-3" />
                      <span>Click to edit description</span>
                    </span>
                    <span>{(profile.aboutMe.trim().match(/\S+/g) || []).length} Words</span>
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-pink-100 flex items-center justify-between text-[10px] font-mono text-pink-800">
            <span>DOSSIER ITEM 01</span>
            <span>BIOGRAPHICAL STATEMENT & DESIGN PRACTICE</span>
          </div>
        </section>

        {/* ==================== DESIGN PHILOSOPHY SECTION ==================== */}
        <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 lg:p-10 shadow-md relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Independent Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-pink-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-pink-950 uppercase tracking-wide">DESIGN PHILOSOPHY</h3>
                <p className="text-xs font-mono text-pink-700 uppercase tracking-widest">Ethos & Creative Vision</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isEditingPhilosophy || isEditing ? (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleCancelPhilosophy}
                    className="px-3.5 py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePhilosophy}
                    className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Philosophy</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStartEditPhilosophy}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Philosophy</span>
                </button>
              )}
            </div>
          </div>

          {isEditingPhilosophy || isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-pink-950 uppercase tracking-wider flex items-center space-x-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-pink-600" />
                  <span>EDIT DESIGN PHILOSOPHY MANIFESTO</span>
                </label>
                <div className="flex items-center space-x-3 text-[11px] font-mono text-pink-800">
                  <span>{(philosophyDraft.trim().match(/\S+/g) || []).length} words</span>
                  <span>•</span>
                  <span>{philosophyDraft.length} chars</span>
                </div>
              </div>

              <textarea
                rows={8}
                value={philosophyDraft}
                onChange={(e) => {
                  setPhilosophyDraft(e.target.value);
                  setEditData({ ...editData, designPhilosophy: e.target.value });
                }}
                placeholder="Write your creative philosophy, design ethos, craft values, and artistic principles here...&#10;&#10;Add multiple paragraphs to detail your relationship with couture silhouettes, traditional craft, sustainable textiles, and responsible fashion."
                className="w-full min-h-[220px] text-sm sm:text-base leading-relaxed text-zinc-900 p-5 rounded-2xl border-2 border-pink-300 bg-pink-50/30 focus:bg-white focus:border-pink-500 focus:outline-none transition-all shadow-inner font-sans resize-y"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <p className="text-[11px] font-mono text-pink-700">
                  Tip: Press <kbd className="px-1.5 py-0.5 bg-pink-100 rounded border border-pink-300 text-pink-950 font-bold">Enter</kbd> twice to create new paragraphs.
                </p>

                <div className="flex items-center space-x-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleCancelPhilosophy}
                    className="px-3.5 py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePhilosophy}
                    className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Philosophy</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              onClick={handleStartEditPhilosophy}
              className="cursor-pointer group space-y-3 p-5 sm:p-6 rounded-2xl bg-pink-50/30 hover:bg-pink-50/60 border border-pink-200/80 transition-all"
              title="Click to edit Design Philosophy"
            >
              {profile.designPhilosophy ? (
                profile.designPhilosophy.split(/\n+/).map((para, idx) => {
                  const trimmed = para.trim();
                  if (!trimmed) return null;
                  return (
                    <p 
                      key={idx} 
                      className="text-sm sm:text-base text-zinc-800 leading-relaxed font-sans italic border-l-3 border-pink-400 pl-4 py-1"
                    >
                      "{trimmed}"
                    </p>
                  );
                })
              ) : (
                <p className="text-sm font-sans text-zinc-500 italic">
                  No design philosophy specified. Click to write your creative manifesto.
                </p>
              )}

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-pink-800">
                <span className="flex items-center space-x-1 text-pink-700 group-hover:text-pink-950 transition-colors">
                  <Edit3 className="w-3 h-3" />
                  <span>Click to edit manifesto</span>
                </span>
                <span>{(profile.designPhilosophy.trim().match(/\S+/g) || []).length} Words</span>
              </div>
            </div>
          )}

          <div className="mt-6 pt-3 border-t border-pink-100 flex items-center justify-between text-[10px] font-mono text-pink-800">
            <span>DOSSIER ITEM 02</span>
            <span>CREATIVE MANIFESTO</span>
          </div>
        </section>

        {/* ==================== EDUCATION AND EXPERIENCE SECTION ==================== */}
        <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-pink-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-pink-950 uppercase tracking-wide">EDUCATION AND EXPERIENCE</h3>
                <p className="text-xs font-mono text-pink-700 uppercase tracking-widest">Academic Pedigree, Internships & Industry Experience</p>
              </div>
            </div>

            {/* Add Entry Button */}
            <button
              type="button"
              onClick={handleOpenAddEdu}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </div>

          {/* Grid of Education & Experience Cards */}
          {profile.educationAndExperience && profile.educationAndExperience.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.educationAndExperience.map((item, eduIdx) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-pink-50/50 border border-pink-200 flex flex-col justify-between relative group hover:shadow-md transition-all"
                >
                  <div className="space-y-2.5">
                    
                    {/* Header line: Type badge + Duration + Action buttons & Reorder */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getTypeBadgeStyle(item.type)}`}>
                        {getTypeLabel(item.type)}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        {eduIdx > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveEduItem(eduIdx, 'up')}
                            title="Move earlier in list"
                            className="p-1 rounded-lg text-pink-700 hover:bg-pink-200 transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {eduIdx < profile.educationAndExperience.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveEduItem(eduIdx, 'down')}
                            title="Move later in list"
                            className="p-1 rounded-lg text-pink-700 hover:bg-pink-200 transition-colors"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleOpenEditEdu(item)}
                          title="Edit this entry"
                          className="p-1 rounded-lg text-pink-700 hover:bg-pink-200 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEduItem(item.id)}
                          title="Delete this entry"
                          className="p-1 rounded-lg text-pink-700 hover:bg-pink-200 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-pink-950 font-sans leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-pink-700 font-mono mt-1">
                        {item.organization}
                      </p>
                    </div>

                    <div className="inline-block text-[11px] font-mono font-medium text-pink-800 bg-pink-100/70 px-2 py-0.5 rounded-md">
                      {item.duration}
                    </div>

                    {item.details && (
                      <p className="text-xs text-zinc-600 leading-relaxed font-sans pt-1">
                        {item.details}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-pink-200/60 flex items-center justify-between text-[10px] font-mono text-pink-800">
                    <div className="flex items-center space-x-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-pink-600" />
                      <span>Verified Portfolio Dossier</span>
                    </div>
                    <span className="text-pink-600 font-bold">#{eduIdx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 rounded-2xl bg-pink-50/40 border border-dashed border-pink-300">
              <Briefcase className="w-8 h-8 mx-auto text-pink-400 mb-2" />
              <p className="text-sm font-bold text-pink-950">No entries yet</p>
              <p className="text-xs text-zinc-600 mt-1 font-mono">Click "+ Add Entry" above to add your education, internships, or work experience.</p>
            </div>
          )}
        </section>

        {/* ==================== SKILLS SECTION ==================== */}
        <section className="bg-white rounded-3xl border-2 border-pink-200 p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-pink-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-pink-950 uppercase tracking-wide">SKILLS</h3>
                <p className="text-xs font-mono text-pink-700 uppercase tracking-widest">Garment Construction • Digital Software • Textile Craft • Specifications</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSkillFormData({
                    categoryId: profile.skillCategories[0]?.id || '',
                    skillName: '',
                  });
                  setIsSkillModalOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setNewCategoryName('');
                  setIsCategoryModalOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300 text-xs font-mono font-bold uppercase tracking-wider transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Category</span>
              </button>
            </div>
          </div>

          {/* Grid of Skill Categories */}
          {profile.skillCategories && profile.skillCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {profile.skillCategories.map((cat, catIdx) => (
                <div 
                  key={cat.id} 
                  className="p-4 rounded-2xl bg-pink-50/50 border border-pink-200 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div>
                    {/* Category Header with Reorder & Delete Controls */}
                    <div className="flex items-center justify-between text-pink-900 mb-3 pb-2 border-b border-pink-200/60 font-mono text-xs font-bold uppercase">
                      <div className="flex items-center space-x-2 min-w-0">
                        {getCategoryIcon(catIdx)}
                        <span className="truncate max-w-[120px]">{cat.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-0.5 shrink-0">
                        {catIdx > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveCategory(catIdx, 'left')}
                            title="Move Category Left"
                            className="text-pink-500 hover:text-pink-900 p-0.5 rounded hover:bg-pink-100"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                        )}
                        {catIdx < profile.skillCategories.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveCategory(catIdx, 'right')}
                            title="Move Category Right"
                            className="text-pink-500 hover:text-pink-900 p-0.5 rounded hover:bg-pink-100"
                          >
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                        {profile.skillCategories.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            title="Delete Category"
                            className="text-pink-400 hover:text-red-700 p-0.5 rounded hover:bg-pink-100 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Skill List with Reorder Controls */}
                    {cat.skills.length > 0 ? (
                      <ul className="space-y-1.5">
                        {cat.skills.map((skill, skillIdx) => (
                          <li 
                            key={skillIdx} 
                            className="group flex items-center justify-between text-xs text-zinc-800 p-1.5 rounded-lg hover:bg-white/90 border border-transparent hover:border-pink-200/70 transition-all"
                          >
                            <div className="flex items-start space-x-2 min-w-0 pr-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                              <span className="break-words font-sans">{skill}</span>
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-0.5 shrink-0 transition-opacity">
                              {skillIdx > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveSkill(cat.id, skillIdx, 'up')}
                                  className="p-0.5 text-pink-700 hover:text-pink-950 rounded hover:bg-pink-100"
                                  title="Move Skill Up"
                                >
                                  <ChevronUp className="w-3 h-3" />
                                </button>
                              )}
                              {skillIdx < cat.skills.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveSkill(cat.id, skillIdx, 'down')}
                                  className="p-0.5 text-pink-700 hover:text-pink-950 rounded hover:bg-pink-100"
                                  title="Move Skill Down"
                                >
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setEditingSkillInfo({
                                  categoryId: cat.id,
                                  index: skillIdx,
                                  name: skill,
                                })}
                                className="p-0.5 text-pink-700 hover:text-pink-950 rounded hover:bg-pink-100"
                                title="Edit Skill"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSkill(cat.id, skillIdx)}
                                className="p-0.5 text-pink-700 hover:text-red-700 rounded hover:bg-pink-100"
                                title="Delete Skill"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[11px] font-mono text-pink-700 italic py-2">No skills in this category yet.</p>
                    )}
                  </div>

                  {/* Inline Quick-Add Input at bottom of category */}
                  <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-center space-x-1.5">
                    <input
                      type="text"
                      placeholder="+ Add skill..."
                      value={quickSkillInputs[cat.id] || ''}
                      onChange={(e) => setQuickSkillInputs({ ...quickSkillInputs, [cat.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleQuickAddSkill(cat.id);
                        }
                      }}
                      className="flex-1 min-w-0 text-xs px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white focus:outline-pink-500 text-zinc-800 placeholder:text-zinc-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuickAddSkill(cat.id)}
                      className="px-2 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 rounded-2xl bg-pink-50/50 border border-dashed border-pink-300">
              <Sparkles className="w-6 h-6 mx-auto text-pink-400 mb-2" />
              <p className="text-xs font-bold text-pink-950 font-mono">No skill categories available</p>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="mt-2 text-xs font-bold text-pink-700 underline font-mono"
              >
                Create a Category
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer Strip */}
      <footer className="mt-12 py-6 border-t-2 border-pink-200 bg-white text-center text-xs font-mono text-pink-900">
        <p className="font-bold tracking-widest uppercase">ANUSKA PRATAP • PROFILE DOSSIER</p>
        <p className="text-[10px] text-pink-700 mt-1">ALL IMAGES PRESERVED IN /images/profile/ ARCHIVE</p>
      </footer>

      {/* ==================== MODAL: ADD / EDIT EDUCATION & EXPERIENCE ==================== */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-pink-950 uppercase tracking-wide">
                  {editingEduId ? 'Edit Entry' : 'Add Education / Experience'}
                </h3>
                <p className="text-xs font-mono text-pink-700">Enter degree, internship, or role details</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEduModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:bg-pink-100 text-pink-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEduItem} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Entry Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['education', 'experience', 'internship', 'other'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEduFormData({ ...eduFormData, type: t })}
                      className={`px-2 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all border ${
                        eduFormData.type === t
                          ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                          : 'bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  {eduFormData.type === 'education' ? 'Degree / Course Name *' : 'Role / Designation *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={eduFormData.type === 'education' ? 'e.g. Bachelor of Design (B.Des)' : 'e.g. Couture Design Intern'}
                  value={eduFormData.title}
                  onChange={(e) => setEduFormData({ ...eduFormData, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  {eduFormData.type === 'education' ? 'College / University *' : 'Company / Brand Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={eduFormData.type === 'education' ? 'e.g. National Institute of Fashion Technology' : 'e.g. Heritage Craft Studio'}
                  value={eduFormData.organization}
                  onChange={(e) => setEduFormData({ ...eduFormData, organization: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Year / Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2022 – 2026 or Summer 2025"
                  value={eduFormData.duration}
                  onChange={(e) => setEduFormData({ ...eduFormData, duration: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Additional Relevant Experience / Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your specializations, responsibilities, projects, or honors..."
                  value={eduFormData.details}
                  onChange={(e) => setEduFormData({ ...eduFormData, details: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  {editingEduId ? 'Save Changes' : 'Add Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD SKILL ==================== */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-base font-black text-pink-950 uppercase tracking-wide">Add New Skill</h3>
                <p className="text-xs font-mono text-pink-700">Add to your skill matrix</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:bg-pink-100 text-pink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkillModalSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Target Category *
                </label>
                <select
                  required
                  value={skillFormData.categoryId}
                  onChange={(e) => setSkillFormData({ ...skillFormData, categoryId: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 font-mono focus:outline-pink-500"
                >
                  <option value="" disabled>Select a category</option>
                  {profile.skillCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pattern Grading, CLO 3D, Silk Draping"
                  value={skillFormData.skillName}
                  onChange={(e) => setSkillFormData({ ...skillFormData, skillName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500"
                />
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD CATEGORY ==================== */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-base font-black text-pink-950 uppercase tracking-wide">Create Skill Category</h3>
                <p className="text-xs font-mono text-pink-700">Add a new group for your skills</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:bg-pink-100 text-pink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TEXTILE EMBROIDERY, 3D MODELING"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 uppercase font-mono focus:outline-pink-500"
                />
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: EDIT SPECIFIC SKILL ==================== */}
      {editingSkillInfo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-2 border-pink-300 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div>
                <h3 className="text-base font-black text-pink-950 uppercase tracking-wide">Edit Skill</h3>
                <p className="text-xs font-mono text-pink-700">Modify skill wording</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingSkillInfo(null)}
                className="p-1 rounded-lg text-zinc-500 hover:bg-pink-100 text-pink-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedSkill} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono font-bold text-pink-900 uppercase mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingSkillInfo.name}
                  onChange={(e) => setEditingSkillInfo({ ...editingSkillInfo, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-pink-300 bg-pink-50/40 text-zinc-900 focus:outline-pink-500"
                />
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingSkillInfo(null)}
                  className="px-4 py-2 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-900 text-xs font-mono font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Update Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
