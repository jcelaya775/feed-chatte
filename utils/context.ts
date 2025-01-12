import { createContext } from "react";

type TouchContext = {
  screenTouched: boolean;
  setScreenTouched: (touched: boolean) => void;
};

export const TouchContext = createContext<TouchContext>({
  screenTouched: false,
  setScreenTouched: () => {},
});
