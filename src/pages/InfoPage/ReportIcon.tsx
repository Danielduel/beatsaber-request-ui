import React from "react";

const ReportIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-message-report"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
    <line x1="12" y1="8" x2="12" y2="11" />
    <line x1="12" y1="14" x2="12" y2="14.01" />
  </svg>
);

export { ReportIcon };
