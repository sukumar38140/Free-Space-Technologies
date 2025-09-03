
import { useState, useEffect } from 'react';

interface TextContent {
  [key: string]: string;
}

interface PageTextContent {
  [pageName: string]: TextContent;
}

export const useTextContent = (pageName: string) => {
  const [textContent, setTextContent] = useState<TextContent>({});

  useEffect(() => {
    const savedContent = localStorage.getItem('siteTextContent');
    if (savedContent) {
      const allContent: PageTextContent = JSON.parse(savedContent);
      setTextContent(allContent[pageName] || {});
    }
  }, [pageName]);

  const getText = (key: string, defaultText: string = '') => {
    return textContent[key] || defaultText;
  };

  return { getText, textContent };
};
