const core = require("@actions/core");
const { GitHub, context } = require("@actions/github");

(async () => {
  try {
    const githubToken = process.env["GITHUB_TOKEN"];
    if (!githubToken) {
      core.setFailed("GITHUB_TOKEN does not exist.");
      return;
    }

    const github = new GitHub(githubToken);
    const { owner, repo } = context.repo;
    const labels = core
      .getInput("labels")
      .split(",")
      .filter((x) => x !== "");
    const issueNumber = context.payload.number;

    console.log(core.getInput("labels"))
    console.log(core.getInput("labels").split(","))

    core.info(`Add labels: ${labels} to ${owner}/${repo}#${issueNumber}`);

    await github.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
