import React, { useState, useEffect, ForwardedRef } from 'react';
import { Image, ImageStyle } from 'react-native';

interface ProgressiveImageProps {
  lowResUrl: string;
  highResUrl: string;
  style?: ImageStyle;
  isTransitioning?: boolean;
}

const ProgressiveImage = React.forwardRef(
  (props: ProgressiveImageProps, ref: ForwardedRef<Image>) => {
    const { lowResUrl, highResUrl, style, isTransitioning } = props;
    const [imageUrl, setImageUrl] = useState<string>(lowResUrl);

    useEffect(() => {
      if (!isTransitioning) {
        // Only prefetch and set the high-res image if not transitioning
        Image.prefetch(highResUrl).then(() => {
          setImageUrl(highResUrl);
        });
      }
    }, [highResUrl, isTransitioning]);

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
