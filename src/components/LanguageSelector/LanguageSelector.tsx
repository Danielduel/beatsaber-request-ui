import { i18n } from "i18next";
import React, { useRef } from "react";
import { getI18n, Translation } from "react-i18next";
import styled from "styled-components";
import { useFormField } from "../../common/hooks/useFormField";
import { languages } from "../../i18n/init-i18n";

const LanguageSelectContainer = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const StyledSelect = styled.select`
  font-size: 1.2rem;
  padding: 5px;
  background: var(--background-input);
  border: 1px solid var(--background-primary);
`;

const StyledOption = styled.option`
  font-size: 1.2rem;
`;

const StyledSelectLabel = styled.span`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-right: 10px;
`;

const StyledOptionItem = (i18nInstance: i18n, selectedLanguage: string) => {
  const _StyledOptionItem = (language: string) => (
    <StyledOption disabled={language === selectedLanguage} value={language}>
      {i18nInstance.getFixedT(language)("languageName")}
    </StyledOption>
  );
  return _StyledOptionItem;
};

const LanguageSelector = (): JSX.Element => {
  const i18nInstance = getI18n();
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const { value: language, sinkEvent: selectOnChange } = useFormField<HTMLSelectElement, string>(
    i18nInstance.language,
    "onchange",
    (newLanguage) => {
      i18nInstance.changeLanguage(newLanguage);
      selectRef.current?.blur();
    }
  );

  return (
    <LanguageSelectContainer>
      <StyledSelectLabel>
        <Translation>{(t) => t("Select language")}</Translation>:
      </StyledSelectLabel>
      <StyledSelect ref={selectRef} value={language} onChange={selectOnChange}>
        {languages.map(StyledOptionItem(i18nInstance, language))}
        {/* <StyledOption value="en">EN</StyledOption>
        <StyledOption value="pl">PL</StyledOption> */}
      </StyledSelect>
    </LanguageSelectContainer>
  );
};

export default LanguageSelector;
