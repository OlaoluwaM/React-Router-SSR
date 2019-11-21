import React from 'react';

export default function Grid(props) {
  const [repos, setRepos] = React.useState([]);

  React.useEffect(() => {
    if (__isBrowser__) {
      setRepos(window.initialData);
    } else {
      setRepos(props.staticContext.data);
    }
    return () => setRepos([]);
  }, []);

  React.useEffect(() => {
    fetchRepos(props.match.params.Id);
    return () => setRepos([]);
  }, [props.match.params.Id]);

  const fetchRepos = lang => {
    props.fetchInitialData(lang).then(repo => setRepos(repo));
  };

  if (!repos || repos.length === 0) {
    return (
      <div>
        <h2>LOADING</h2>
      </div>
    );
  } else {
    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {repos.map(({ name, owner, stargazers_count, html_url }) => (
          <li key={name} style={{ margin: 30 }}>
            <ul>
              <li>
                <a href={html_url}>{name}</a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}
