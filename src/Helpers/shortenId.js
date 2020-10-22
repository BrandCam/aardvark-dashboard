const IdShorten = (id) => {
  if (id.length <= 8) {
    return id;
  }
  let short = `${id.slice(0, 6)}...`;
  return short;
};

export default IdShorten;
