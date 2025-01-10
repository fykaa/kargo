import { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';

export default function versionSwitcherPlugin(): Plugin {
  return {
    name: 'docusaurus-plugin-version-switcher',
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.versionSwitcherConfig = {
                currentVersion: '${getCurrentVersion()}',
                githubApiUrl: 'https://api.github.com/repos/akuity/kargo/branches'
              };
            `,
          },
        ],
      };
    },
  };
}

function getCurrentVersion(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const hostname = window.location.hostname;
  if (hostname === 'docs.kargo.io') return 'current';
  
  const match = hostname.match(/^release-(\d+)-(\d+)\.docs\.kargo\.io$/);
  if (match) {
    return `${match[1]}.${match[2]}`;
  }
  
  return 'unknown';
}
