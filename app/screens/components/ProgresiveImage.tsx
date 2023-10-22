import React, { useState, useEffect } from 'react';
import { Image, ImageStyle } from 'react-native';

interface ProgressiveImageProps {
  lowResUrl: string;
  highResUrl: string;
  style?: ImageStyle;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  lowResUrl,
  highResUrl,
  style,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(lowResUrl);

  useEffect(() => {
    // Fetch high-res image and update state when it's loaded
    Image.prefetch(highResUrl).then(() => {
      setImageUrl(highResUrl);
    });
  }, [highResUrl]);

  return (
    <Image
      source={{
        uri: imageUrl,
      }}
      style={[{ width: '100%', height: 300 }, style]}
    />
  );
};

export default ProgressiveImage;
