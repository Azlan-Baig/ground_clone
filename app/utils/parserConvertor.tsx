import React from "react";

export const parseContentToSpans = (content: string): React.ReactNode => {
  if (!content || typeof content !== "string") return null;

  // Split content into parts where ##...## occurs
  const parts = content.split(/(##.*?##)/g);

  return (
    <p className="">
      {parts.map((part, index) => {
        if (part.startsWith("##") && part.endsWith("##")) {
          const text = part.slice(2, -2); // remove ##
          return (
            <span key={index} className="changes">
              {text}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </p>
  );
};
