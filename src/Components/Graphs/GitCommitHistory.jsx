import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import axios from "axios";

const GitCommitHistory = forwardRef((props, ref) => {
  const { username, repoName } = props;
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommits();
  }, [username, repoName]);

  useImperativeHandle(ref, () => ({
    handleRefresh() {
      fetchCommits();
    }
  }));

  const fetchCommits = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${username}/${repoName}/commits`
      );
      setCommits(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching commit history:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Commit History</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ol reversed>
          {commits.map((commit) => (
            <li key={commit.sha}>{`) ${commit.commit.message}`}</li>
          ))}
        </ol>
      )}
    </div>
  );
});

export default GitCommitHistory;
