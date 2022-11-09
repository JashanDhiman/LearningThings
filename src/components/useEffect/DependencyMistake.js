import React, { useEffect, useState } from "react";

const DependencyMistake = () => {
  const [name, setName] = useState();
  const [state, setState] = useState({
    name: "",
    selected: false,
  });

  useEffect(() => {
    console.log("state has changed");
  }, [state.name, state.selected]);

  const handleAdd = () => {
    setState((prev) => ({ ...prev, name }));
  };
  const handleSelect = () => {
    setState((prev) => ({ ...prev, selected: true }));
  };

  return (
    <>
      <input
        type="text"
        name="name"
        // value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        add name
      </button>
      <button type="button" onClick={handleSelect}>
        Select
      </button>
      <br></br>
      <h1>{`{ name: ${state.name}, selected: ${state.selected} }`}</h1>
    </>
  );
};

export default DependencyMistake;
