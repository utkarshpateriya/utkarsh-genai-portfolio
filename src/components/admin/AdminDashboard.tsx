import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { isSupabaseEnabled } from "../../lib/supabase";
import { projects as configProjects, type Project } from "../../config/projects.config";
import ProjectForm from "./ProjectForm";
import { Eye, EyeOff, Pencil, Trash2, Plus, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(configProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleCreate = (data: Omit<Project, "id"> & { id?: string }) => {
    const newProject: Project = {
      ...data,
      id: data.id || Date.now().toString(),
    };
    setProjects((prev) => [...prev, newProject]);
    setShowForm(false);
  };

  const handleUpdate = (data: Omit<Project, "id"> & { id?: string }) => {
    if (!data.id) return;
    setProjects((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data, id: p.id } : p)));
    setEditingProject(null);
    setShowForm(false);
  };

  const handleToggleVisibility = (id: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)));
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-neural-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl text-cyber-cyan">ADMIN HUD</h1>
            <p className="text-dim-gray text-xs font-mono">
              {isSupabaseEnabled ? "Connected to Supabase" : "Local config mode"}
            </p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-mono text-dim-gray border border-white/10 rounded-lg hover:text-red-400 hover:border-red-400/30 transition-colors">
            <LogOut size={14} />
            Logout
          </button>
        </div>

        {!isSupabaseEnabled && (
          <div className="glass rounded-xl p-4 mb-6 border-l-2 border-neon-violet">
            <p className="text-xs font-mono text-dim-gray">
              Supabase is not connected. Changes made here are session-only.
              To persist projects, edit <code className="text-neon-violet">src/config/projects.config.ts</code> directly
              or connect Supabase.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-sm text-white">Projects ({projects.length})</h2>
          <button
            onClick={() => { setEditingProject(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 transition-all"
          >
            <Plus size={14} />
            New Project
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="font-display text-sm text-white mb-4">
              {editingProject ? "Edit Project" : "New Project"}
            </h3>
            <ProjectForm
              initial={editingProject ?? undefined}
              onSubmit={editingProject ? handleUpdate : handleCreate}
              onCancel={() => { setShowForm(false); setEditingProject(null); }}
            />
          </div>
        )}

        {/* Project list */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm text-white truncate">{project.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {project.techTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-neon-violet/70">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleVisibility(project.id)}
                  className={`p-2 rounded-lg transition-colors ${project.visible ? "text-cyber-cyan" : "text-dim-gray"} hover:bg-white/5`}
                  title={project.visible ? "Hide" : "Show"}
                >
                  {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => { setEditingProject(project); setShowForm(true); }}
                  className="p-2 rounded-lg text-dim-gray hover:text-white hover:bg-white/5 transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg text-dim-gray hover:text-red-400 hover:bg-white/5 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <a href="/" className="block mt-8 text-center text-xs font-mono text-dim-gray/50 hover:text-dim-gray transition-colors">
          ← Return to site
        </a>
      </div>
    </div>
  );
}
