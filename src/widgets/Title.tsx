import React, {FC, createContext, useContext, useEffect} from 'react';

const TitleContext = createContext('');

const Title: FC<{title: string}> = ({title, children}) => {
  const parentTitle = useContext(TitleContext);
  const fullTitle = parentTitle ? `${parentTitle} | ${title}` : title;

  useEffect(() => {
    document.title = fullTitle;
    return () => {
      document.title = parentTitle;
    };
  }, [fullTitle, parentTitle]);

  return (
    <TitleContext.Provider value={fullTitle}>{children}</TitleContext.Provider>
  );
};

export default Title;
