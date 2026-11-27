import { projects } from './projects.js';

const base = import.meta.env.BASE_URL;

export const featuredProjects = ['MBS', 'Shimadzu', 'MBDK', 'MyMeds'].map((name) =>
  projects.find((project) => project.name === name)
);
export const featuredProject = featuredProjects[0];
export const profileUrl = 'https://www.linkedin.com/in/aziqtazry-faidzli-ba925127a';

export function viewHref(view) {
  return view === 'home' ? base : `${base}?view=${view}`;
}

export function projectHref(project) {
  return `${base}?fm=${project.frequency}#projects`;
}
