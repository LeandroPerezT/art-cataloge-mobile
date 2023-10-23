import React, { useState, useEffect, ForwardedRef } from 'react';
import { Image, ImageStyle } from 'react-native';

interface ProgressiveImageProps {
  lowResUrl: string;
  highResUrl: string;
  style?: ImageStyle;
}

const ProgressiveImage = React.forwardRef(
  (props: ProgressiveImageProps, ref: ForwardedRef<Image>) => {
    const { lowResUrl, highResUrl, style } = props;
    const [imageUrl, setImageUrl] = useState<string>(lowResUrl);

    useEffect(() => {
      // Fetch high-res image and update state when it's loaded
      Image.prefetch(highResUrl)
        .then(() => {
          setImageUrl(highResUrl);
        })
        .catch(() => {
          setImageUrl(lowResUrl);
        });
    }, [highResUrl, lowResUrl]);

    return (
      <Image
        ref={ref}
        source={{ uri: imageUrl }}
        style={[{ width: '100%', height: 300 }, style]}
      />
    );
  },
);

export default ProgressiveImage;
