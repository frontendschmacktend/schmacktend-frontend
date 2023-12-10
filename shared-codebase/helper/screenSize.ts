import { useState, useEffect } from 'react';
import { isWeb } from 'tamagui';
const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<any>();

  useEffect(() => {
    // Function to update screen size
    if (isWeb) {

    const handleResize = () => {
        setScreenWidth(
       {
        width: window?.innerWidth,
        height: window?.innerHeight
       }
      );
    };
    handleResize();
    // To update dimensions when the screen size changes  
    window?.addEventListener('resize', handleResize);

   

    // Clean up 
    return () => {  
      window?.removeEventListener('resize', handleResize);
    };
  }
  }, []);


  return {newWidth:screenWidth?.width,newHeight:screenWidth?.height };
};

export default useScreenSize;
