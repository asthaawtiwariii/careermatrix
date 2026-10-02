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
  CheckCircle2
} from 'lucide-react';
import { interestOptions, degreeOptions, yearOptions } from '../data/mockData';

export default function ProfilePage({ 
  profile, 
  setProfile, 
  onAnalyze, 
  careerOptions = ["Full Stack Developer", "AI/ML Engineer", "Data Analyst", "Python Developer", "Cloud/DevOps Engineer"]
}) {
  const [newProgLang, setNewProgLang] = useState('');
  const [newTechSkill, setNewTechSkill] = useState('');
  const [newTool, setNewTool] = useState('');

  const programmingLanguages = profile?.skills?.programmingLanguages || [];
  const technicalSkills = profile?.skills?.technicalSkills || [];
  const tools = profile?.skills?.tools || [];
  const interests = profile?.interests || [];
  const careerInterests = profile?.careerInterests || [];
  const projects = profile?.projects || [];
  const education = profile?.education || { degree: '', branch: '', year: '3rd Year (Pre-Final)' };
  const experience = profile?.experience || { role: '', organization: '', duration: '' };

  // Handlers for adding items
  const addTag = (category, value, setter) => {
    if (!value.trim()) return;
    const trimmed = value.trim();
    const currentList = profile?.skills?.[category] || [];
    if (!currentList.includes(trimmed)) {
      setProfile({
        ...profile,
        skills: {
          ...(profile.skills || {}),
          [category]: [...currentList, trimmed]
        }
      });
    }
    setter('');
  };

  const removeTag = (category, itemToRemove) => {
    const currentList = profile?.skills?.[category] || [];
    setProfile({
      ...profile,
      skills: {
        ...(profile.skills || {}),
        [category]: currentList.filter(item => item !== itemToRemove)
      }
    });
  };

  const toggleInterest = (interest) => {
    const exists = interests.includes(interest);
    setProfile({
      ...profile,
      interests: exists 
        ? interests.filter(i => i !== interest)
        : [...interests, interest]
    });
  };

  const toggleCareerInterest = (career) => {
    const exists = careerInterests.includes(career);
    setProfile({
      ...profile,
      careerInterests: exists 
        ? careerInterests.filter(c => c !== career)
        : [...careerInterests, career]
    });
  };

  const updateEducation = (field, val) => {
    setProfile({
      ...profile,
      education: { ...education, [field]: val }
    });
  };

  const updateExperience = (field, val) => {
    setProfile({
      ...profile,
      experience: { ...experience, [field]: val }
    });
  };

  const updateProject = (index, field, val) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: val };
    setProfile({ ...profile, projects: updated });
  };

  const addProject = () => {
    setProfile({
      ...profile,
      projects: [
        ...projects,
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
    const updated = projects.filter((_, i) => i !== index);
    setProfile({ ...profile, projects: updated });
  };

  return (
    <div className="profile-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Step Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>
          Step 1 of 4 — Profile Entry
        </div>
        <h1 style={{ fontSize: '1.875rem' }}>Student Profile & Background</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Enter your education, current technical skills, and career interests to generate your custom AI matrix.
        </p>
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
              <label className="form-label">Degree Program</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science / B.S. Data Science"
                value={education.degree}
                onChange={(e) => updateEducation('degree', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Branch / Specialization (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Artificial Intelligence & Systems"
                value={education.branch}
                onChange={(e) => updateEducation('branch', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Academic Year</label>
              <select
                className="form-select"
                value={education.year}
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
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Type language and press Enter</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {programmingLanguages.map(lang => (
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
                placeholder="Add language (e.g. Python, JavaScript, C++, Java)..."
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
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>SQL, REST APIs, OOP, Data Structures, etc.</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {technicalSkills.map(skill => (
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
                placeholder="Add concept (e.g. SQL, REST APIs, PyTorch, React)..."
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
              <span>Tools & Platforms</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Git, Docker, VS Code, Postman, Linux, etc.</span>
            </label>
            <div className="tags-cloud" style={{ marginBottom: '0.6rem' }}>
              {tools.map(tool => (
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
                placeholder="Add tool (e.g. Git, Docker, Postman, AWS)..."
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
              <h2 style={{ fontSize: '1.2rem' }}>3. Academic & Personal Projects (Optional)</h2>
            </div>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={addProject}
            >
              <Plus size={14} /> Add Project
            </button>
          </div>

          {projects.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
              No projects added yet. Click "+ Add Project" if you have portfolio or coursework projects.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
                    title="Remove project"
                  >
                    <X size={16} />
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Project Title</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Student Portal"
                        value={proj.name}
                        onChange={(e) => updateProject(idx, 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Technologies Used</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Python, SQLite, HTML"
                        value={proj.technologies}
                        onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Brief Description</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Built a student portal to share study guides and course notes."
                      value={proj.description}
                      onChange={(e) => updateProject(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Interests Section */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <Heart size={20} color="var(--primary-purple)" />
            <h2 style={{ fontSize: '1.2rem' }}>4. Technical Interests & Target Pathways</h2>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Areas of Interest</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Select topics you enjoy exploring</span>
            </label>
            <div className="tags-cloud">
              {interestOptions.map(interest => {
                const selected = interests.includes(interest);
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
              <span>Target Career Roles (Optional)</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Roles you are curious about</span>
            </label>
            <div className="tags-cloud">
              {careerOptions.map(career => {
                const selected = careerInterests.includes(career);
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
            style={{ minWidth: '260px', padding: '0.85rem 2rem', fontSize: '1rem' }}
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
