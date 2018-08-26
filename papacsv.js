function handleFiles(files) {
  console.log("input files changed");
  console.log(files);
  Papa.parse(files[0], {
    complete: results => {
      console.log("Finished:", results.data);
      window.data = results.data;
      console.table(window.data);
    }
  });
}
