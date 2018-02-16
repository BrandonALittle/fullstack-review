import React from 'react';

const RepoList = (props) => (
  <div>
    <ul>
      {props.repos.map(repo =>
        <li>
          <h4><a href={repo.repoLink}>{repo.repo}</a></h4>
          <span>By:  {repo.user}  </span>
        </li>
        )}
    </ul>
    There are {props.repos.length} repos.
  </div>
)

export default RepoList;