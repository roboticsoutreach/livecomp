import { NavigateFunction } from "react-router-dom";

export const followHandler = (navigate: NavigateFunction) => (e: CustomEvent<object>) => {
    e.preventDefault();
    navigate((e.detail as { href: string }).href);
};

