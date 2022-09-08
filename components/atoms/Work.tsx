import React, { memo, FC } from 'react';
import { work } from 'Type'
export const Work: FC<{ work: work }> = memo(({ work }) => {
  return (
    <li>
      {work.t著者 && (<i className="ml-3">{work.t著者}</i>)}
      <span className="ml-3">『{work.tタイトル}』</span>
      {work.s出版社 && (
        <span className="ml-3">({work.s出版社})</span>
      )}
      {work.k形態 && (<small className="ml-3">{work.k形態}</small>)}
      {work.dデザイン && (<small className="ml-3">{work.dデザイン}</small>)}
      {work.n発表年月 && (<small className="ml-3">
        - {work.n発表年月?.split('-', 1)}
      </small>)}

    </li>
  );
});
