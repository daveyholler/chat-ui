import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import confluence from "./images/confluence.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import docs from "./images/docs.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dropbox from "./images/dropbox.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import excel from "./images/excel.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import onedrive from "./images/onedrive.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdf from "./images/pdf.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sharepoint from "./images/sharepoint.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sheets from "./images/sheets.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import slides from "./images/slides.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import teams from "./images/teams.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import sql_server from "./images/sql server.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import word from "./images/word.png";

export type SourceIconType = {
  icon:
    | "confluence"
    | "docs"
    | "dropbox"
    | "excel"
    | "onedrive"
    | "pdf"
    | "sharepoint"
    | "sheets"
    | "slides"
    | "teams"
    | "sql_server"
    | "word"
    | string;
};
export const SourceIcon: React.FC<SourceIconType> = ({ icon }) => {
  const iconNameToImageMap = {
    confluence,
    docs,
    dropbox,
    excel,
    onedrive,
    pdf,
    sharepoint,
    sheets,
    slides,
    teams,
    sql_server,
    word,
  };
  const styles = {
    iconWrapper: {
      width: "24px",
      height: "24px",
    },
    icon: {
      maxWidth: "24px",
      maxHeight: "24px",
    },
  };
  return (
    <span style={styles.iconWrapper}>
      <img style={styles.icon} src={iconNameToImageMap[icon]} alt={icon} />
    </span>
  );
};
