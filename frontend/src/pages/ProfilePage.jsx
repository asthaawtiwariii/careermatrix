import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Heart, 
  Plus, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { interestOptions, yearOptions } from '../data/mockData';

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
    <div className="profile-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Profile & Skills
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
          Provide your academic background, technical skills, and career preferences for AI analysis.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }}>
        {/* Education Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Education
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Degree</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. B.Tech Computer Science"
                value={education.degree}
                onChange={(e) => updateEducation('degree', e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Specialization (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Artificial Intelligence"
                value={education.branch}
                onChange={(e) => updateEducation('branch', e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Academic Year</label>
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

        {/* Skills Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Skills & Technologies
          </h2>

          {/* Programming Languages */}
          <div className="form-group">
            <label className="form-label">Programming Languages</label>
            <div className="tags-container" style={{ marginBottom: '0.5rem' }}>
              {programmingLanguages.map(lang => (
                <span key={lang} className="tag-chip active" onClick={() => removeTag('programmingLanguages', lang)}>
                  {lang}
                  <X size={12} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Python, JavaScript, C++"
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
                Add
              </button>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="form-group">
            <label className="form-label">Technical Concepts & Frameworks</label>
            <div className="tags-container" style={{ marginBottom: '0.5rem' }}>
              {technicalSkills.map(skill => (
                <span key={skill} className="tag-chip active" onClick={() => removeTag('technicalSkills', skill)}>
                  {skill}
                  <X size={12} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. React, SQL, REST APIs, PyTorch"
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
                Add
              </button>
            </div>
          </div>

          {/* Tools */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Tools & Platforms</label>
            <div className="tags-container" style={{ marginBottom: '0.5rem' }}>
              {tools.map(tool => (
                <span key={tool} className="tag-chip active" onClick={() => removeTag('tools', tool)}>
                  {tool}
                  <X size={12} />
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Git, Docker, Postman, AWS"
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
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Projects (Optional)
            </h2>
            <button 
              type="button" 
              className="btn btn-ghost btn-sm"
              onClick={addProject}
              style={{ color: 'var(--primary)' }}
            >
              <Plus size={14} /> Add Project
            </button>
          </div>

          {projects.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              No projects added yet. Click "+ Add Project" to include personal or academic coursework.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} style={{ background: 'var(--bg-subtle)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', position: 'relative' }}>
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Remove project"
                  >
                    <X size={14} />
                  </button>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Project Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Task Manager App"
                        value={proj.name}
                        onChange={(e) => updateProject(idx, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Tech Stack</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. React, Node.js, SQLite"
                        value={proj.technologies}
                        onChange={(e) => updateProject(idx, 'technologies', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Description</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Brief summary of features or architecture"
                      value={proj.description}
                      onChange={(e) => updateProject(idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interests & Target Roles */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Interests & Preferences
          </h2>

          <div className="form-group">
            <label className="form-label">Areas of Interest</label>
            <div className="tags-container">
              {interestOptions.map(interest => {
                const selected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    className={`tag-chip ${selected ? 'active' : ''}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target Career Roles (Optional)</label>
            <div className="tags-container">
              {careerOptions.map(career => {
                const selected = careerInterests.includes(career);
                return (
                  <button
                    key={career}
                    type="button"
                    className={`tag-chip ${selected ? 'active' : ''}`}
                    onClick={() => toggleCareerInterest(career)}
                  >
                    {career}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg"
            id="analyze-profile-btn"
          >
            <span>Analyze My Profile</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
