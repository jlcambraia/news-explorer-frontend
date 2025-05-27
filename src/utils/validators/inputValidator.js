import { useState } from "react";

export function useInputValidator(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(evt) {
    const input = evt.target;
    const cleanValue = input.value.trim();

    setValue(cleanValue);
    setIsValid(input.validity.valid);
    setErrorMessage(input.validationMessage);
  }

  return {
    value,
    isValid,
    errorMessage,
    handleChange,
  };
}
