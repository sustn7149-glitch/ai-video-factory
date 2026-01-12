export type AgentType = 'planner' | 'producer' | 'analyst';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  core_prompt: string;
}

export interface Persona {
  id: string;
  agent_id: string;
  channel_id: string;
  variables_json: Record<string, any>;
  title: string; // Display name for the persona
  status: 'active' | 'inactive';
}

export interface Channel {
  id: string;
  name: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  platform_settings: Record<string, any>;
}

export interface Project {
  id: string;
  title: string;
  status: 'planning' | 'scripting' | 'producing' | 'completed' | 'published';
  script_data?: any;
  video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  agent_id: string;
  diff_data: string; // Representation of the proposed changes
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}
