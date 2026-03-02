import { useState } from "react";
import type { Project } from "../../config/projects.config";

interface ProjectFormProps {
  initial?: Project;
  onSubmit: (project: Omit<Project, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [techTags, setTechTags] = useState(initial?.techTags.join(", ") ?? "");
  const [projectUrl, setProjectUrl] = useState(initial?.projectUrl ?? "");
  const [githubUrl, setGithubUrl] = useState(initial?.githubUrl ?? "");
  const [visible, setVisible] = useState(initial?.visible ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id,
      title,
      description,
      techTags: techTags.split(",").map((t) => t.trim()).filter(Boolean),
      projectUrl,
      githubUrl: githubUrl || undefined,
      visible,
    });
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-neural-black border border-white/10 rounded-lg font-mono text-sm text-white focus:border-cyber-cyan/50 focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-dim-gray mb-1">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
      </div>
      <div>
        <label className="block text-xs font-mono text-dim-gray mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${inputClass} h-24 resize-none`} required />
      </div>
      <div>
        <label className="block text-xs font-mono text-dim-gray mb-1">Tech Tags (comma separated)</label>
        <input type="text" value={techTags} onChange={(e) => setTechTags(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-mono text-dim-gray mb-1">Project URL</label>
        <input type="text" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-mono text-dim-gray mb-1">GitHub URL (optional)</label>
        <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className={inputClass} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
          className="accent-cyber-cyan"
          id="visible"
        />
        <label htmlFor="visible" className="text-xs font-mono text-dim-gray">Visible on public site</label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 py-2.5 font-mono text-sm rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 transition-all">
          {initial ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 font-mono text-sm rounded-lg text-dim-gray border border-white/10 hover:border-white/20 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
