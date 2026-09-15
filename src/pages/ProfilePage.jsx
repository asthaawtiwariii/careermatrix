import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code2, 
  Briefcase, 
  FolderGit2, 
  Heart, 
  Sparkles, 
  Plus, 
  X, 
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { interestOptions, degreeOptions, yearOptions } from '../data/mockData';

export default function ProfilePage({ 
  profile, 
  setProfile, 
  onAnalyze, 
  onLoadSample,
  careerOptions = ["Full Stack Developer", "AI/ML Engineer", "Data Analyst", "Python Developer", "Cloud/DevOps Engineer"]
}) {
  const [newProgLang, setNewProgLang] = useState('');
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newTool, setNewTool] = useState('');

  // Handlers for adding items
  const addTag = (category, value, setter) => {
    if (!value.trim()) return;
    const trimmed = value.trim();
    if (!profile.skills[category].includes(trimmed)) {
      setProfile({
        ...profile,
        skills: {
          ...profile.skills,
          [category]: [...profile.skills[category], trimmed]
        }
      });
    }
    setter('');
  };

  const removeTag = (category, itemToRemove) => {
    setProfile({
      ...profile,
      skills: {
        ...profile.skills,
        [category]: profile.skills[category].filter(item => item !== itemToRemove)
      }
    });
  };

  const toggleInterest = (interest) => {
    const exists = profile.interests.includes(interest);
    setProfile({
      ...profile,
      interests: exists 
        ? profile.interests.filter(i => i !== interest)
        : [...profile.interests, interest]
    });
  };

  const toggleCareerInterest = (career) => {
    const exists = profile.careerInterests.includes(career);
    setProfile({
      ...profile,
      careerInterests: exists
        ? profile.careerInterests.filter(c => c !== career)
        : [...profile.careerInterests, career]
    });
  };

  const updateEducation = (field, val) => {
    setProfile({
      ...profile,
      education: { ...profile.education, [field]: val }
    });
  };

  const updateExperience = (field, val) => {
    setProfile({
      ...profile,
      experience: { ...profile.experience, [field]: val }
    });
  };

  const updateProject = (index, field, val) => {
    const updated = [...profile.projects];
    updated[index] = { ...updated[index], [field]: val };
    setProfile({ ...profile, projects: updated });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [
        ...profile.projects,
        {
          id: `p-${Date.now()}`,
          name: '',
          description: '',
          technologies: ''
        }
      ]
    });
  };

  const removeProject = (index) => {
    if (profile.projects.length <= 1) return;
    const updated = profile.projects.filter((_, i) => i !== index);
    setProfile({ ...profile, projects: updated });
  };

  return (
    <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Step Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>
            Step 1 of 4 — Profile
          </div>
          <h1 style={{ fontSize: '1.875rem' }}>Student Profile & Background</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Enter your current education, skills, projects, and interests to evaluate career alignment.
          </p>
        </div>

        <button 
          type="button" 
          className="btn btn-secondary btn-sm"
          onClick={onLoadSample}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          title="Autofill a 3rd-year CS student profile"
        >
          <UserCheck size={16} color="var(--primary-indigo)" />
          <span>Load Sample Student Profile</span>
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }}>
        {/* 1. Education Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <GraduationCap size={20} color="var(--primary-indigo)" />
            <h2 style={{ fontSize: '1.2rem' }}>1. Education Details</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech / B.S. Computer Science"
                value={profile.education.degree}
                onChange={(e) => updateEducation('degree', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Branch / Specialization</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Computer Science & Engineering"
                value={profile.education.branch}
                onChange={(e) => updateEducation('branch', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Academic Year</label>
              <select
                className="form-select"
                value={profile.education.year}
                onChange={(e) => updateEducation('year', e.target.value)}
              >
                {yearOptions.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Skills Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <Code2 size={20} color="var(--primary-indigo)" />
            <h2 style={{ fontSize: '1.2rem' }}>2. Technical Competencies & Skills</h2>
          </div>

          {/* Programming Languages */}
          <div className="form-group">
            <label className="form-label">
              <span>Programming Languages</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Press Enter to add</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {profile.skills.programmingLanguages.map(lang => (
                <span key={lang} className="tag-chip tag-chip-removable" onClick={() => removeTag('programmingLanguages', lang)}>
                  {lang}
                  <X size={13} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add language (e.g. Python, JavaScript, Java)..."
                value={newProgLang}
                onChange={(e) => setNewProgLang(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('programmingLanguages', newProgLang, setNewProgLang);
                  }
                }}
              />
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addTag('programmingLanguages', newProgLang, setNewProgLang)}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">
              <span>Technical Skills / Concepts</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Data Structures, APIs, OOP, etc.</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {profile.skills.technicalSkills.map(skill => (
                <span key={skill} className="tag-chip tag-chip-removable" onClick={() => removeTag('technicalSkills', skill)}>
                  {skill}
                  <X size={13} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add skill (e.g. REST APIs, SQL, Data Structures)..."
                value={newTechSkill}
                onChange={(e) => setNewTechSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('technicalSkills', newTechSkill, setNewTechSkill);
                  }
                }}
              />
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addTag('technicalSkills', newTechSkill, setNewTechSkill)}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">
              <span>Tools & Technologies</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Git, VS Code, MySQL, Postman, etc.</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {profile.skills.tools.map(tool => (
                <span key={tool} className="tag-chip tag-chip-removable" onClick={() => removeTag('tools', tool)}>
                  {tool}
                  <X size={13} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Add tool (e.g. Git, Docker, Postman)..."
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag('tools', newTool, setNewTool);
                  }
                }}
              />
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addTag('tools', newTool, setNewTool)}
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* 3. Projects Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <FolderGit2 size={20} color="var(--primary-indigo)" />
              <h2 style={{ fontSize: '1.2rem' }}>3. Academic & Personal Projects</h2>
            </div>
            <button 
              type="button" 
              className="btn btn-subtle btn-sm"
              onClick={addProject}
            >
              <Plus size={15} /> Add Another Project
            </button>
          </div>

          {profile.projects.map((proj, idx) => (
            <div key={proj.id || idx} style={{ background: 'var(--bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: idx < profile.projects.length - 1 ? '1.25rem' : 0, border: '1px solid var(--border-light)', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-slate">Project #{idx + 1}</span>
                {profile.projects.length > 1 && (
                  <button
                    type="button"
                    style={{ background: 'transparent', color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    onClick={() => removeProject(idx)}
                  >
                    <X size={14} /> Remove
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Campus Portal"
                    value={proj.name}
                    onChange={(e) => updateProject(idx, 'name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Technologies Used</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. React, Python, SQLite"
                    value={proj.technologies}
                    onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Project Description</label>
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '65px' }}
                  placeholder="What problem did you solve and what did you build?"
                  value={proj.description}
                  onChange={(e) => updateProject(idx, 'description', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* 4. Experience Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <Briefcase size={20} color="var(--primary-indigo)" />
            <h2 style={{ fontSize: '1.2rem' }}>4. Experience / Internships</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Role / Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Frontend Development Intern"
                value={profile.experience.role}
                onChange={(e) => updateExperience('role', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Organization / Company</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. EduTech Labs or Campus Tech Club"
                value={profile.experience.organization}
                onChange={(e) => updateExperience('organization', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Duration</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 3 Months, 6 Months"
                value={profile.experience.duration}
                onChange={(e) => updateExperience('duration', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 5. Interests & Career Interests Section */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <Heart size={20} color="var(--primary-purple)" />
            <h2 style={{ fontSize: '1.2rem' }}>5. Technical Interests & Target Pathways</h2>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Areas of Interest</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Select all topics you enjoy</span>
            </label>
            <div className="tags-cloud">
              {interestOptions.map(interest => {
                const selected = profile.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    className={`tag-chip ${selected ? 'selected' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                    {selected && <CheckCircle2 size={13} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label className="form-label">
              <span>Career Pathways of Interest</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Allow multiple selections</span>
            </label>
            <div className="tags-cloud">
              {careerOptions.map(career => {
                const selected = profile.careerInterests.includes(career);
                return (
                  <button
                    key={career}
                    type="button"
                    className={`tag-chip ${selected ? 'selected' : ''}`}
                    onClick={() => toggleCareerInterest(career)}
                  >
                    {career}
                    {selected && <CheckCircle2 size={13} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            id="analyze-profile-btn"
            style={{ minWidth: '260px' }}
          >
            <Sparkles size={18} />
            <span>Analyze My Profile</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
