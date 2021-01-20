import gql from "graphql-tag";
import { MAX_APPLICATIONS_TO_LOAD } from "./constants";

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const isValidUrl = (value) => {
  try {
    return Boolean(new URL(value));
  } catch (e) {
    return false;
  }
};
