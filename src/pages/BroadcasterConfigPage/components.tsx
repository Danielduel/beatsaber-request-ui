import React from "react";
import styled from "styled-components";
import { LayoutRowBase } from "../../components/LayoutRow/LayoutRow";

export const FormContainer = styled.form`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: var(--background);
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  & > *:last-child {
    margin-left: 50px;
  }
`;

export const LinkLogo = styled.img`
  height: 1rem;
`;

export const SuccessRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  & > img {
    margin-right: 20px;
  }

  & > div {
    width: 300px;
  }
`;

export const QuestionRow = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  max-width: 700px;
  margin-bottom: 15px;
`;

export const ExplainationRow = styled.div`
  max-width: 700px;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export type TwitchConfigInputRowProps = {
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  default?: string;
  value: string | number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TwitchConfigInputRow = ({ name, type, value, setValue }: TwitchConfigInputRowProps) => {
  const handleChange = React.useCallback(
    (e: React.ChangeEvent) => {
      setValue(+(e.target as HTMLInputElement).value);
    },
    [setValue]
  );
  return (
    <LayoutRowBase>
      <span>{name}:&nbsp;</span>
      <input onChange={handleChange} placeholder={String(value)} type={type as string} name={name} />
    </LayoutRowBase>
  );
};
