import React from "react";
import styled from "styled-components";
import { ButtonLink, Button, ButtonAsItem, ButtonAsItemProps } from "./Button";

const GroupButtonContainer = styled.div`
  display: flex;
  & > ${Button}, & > ${ButtonLink} {
    /* First button */
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 1px solid var(--border);
    }
    /* Last button */
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /* Middle button */
    &:not(:first-child):not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-right: 1px solid var(--border);
    }
  }
`;

type GroupButtonProps = {
  group: ButtonAsItemProps[];
};

const GroupButton = ({ group }: GroupButtonProps): JSX.Element => {
  return <GroupButtonContainer>{group.map(ButtonAsItem)}</GroupButtonContainer>;
};

export { GroupButton };
