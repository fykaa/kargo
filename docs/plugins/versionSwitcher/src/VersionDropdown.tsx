import React, { useEffect, useState } from 'react';

interface Branch {
  name: string;
}

interface Version {
  version: string;
  url: string;
}

declare global {
  interface Window {
    versionSwitcherConfig: {
      currentVersion: string;
      githubApiUrl: string;
    };
  }
}

const CACHE_KEY = 'kargo-docs-versions';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const VersionDropdown: React.FC = () => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVersions();
  }, []);

  const fetchVersions = async () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { versions, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setVersions(versions);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(window.versionSwitcherConfig.githubApiUrl);
      const branches: Branch[] = await response.json();
      
      const releaseBranches = branches
        .map(branch => branch.name)
        .filter(name => /^release-\d+-\d+$/.test(name))
        .map(name => {
          const [major, minor] = name.replace('release-', '').split('-');
          return {
            version: `${major}.${minor}`,
            url: `https://release-${major}-${minor}.docs.kargo.io${window.location.pathname}`
          };
        });

      // Add current version
      releaseBranches.unshift({
        version: 'current',
        url: `https://docs.kargo.io${window.location.pathname}`
      });

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        versions: releaseBranches,
        timestamp: Date.now()
      }));

      setVersions(releaseBranches);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching versions:', error);
      setLoading(false);
    }
  };

  const handleVersionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVersion = versions.find(v => v.version === event.target.value);
    if (selectedVersion) {
      window.location.href = selectedVersion.url;
    }
  };

  if (loading) return null;

  return (
    <div className="navbar__item">
      <select
        className="navbar__link"
        value={window.versionSwitcherConfig.currentVersion}
        onChange={handleVersionChange}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          fontSize: '0.9rem'
        }}
      >
        {versions.map(version => (
          <option key={version.version} value={version.version}>
            {version.version === 'current' ? 'Current' : `v${version.version}.x`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VersionDropdown;