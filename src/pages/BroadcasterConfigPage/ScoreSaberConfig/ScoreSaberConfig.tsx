import React, { ChangeEvent } from "react";
import { ButtonAsItem, ButtonLink } from "../../../components/Buttons/Button";
import { GroupButton } from "../../../components/Buttons/GroupButton";
import { ScoreSaberBar } from "../../../components/ScoreSaberBar/ScoreSaberBar";
import { ExplainationRow, FormRow, LinkLogo, QuestionRow } from "../components";
import scoreSaberLogo from "./ss-logo.svg";

export const ScoreSaberConfig = () => {

  // const scoreSaberLinkOnChange = React.useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const link = e.target.value;
  //     const splitLink = link.split("/");
  //     const id = splitLink.find((part) => Number(part));
  //     if (!id) {
  //       e.target.value = "";
  //     } else {
  //       setScoreSaberId(id);
  //     }
  //   },
  //   [setScoreSaberId]
  // );
  
  fetch("https://scoresaber.com/api/players?includeScoreStats=false&search=Danielduel")

  return (
    <div>
      Scoresaber
    </div>
  )


  // return (
  //   <FormRow>
  //     <QuestionRow>Connect your ScoreSaber profile (optional)</QuestionRow>
  //     <ExplainationRow>
  //       You can connect your ScoreSaber profile to display your stats in extensions footer.
  //       <br />
  //       Find yourself on ScoreSaber and paste link to your profile, for example mine is
  //       <br />
  //       <input disabled value="https://scoresaber.com/u/76561198023909718" style={{ width: "90%" }} />
  //       <br />
  //       Most likely your link will be pretty much the same, but the number at the end will differ.
  //       <br />
  //       Handy link:
  //       <br />
  //       <ButtonLink href="https://scoresaber.com/rankings" target="_blank">
  //         <LinkLogo src={scoreSaberLogo} />
  //         &nbsp; Go to ScoreSaber ranking search
  //       </ButtonLink>
  //       <br />
  //       Paste your link here:
  //       <br />
  //       <input onChange={scoreSaberLinkOnChange} style={{ width: "90%", marginBottom: "1rem" }} />
  //       {scoreSaberId && (
  //         <>
  //           <ScoreSaberBar scoreSaberId={scoreSaberId} withoutReload />
  //           <br />
  //           <GroupButton
  //             group={[
  //               {
  //                 kind: "button",
  //                 active: false,
  //                 onClick: handleSubmit,
  //                 text: "That's me, save"
  //               },
  //               {
  //                 kind: "button",
  //                 active: false,
  //                 onClick: () => setScoreSaberId(""),
  //                 text: "Reset"
  //               }
  //             ]}
  //           />
  //         </>
  //       )}
  //     </ExplainationRow>
  //     <div></div>
  //   </FormRow>
  // );
};

