exports.getVotesFormatted = (votes) => {
  let output = "";

  votes.forEach((vote) => {
    if (votes.indexOf(vote) === votes.length - 1) {
      output += `${vote.email}`;
    } else {
      output += `${vote.email}, `;
    }
  });

  return output;
};
