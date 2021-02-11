import React, { useEffect, useState } from "react";
import { ScrollView, ScrollViewProps, LayoutChangeEvent } from "react-native";

const AutoScrollView: React.FC<ScrollViewProps> = (props) => {
  const {
    children,
    onLayout: propsOnLayout,
    onContentSizeChange: propsOnContentSizeChange,
    ...rest
  } = props;
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    if (scrollViewContentHeight > scrollViewHeight && !scrollEnabled) {
      setScrollEnabled(true);
    } else if (scrollViewContentHeight <= scrollViewHeight && scrollEnabled) {
      setScrollEnabled(false);
    }
  }, [scrollViewContentHeight, scrollViewHeight, scrollEnabled]);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    if (propsOnContentSizeChange) {
      propsOnContentSizeChange(contentWidth, contentHeight);
    }
    if (scrollViewContentHeight !== contentHeight) {
      setScrollViewContentHeight(contentHeight);
    }
  };

  const onLayout = (e: LayoutChangeEvent) => {
    if (propsOnLayout) {
      propsOnLayout(e);
    }
    if (scrollViewHeight !== e.nativeEvent.layout.height) {
      setScrollViewHeight(e.nativeEvent.layout.height);
    }
  };

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      onLayout={onLayout}
      onContentSizeChange={onContentSizeChange}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};

export default AutoScrollView;
