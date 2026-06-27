import { createContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // whatever we add in this value obj we can access in any component
  const value = {
    doctors,
    currencySymbol,
    email,
    setEmail,
    name,
    setName,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
